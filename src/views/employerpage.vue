<template>
  <v-row align="center" justify="center">
    <v-col cols="4">
      <v-card>
        <v-card-title> 1. Questions </v-card-title>
      </v-card>
    </v-col>
    <v-overlay :value="this.$store.getters.getEmployerReady"> </v-overlay>
  </v-row>
</template>

<script>
export default {};
</script>
