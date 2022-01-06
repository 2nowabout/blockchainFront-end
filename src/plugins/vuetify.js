import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import metamaskicon from "../components/metamaskIcon.vue";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#2F69C0",
        background: "#ECECEC",
        switch: "#4588ed",
        card: "#F5F5F5",
        cardtext: "#2F69C0",
      },
      dark: {
        primary: "#2F69C0",
        background: "#1E2E3D",
        switch: "#1E2E3D",
        card: "#273444",
        cardtext: "#B1B1B1",
      },
    },
  },
  icons: {
    iconfont: "mdi",
    values: {
      metamaskicon: {
        component: metamaskicon,
      },
    },
  },
});
