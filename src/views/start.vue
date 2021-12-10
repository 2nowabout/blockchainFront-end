<template>
  <div
    style="
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    "
  >
    <h1>Please fill in your code given by your instructor</h1>
    <v-text-field label="Start code" v-model="code"> </v-text-field>
    <v-btn @click="checkCode()"> Enter </v-btn>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("generating login code as test");
    this.$store.commit("registercode", "testcode123");
  },

  data() {
    return {
      code: null,
    };
  },
  methods: {
    checkCode() {
      if (this.$store.getters.getCode == this.code) {
        this.$store.commit("succesfullCode");
        this.ToBeginPage();
      }
    },
    ToBeginPage() {
      this.$router.push("beginpage");
    },
  },
};
</script>
