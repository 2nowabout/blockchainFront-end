<template>
  <div>
    <v-container>
      <v-row style="margin: 10%">
        <v-col cols="12" xs="1" sm="1" md="2" lg="3" xl="3">
          <v-btn depressed @click="storeCertificate()">
            Set Certificates
          </v-btn>
        </v-col>
        <v-col cols="12" xs="1" sm="1" md="2" lg="3" xl="3">
          <v-btn depressed @click="getCertificateFromUser()">
            Get Certificates
          </v-btn>
        </v-col>
        <h3>Result: {{ foundCertificate }}</h3>
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
      <v-row style="margin-top: 3%">
        <v-col cols="1">
          <p>IPFS test:</p>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="Ipfsstring"
            width="50px"
            label="string to IPFS"
          />
        </v-col>
        <v-col cols="2">
          <v-btn depressed @click="sendToIPFS()"> Send to IPFS </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-row style="margin-top: 2%; margin-left: 2%">
      <hello-metamask />
    </v-row>
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
    this.$store.dispatch("registerIPFS");
  },
  components: {
    "hello-metamask": HelloMetamask,
  },
  data() {
    return {
      Ipfshash: null,
      Ipfsstring: null,
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
    async sendToIPFS() {
      console.log("executing ipfs button");
      console.log(this.$store.getters.getIPFS);
      const ipfs = this.$store.getters.getIPFS;
      let comp = this;
      await new Promise((resolve) => {
        ipfs.add(this.Ipfsstring, (err, hash) => {
          if (err) {
            return console.log(err);
          }
          resolve(hash);
        });
      }).then((result) => {
        comp.Ipfshash = result;
      });
      alert(this.Ipfshash);
    },
    storeCertificate() {
      this.$store.state
        .contractInstance()
        .methods.StoreCertificate(
          this.setHash.hash,
          this.getHashesFromUser.username
        )
        .send({ from: this.$store.state.web3.coinbase });
    },
    getCertificateFromUser() {
      this.$store.state
        .contractInstance()
        .methods.findCertificates(this.getHashesFromUser.username)
        .call({ from: this.$store.state.web3.coinbase })
        .then((result) => {
          this.foundCertificate = result;
        });
    },
  },
};
</script>
<style scoped></style>
