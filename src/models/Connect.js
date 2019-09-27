import LED from './LED'
import { ntf } from '@/services'
import Motors from './Motors'

const MY_BLUETOOTH_NAME = 'HMSoft'
const SEND_SERVICE = 0xFFE0
const SEND_SERVICE_CHARACTERISTIC = 0xFFE1

export default {
  devModeFlag: false,
  isConnected: false,
  toggleLigthCharacteristic: undefined,
  myDevice: undefined,
  delay: 1,
  isSending: false,
  checkBrowser () {
    if (!navigator.bluetooth) {
      ntf.error('Данный браузер не поддерживает Bluetooth API')
    }
  },
  connectToBlut () {
    navigator.bluetooth.requestDevice({
      filters:
        [
          { name: MY_BLUETOOTH_NAME },
          { services: [SEND_SERVICE] }
        ]
    })
      .then(device => {
        console.log(device)
        this.myDevice = device
        return device.gatt.connect()
      })
      .then(server => server.getPrimaryService(SEND_SERVICE))
      .then(service => service.getCharacteristic(SEND_SERVICE_CHARACTERISTIC))
      .then(characteristic => {
        this.toggleLigthCharacteristic = characteristic
        this.isConnected = true
        ntf.success('Успешно подключено к HM-10')
      })
      .catch(error => {
        console.error(error)
      })
  },
  disconnectBlut () {
    LED.lightOffHandler()
      .then(() => {
        this.myDevice.gatt.disconnect()
        this.isConnected = false
        this.toggleLigthCharacteristic = undefined
        this.myDevice = undefined
        ntf.warn('Bluetooth-устройство отключено')
      })
  },
  sendWithDelay (mode, data) {
    setTimeout(() => {
      console.log(data)
      if (!this.devModeFlag) {
        this.toggleLigthCharacteristic.readValue()
          .then(currentCode => {
            let convertedCode = currentCode.getUint8(0)
            this.toggleLigthCharacteristic.writeValue(Uint8Array.of(convertedCode === data ? 0 : data))
          })
      }
      if (mode === 'motors') {
        Motors.robotLeftPower = Motors.leftPower
        Motors.robotRightPower = Motors.rightPower
      }
    }, (this.delay * 1000))
  }
}
