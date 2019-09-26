import Connect from './Connect'

export default {
  rotation: 'normal',
  power: 50,
  isMoving: {
    up: false,
    down: false,
    left: false,
    right: false
  },
  leftPower: -20, // TODO:
  rightPower: 70, // TODO:
  test () {
    let code = 123
    let a = Uint8Array.of(code, code)
    console.log(a)
  },
  moveUp () {
    this.isMoving.up = !this.isMoving.up
  }
  /*lightOffHandler () {
    return Connect.toggleLigthCharacteristic.writeValue(Uint8Array.of(0))
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
      Connect.toggleLigthCharacteristic.writeValue(Uint8Array.of(code))
      return
    }
    Connect.toggleLigthCharacteristic.readValue()
      .then(currentCode => {
        let convertedCode = currentCode.getUint8(0)
        Connect.toggleLigthCharacteristic.writeValue(Uint8Array.of(convertedCode === code ? 0 : code))
      })
  }*/
}
