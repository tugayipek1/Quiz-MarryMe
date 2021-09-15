
<template>
  <div class="container">
    <div class="row mt-5" style="text-align: center">
      <h3 style="font-family: 'Caveat', cursive; font-size: 3rem">
        WELCOME DARLİNG!
      </h3>
    </div>
              <b-button class="red" @click="music">🎶▶</b-button>
    <div
      class="row mt-3"
      style="border-style: groove; border-radius: 25px; text-align: center"
    >
      <span>
        <h5 style="font-family: 'Caveat', cursive; font-size: 2.5rem">
          {{ selected.question }}
        </h5>
      </span>
    </div>

    <div class="row">
      <div class="col-md-6 mt-5">
        <div v-for="(option, index) in selected.options" :key="index">
          <p
            class="h5 mb-2"
            style="font-family: 'Caveat', cursive; font-size: 2rem"
          >
            <b-button
              style="background-color: white; border: 0; outline: 0 !important"
              @click="click(option, index)"
            >
              <b-icon
                icon="heart-fill"
                v-if="
                  currentOptionIndex != null && currentOptionIndex === index
                "
                variant="danger"
                animation="throb"
              />
              <b-icon icon="heart-fill" v-else variant="secondary" />
            </b-button>
            {{ option }}
          </p>
        </div>
      </div>
      <div class="col-md-6" style="text-align: center">
        <component-to-re-render :key="currentIndex">
          <lottie
            :options="defaultOptions"
            :height="300"
            :width="300"
            v-on:animCreated="handleAnimation"
          />
        </component-to-re-render>
      </div>

      <div>
        <b-alert show class="mt-1" style="text-align: center" v-if="trueAnswer"
          >{{selected.trueAnswer}}</b-alert
        >
        <b-alert
          show
          variant="danger"
          class="mt-1"
          style="text-align: center"
          v-if="falseAnswer"
          >{{selected.falseAnswer}}</b-alert
        >
       

        <step
          :active-thickness="2"
          :passive-thickness="2"
          :line-thickness="1"
          :steps="mySteps"
          :current-step="currentIndex - 1"
          icon-class="fa fa-check"
          active-color="powderblue	"
        ></step>
         
      </div>
    </div>
  </div>
</template>

<script>
import Lottie from "vue-lottie";
import * as bir from "../assets/bir.json";
import * as iki from "../assets/iki.json";
import * as üc from "../assets/üc.json";
import * as food from "../assets/food.json";
import * as bes from "../assets/bes.json";
import * as alti from "../assets/alti.json";
import * as yedi from "../assets/yedi.json";
import * as sekiz from "../assets/sekiz.json";
import * as dokuz from "../assets/dokuz.json";
import * as on from "../assets/on.json";
import * as onbir from "../assets/onbir.json";
import * as oniki from "../assets/oniki.json";
import * as onuc from "../assets/onuc.json";
import * as ondort from "../assets/ondort.json";
import * as onbes from "../assets/onbes.json";
import * as musical from "../assets/musical.json";
import * as onyedi from "../assets/onyedi.json";
import * as onsekiz from "../assets/onsekiz.json";
import * as ondokuz from "../assets/ondokuz.json";
import * as sonbir from "../assets/sonbir.json";


import StepProgress from "vue-step-progress";
import "vue-step-progress/dist/main.css";

export default {
  name: "MarryMe",
  components: {
    lottie: Lottie,
    step: StepProgress,
  },
  beforeMount() {
    this.loadQuestions();
  },
  methods: {
    music(){
  var audio =new Audio(require('@/assets/duman.mp3'));
audio.autoplay=true;
audio.loop = true;
},
    handleAnimation: function (anim) {
      this.anim = anim;
    },

    loadQuestions() {
      this.selected = this.questions[this.currentIndex];
      this.currentIndex++;
      this.currentOptionIndex = null;
      this.next = false;
    },
    click(e, index) {
      this.currentOptionIndex = index;
      if (this.selected.answer == e) {
        this.trueAnswer = true;
        setTimeout(
          () => {
            if (this.questions.length - 1 < this.currentIndex) {
              this.$router.push("/yes");
            }

            this.selected = this.questions[this.currentIndex];
            this.currentIndex++;
            this.currentOptionIndex = null;
            this.trueAnswer = false;
            this.defaultOptions = {
              animationData: this.animations[this.currentIndex - 1].default,
            };
          },

          5000
        );
      } else {
        this.falseAnswer = true;
        setTimeout(
          () => {
            this.selected = this.questions[0];
            this.currentIndex = 1;
            this.currentOptionIndex = null;
            this.next = true;
            this.falseAnswer = false;
            this.defaultOptions = { animationData: this.animations[0].default };
          },

          5000
        );
      }
    },
  },
  computed: {},
  data() {
    return {
      falseAnswer: false,
      trueAnswer: false,
      mySteps: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",""],
      defaultOptions: { animationData: bir.default },
      animationSpeed: 1,
      animations: [bir, iki, üc, food, bes, alti, yedi, sekiz, dokuz, on, onbir, oniki, onuc, ondort, onbes, musical, onyedi, onsekiz, ondokuz, sonbir],
      next: false,
      selected: null,
      currentIndex: 0,
      currentOptionIndex: null,
      questions: [
        {
          question: "question?",
          answer: "answer",
          options: ["answer", "option", "option", "option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
        {
          question: "question?",
          answer: "answer",
          options: ["answer", "option", "option", "option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
        {
          question: "question?",
          answer: "answer",
          options: ["answer", "option", "option", "option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
        {
          question: "question?",
          answer: "answer",
          options: ["answer", "option","option","option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
         {
          question: "question?",
          answer: "answer",
          options: ["answer", "option","option","option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
        {
          question: "question?",
          answer: "answer",
          options: ["answer", "option","option","option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
        {
          question: "question?",
          answer: "answer",
          options: ["answer", "option","option","option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
        {
          question: "question?",
          answer: "answer",
          options: ["answer", "option","option","option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
        {
          question: "question?",
          answer: "answer",
          options: ["answer", "option","option","option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
        {
          question: "question?",
          answer: "answer",
          options: ["answer", "option","option","option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
        {
          question: "question?",
          answer: "answer",
          options: ["answer", "option","option","option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
        {
          question: "question?",
          answer: "answer",
          options: ["answer", "option","option","option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
        {
          question: "question?",
          answer: "answer",
          options: ["answer", "option","option","option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
        {
          question: "question?",
          answer: "answer",
          options: ["answer", "option","option","option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
        {
          question: "question?",
          answer: "answer",
          options: ["answer", "option","option","option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
        {
          question: "question?",
          answer: "answer",
          options: ["answer", "option","option","option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
        {
          question: "question?",
          answer: "answer",
          options: ["answer", "option","option","option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
        {
          question: "question?",
          answer: "answer",
          options: ["answer", "option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
        {
          question: "question?",
          answer: "answer",
          options: ["answer", "option"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
        {
          question: "Marry me?",
          answer: "Yes",
          options: ["Yes","No"],
          trueAnswer: "true Answer",
          falseAnswer: "false Answer",
        },
      ],
    };
  },
};
</script>

<style>
.red {
  padding: 0;
border: none;
background: none;
}
</style>