<template>
  <div class="fill-height d-flex flex-column" style="width: 100%">
    <h1 class="text-center white--text">Please select your role</h1>
    <v-row align="center">
      <v-col cols="4" v-for="(item, index) in this.cards" :key="index">
        <v-card
          tile
          class="mx-auto text-center"
          color="card"
          @click="redirect(item.name)"
          :ripple="false"
        >
          <v-icon class="card-text">{{ item.icon }}</v-icon>

          <v-card-title class="justify-center card-text">{{
            item.name
          }}</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="4"></v-col>
      <v-col style="margin-top: -20%" cols="4">
        <v-btn @click="connectMetamask" color="orange accent-3" width="100%">
          <v-icon left>$vuetify.icons.metamaskicon</v-icon> Connect to
          Metamask!</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "chooserole",
  mounted() {
    console.log("dispatching getContractInstance");
    this.$store.dispatch("getContractInstance");
  },
  data: () => ({
    cards: [
      {
        id: 1,
        name: "Normal user",
        icon: "mdi-account-circle",
      },
      {
        id: 2,
        name: "Employer",
        icon: "mdi-briefcase",
      },
      {
        id: 3,
        name: "Verifier",
        icon: "mdi-gavel",
      },
    ],
  }),
  methods: {
    connectMetamask() {
      this.$store.dispatch("registerWeb3");
    },
    redirect: function (type) {
      // route to correct page when clicked on card 🙂
      switch (type) {
        case "Normal user":
          this.$router.push("userpage");
          this.$store.commit("addNavItem", {
            text: "To Role",
            to: "/userpage",
          });
          break;
        case "Employer":
          this.$router.push("employer");
          this.$store.commit("addNavItem", {
            text: "To Role",
            to: "/employer",
          });
          break;
        case "Verifier":
          this.$router.push("verifier");
          this.$store.commit("addNavItem", {
            text: "To Role",
            to: "/verifier",
          });
          break;
      }
    },
  },
};
</script>

<style scoped>
.v-icon.v-icon {
  font-size: 400px;
}

.card-text {
  color: var(--v-cardtext);
}
</style>
