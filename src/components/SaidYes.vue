<template  >

  <div>
    <b-button class="red" @click="music">🎶▶</b-button>
    <b-row align-h="start">
      <b-col cols="4">
        <lottie
          :options="pinjump"
          :height="200"
          :width="200"
          v-on:animCreated="handleAnimation"
        /> </b-col>
      <b-col cols="4" class="mt-3" style="">
        <h4
          style="
          text-align: center
          border-style: dotted;
          border-radius: 25px;
          font-family: 'Caveat', cursive;
        ">
        <p> Text</p>
         
        
        
        
        
        </h4>
      </b-col>

      <b-col cols="4"><lottie
          style="margin-right: 12rem"
          :options="color"
          :height="200"
          :width="200"
          v-on:animCreated="handleAnimation"
        /> </b-col>
    </b-row>

    <b-row align-h="center">
      <b-col cols="4"> </b-col>
      <b-col cols="4"> </b-col>
    </b-row>

    <b-row align-h="end">
      <b-col cols="3">
        <lottie
          style="margin-right: 12rem"
          :options="spor"
          :height="200"
          :width="200"
          v-on:animCreated="handleAnimation"
      /></b-col>
      <b-col cols="6" align="center" justify="center">
        <b class="row">
          
        </b>
 
          <img
            src="../assets/indir.png"
            height="400x"
            width="400x"
          />
        <br />
        </b-col
      >
      <b-col cols="3">
        <lottie
          style="margin-left: 8rem"
          :options="food"
          :height="200"
          :width="200"
          v-on:animCreated="handleAnimation"
      /></b-col>
    </b-row>

    <b-row align-h="around">
      <b-col cols="4"> </b-col>
      <b-col cols="4"> </b-col>
    </b-row>

    <b-row align-h="between">
      <b-col cols="4"
        >
      </b-col>
      <b-col cols="4"
        >
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Lottie from "vue-lottie";
import * as aa from "../assets/love/aa.json";
import * as bb from "../assets/love/bb.json";
import * as cc from "../assets/love/cc.json";
import * as dd from "../assets/love/dd.json";

export default {
  methods: {
    music(){
  var audio =new Audio(require('@/assets/ihtilal.mp3'));
audio.autoplay=true;
audio.loop = true;
},
    handleAnimation: function (anim) {
      this.anim = anim;
    },
  },
  data() {
    return {
      spor: { animationData: aa.default },
      color: { animationData: bb.default },
      food: { animationData: cc.default },
      pinjump: { animationData: dd.default },
    };
  },

  components: {
    lottie: Lottie,
  },
  name: "SaidYes",
};
</script>

<style>
</style>