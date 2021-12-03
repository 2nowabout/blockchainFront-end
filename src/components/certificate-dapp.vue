<template>
  <div>
    <v-container>
    <v-row style="margin:10%">
      <v-btn depressed @click="storeCertificate()"> Set Certificates </v-btn>
      <v-btn depressed @click="getCertificateFromUser()"> Get Certificates </v-btn>
      <h3> Result: {{foundCertificate}} </h3>
      </v-row>
      <v-row>
      <v-text-field 
      v-model="setHash.hash"
      width="100px"
      label="Hash to Store"
       />
      <v-text-field 
      v-model="getHashesFromUser.username"
      width="200px"
      label="Username for hashes"
      />
      </v-row>
    </v-container>

    <hello-metamask />
  
  </div>
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
    this.$store.dispatch("getContractInstance");
  },
  components: {
    "hello-metamask": HelloMetamask,
  },
   data() {
    return {
      setHash: {
        hash: null,
      },
      getHashesFromUser: {
        username: null,
      },
      pending: false,
      foundCertificate: null,
    };
  },
  methods: {
    storeCertificate() {
      this.$store.state.contractInstance().methods.StoreCertificate(this.setHash.hash, this.getHashesFromUser.username).send({from: this.$store.state.web3.coinbase});
    },
    getCertificateFromUser()
    {
      this.$store.state.contractInstance().methods.findCertificates(this.getHashesFromUser.username).call({from: this.$store.state.web3.coinbase})
      .then((result) => {
        this.foundCertificate = result;
      }
      )
    }
  },
};
</script>
<style scoped></style>
