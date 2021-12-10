<template>
  <div>
    <TopBar />
    <v-img
      src="https://weconomicsorg.files.wordpress.com/2021/09/cropped-weconomics_website_1.jpg"
      max-height="60%"
    >
    </v-img>
    <h1 style="text-align: center">
      Welcome to the demo for certificates on the blockchain
    </h1>
    <p style="text-align: center">
      This is the demo made by Weconomics for company's that want to experience
      blockchain technology.
    </p>
    <p style="text-align: center">
      To start the demo, click on the "choose role" button on the top bar!
    </p>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
export default {
  components: {
    TopBar: TopBar,
  },
};
</script>

<style>
.centerH1 {
  position: fixed;
  top: 35%;
  left: 47%;
  transform: translate(-50%, -50%);
}
</style>
