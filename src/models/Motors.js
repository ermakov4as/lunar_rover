import Connect from './Connect'

export default {
  rotation: 'normal',
  savedRotatoin: null,
  turn: 5,
  power: 50,
  isMoving: {
    up: false,
    down: false,
    left: false,
    right: false
  },
  leftPower: 0,
  rightPower: 0,
  robotLeftPower: 0,
  robotRightPower: 0,
  test () {
    let code = 123
    let a = Uint8Array.of(code, code)
    console.log(a)
  },
  moveUp () {
    this.isMoving.down = false
    this.isMoving.up = !this.isMoving.up
    this.calculatePwr()
  },
  moveDown () {
    this.isMoving.up = false
    this.isMoving.down = !this.isMoving.down
    this.calculatePwr()
  },
  moveLeft () {
    this.isMoving.right = false
    this.isMoving.left = !this.isMoving.left
    this.calculatePwr()
  },
  moveRight () {
    this.isMoving.left = false
    this.isMoving.right = !this.isMoving.right
    this.calculatePwr()
  },
  stop () {
    this.isMoving.up = false
    this.isMoving.down = false
    this.isMoving.left = false
    this.isMoving.right = false
    this.calculatePwr()
  },
  checkRotation () {
    if (!this.isMoving.up && !this.isMoving.down && (this.isMoving.left || this.isMoving.right)) {
      if (this.rotation !== 'normal') {
        this.savedRotatoin = this.rotation
        this.rotation = 'normal'
      }
    } else {
      if (this.savedRotatoin) {
        this.rotation = this.savedRotatoin
        this.savedRotatoin = null
      }
    }
  },
  calculatePwr () {
    this.checkRotation()
    let _turn = this.turn / 10
    let _rightPwr
    let _leftPwr
    if (!this.isMoving.up && !this.isMoving.down && !this.isMoving.left && !this.isMoving.right) {
      _leftPwr = 0
      _rightPwr = 0
    } else if (!this.isMoving.up && !this.isMoving.down) {
      if (this.isMoving.left) {
        _leftPwr = -1 * this.power * _turn
        _rightPwr = 1 * this.power * _turn
      } else {
        _leftPwr = 1 * this.power * _turn
        _rightPwr = -1 * this.power * _turn
      }
    } else if (!this.isMoving.left && !this.isMoving.right) {
      if (this.isMoving.up) {
        _leftPwr = this.power
        _rightPwr = this.power
      } else {
        _leftPwr = -1 * this.power
        _rightPwr = -1 * this.power
      }
    } else {
      let _dir
      if (this.isMoving.up) _dir = 1
      else _dir = -1
      if (this.rotation === 'normal') {
        if (this.isMoving.left) {
          _leftPwr = _dir * this.power * (1 - _turn)
          if ((this.power * (1 + _turn)) > 100) _rightPwr = _dir * 100
          else _rightPwr = _dir * this.power * (1 + _turn)
        } else {
          _rightPwr = _dir * this.power * (1 - _turn)
          if ((this.power * (1 + _turn)) > 100) _leftPwr = _dir * 100
          else _leftPwr = _dir * this.power * (1 + _turn)
        }
      } else if (this.rotation === 'faster') {
        if (this.isMoving.left) {
          _leftPwr = _dir * this.power
          if ((this.power * (1 + 2 * _turn)) > 100) _rightPwr = _dir * 100
          else _rightPwr = _dir * this.power * (1 + 2 * _turn)
        } else {
          _rightPwr = _dir * this.power
          if ((this.power * (1 + 2 * _turn)) > 100) _leftPwr = _dir * 100
          else _leftPwr = _dir * this.power * (1 + 2 * _turn)
        }
      } else if (this.rotation === 'slower') {
        if (this.isMoving.left) {
          _leftPwr = _dir * this.power * (1 - 2 * _turn)
          _rightPwr = _dir * this.power
        } else {
          _rightPwr = _dir * this.power * (1 - 2 * _turn)
          _leftPwr = _dir * this.power
        }
      }
    }
    this.leftPower = _leftPwr
    this.rightPower = _rightPwr
    // TODO: что ниже = после задержки
    this.robotLeftPower = this.leftPower
    this.robotRightPower = this.rightPower
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
