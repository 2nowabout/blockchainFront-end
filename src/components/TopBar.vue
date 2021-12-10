<template>
  <div>
    <v-toolbar dark prominent height="50%">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-row no-gutters>
        <v-col cols="12" xs="1" sm="2" md="3" lg="4" xl="4"> </v-col>
        <v-btn @click="toBegin()"> To begin </v-btn>
        <v-col xs="1" sm="1" md="1" lg="1" xl="1"> </v-col>
        <v-btn @click="toChooseRole()"> Choose role </v-btn>
      </v-row>
      <v-spacer></v-spacer>
      <v-btn @click="toStart()" icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>
<style>
.row {
  margin: 0px;
}
</style>

<script>
export default {
  methods: {
    toChooseRole() {
      this.$router.push("chooserole");
    },
    toStart() {
      this.$store.commit("fullReset");
      this.$router.push("/");
    },
    toBegin() {
      this.$router.push("beginpage");
    },
  },
};
</script>
