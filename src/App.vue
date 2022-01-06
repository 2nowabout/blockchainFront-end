<template>
  <v-app :style="cssProps" id="app">
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  mounted() {
    const theme = localStorage.getItem("darkTheme");
    if (theme) {
      if (theme == "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    }
  },
  computed: {
    cssProps() {
      var themeColors = {};
      if (this.$vuetify.theme.dark) {
        Object.keys(this.$vuetify.theme.themes.dark).forEach((color) => {
          themeColors[`--v-${color}`] = this.$vuetify.theme.themes.dark[color];
        });
      } else {
        Object.keys(this.$vuetify.theme.themes.light).forEach((color) => {
          themeColors[`--v-${color}`] = this.$vuetify.theme.themes.light[color];
        });
      }
      return themeColors;
    },
  },
};
</script>

<style>
#app {
  background-color: var(--v-primary);
}
</style>
