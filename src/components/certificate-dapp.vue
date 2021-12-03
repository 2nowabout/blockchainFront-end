<template>
  <hello-metamask />
</template>
<script>
import HelloMetamask from "@/components/metamask";
export default {
  name: "certificate-dapp",
  beforeCreate() {
    console.log("registerWeb3 Action dispatched from casino-dapp.vue");
    this.$store.dispatch("registerWeb3");
  },
  mounted() {
    console.log("dispatching getContractInstance");
    //this.$store.dispatch("getContractInstance");
  },
  components: {
    "hello-metamask": HelloMetamask,
  },
  data() {
    return {
      amount: null,
      pending: false,
      winEvent: null,
    };
  },
  methods: {
    clickNumber(event) {
      console.log(event.target.innerHTML, this.amount);
      this.winEvent = null;
      this.pending = true;
      this.$store.state.contractInstance().bet(
        event.target.innerHTML,
        {
          gas: 300000,
          value: this.$store.state.web3
            .web3Instance()
            .toWei(this.amount, "ether"),
          from: this.$store.state.web3.coinbase,
        },
        (err) => {
          if (err) {
            console.log(err);
            this.pending = false;
          } else {
            let Won = this.$store.state.contractInstance().Won();
            Won.watch((err, result) => {
              if (err) {
                console.log("could not get event Won()");
              } else {
                this.winEvent = result.args;
                this.pending = false;
              }
            });
          }
        }
      );
    },
  },
};
</script>
<style scoped></style>
