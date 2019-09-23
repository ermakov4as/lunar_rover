<template>
  <div class="home">
    <div v-if="!isConnected">
      <button @click.prevent="connectToBlut">Connect</button>
    </div>
    <div v-else>
      <button @click.prevent="disconnectBlut">Disonnect</button>
      <button @click.prevent="lightOffHandler">Light off</button>
      <button @click.prevent="toggle('red')">Toggle Red</button>
      <button @click.prevent="toggle('green')">Toggle Green</button>
      <button @click.prevent="toggle('blue')">Toggle Blue</button>
      <button @click.prevent="toggle('blink')">Blink</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',

  data () {
    return {
      isConnected: false,
      modeCode: null,
      MY_BLUETOOTH_NAME: 'HMSoft',
      SEND_SERVICE: 0xFFE0,
      SEND_SERVICE_CHARACTERISTIC: 0xFFE1,
      toggleLigthCharacteristic: undefined,
      myDevice: undefined
    }
  },

  methods: {
    connectToBlut () {
      navigator.bluetooth.requestDevice({
        filters:
          [
            { name: this.MY_BLUETOOTH_NAME },
            { services: [this.SEND_SERVICE] }
          ]
      })
        .then(device => {
          console.log(device)
          this.myDevice = device
          return device.gatt.connect()
        })
        .then(server => server.getPrimaryService(this.SEND_SERVICE))
        .then(service => service.getCharacteristic(this.SEND_SERVICE_CHARACTERISTIC))
        .then(characteristic => {
          this.toggleLigthCharacteristic = characteristic
          this.isConnected = true
        })
        .catch(error => {
          console.error(error)
        })
    },

    disconnectBlut () {
      this.lightOffHandler()
        .then(() => {
          this.myDevice.gatt.disconnect()
          this.isConnected = false
          this.toggleLigthCharacteristic = undefined
          this.myDevice = undefined
        })
    },

    toggle (mode) {
      switch (mode) {
        case 'red': this.toggleLightHandler(2); break
        case 'green': this.toggleLightHandler(3); break
        case 'blue': this.toggleLightHandler(4); break
        case 'blink': this.toggleLightHandler(1); break
      }
    },

    toggleLightHandler (code) {
      if (code === 1) {
        this.toggleLigthCharacteristic.writeValue(Uint8Array.of(code))
        return
      }
      this.toggleLigthCharacteristic.readValue()
        .then(currentCode => {
          let convertedCode = currentCode.getUint8(0)
          this.toggleLigthCharacteristic.writeValue(Uint8Array.of(convertedCode === code ? 0 : code))
        })
    },

    lightOffHandler () {
      return this.toggleLigthCharacteristic.writeValue(Uint8Array.of(0))
    }
  },

  created () {
    if (!navigator.bluetooth) {
      alert('Sorry, your browser doesn\'t support Bluetooth API')
    }
  }
}
</script>
