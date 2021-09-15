import Vue from "vue";
import VueRouter from "vue-router";
import MarryMe from "../components/MarryMe.vue";
import SaidYes from "../components/SaidYes.vue";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    { path: "/yes", component: SaidYes },
    { path: "/", component: MarryMe   },
  ],
});
