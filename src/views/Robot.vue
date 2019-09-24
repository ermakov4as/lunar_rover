<template>
  <div class="home">
    <div v-if="!connect.isConnected">
      <button @click.prevent="connect.connectToBlut">Connect</button>
    </div>
    <div v-else style="background-color: lightyellow">
      <button @click.prevent="connect.disconnectBlut">Disonnect</button>
      <br>
      <input type="checkbox" id="light" v-model="led.light" @change="led.changeLight">
      <label for="light">Свет</label>
      <br>
      <input type="radio" id="normal" value="normal" v-model="motors.rotation">
      <label for="normal">Равномерный поворот</label>
      <br>
      <input type="radio" id="faster" value="faster" v-model="motors.rotation">
      <label for="two">Поворот с забеганием</label>
      <br>
      <input type="radio" id="slower" value="slower" v-model="motors.rotation">
      <label for="slower">Поворот с запаздыванием</label>
      <br>
      <div class="range">
        <input type="range" class="range form-control-range" id="power" v-model="motors.power">
        <label for="power">Мощность: {{ motors.power }}%</label>
      </div>

      <br>
      <button @click.prevent="motors.test">TEST</button>
      <br>
      <br>

      <b-button @click.prevent="motors.moveUp" variant="outline-success">
        <template v-if="motors.isMoving.up">
          <MdArrowRoundUpIcon w="60px" h="60px" class="inl-b" />
          <MdArrowRoundUpIcon w="60px" h="60px" class="inl-b" />
          <MdArrowRoundUpIcon w="60px" h="60px" class="inl-b" />
        </template>
        <IosArrowDropupIcon v-else w="60px" h="60px" />
      </b-button>

      <br>
      <button @click.prevent="led.lightOffHandler">Light off</button>
      <button @click.prevent="led.toggle('red')">Toggle Red</button>
      <button @click.prevent="led.toggle('green')">Toggle Green</button>
      <button @click.prevent="led.toggle('blue')">Toggle Blue</button>
      <button @click.prevent="led.toggle('blink')">Blink</button>
    </div>
  </div>
</template>

<script>
import MdArrowRoundUpIcon from 'vue-ionicons/dist/md-arrow-round-up.vue'
import IosArrowDropupIcon from 'vue-ionicons/dist/ios-arrow-dropup.vue'

export default {
  name: 'robot',
  components: {
    MdArrowRoundUpIcon,
    IosArrowDropupIcon
  },
  created () {
    this.connect.checkBrowser()
  }
}
</script>

<style scoped>
.range {
  max-width: 500px;
  margin: 0 auto;
}
.inl-b {
  display: inline-block;
}
</style>
