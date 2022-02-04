<template>
  <v-row align="center" justify="center">
    <v-col cols="4">
      <v-card>
        <v-card-title> 1. Questions </v-card-title>
        <v-card-text> Minimal age. </v-card-text>
        <v-card-actions style="margin: 0%; padding-top: 0px">
          <v-text-field
            v-model.number="minimalAge"
            type="number"
            label="Age"
            required
            :rules="[rules.required]"
            style="margin-top: 0%; padding-top: 0px"
          >
          </v-text-field>
        </v-card-actions>
        <v-card-text> Identifier (username) </v-card-text>
        <v-card-actions>
          <v-text-field
          v-model="username"
          label="Identifier"
          :rules="[rules.required]"
          >
          </v-text-field>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title> 2. Verify Certificate </v-card-title>
        <v-card-actions>
          <v-file-input
            truncate-length="15"
            v-model="uploadedFile"
            label="Upload certificate"
          >
          </v-file-input>
        </v-card-actions>
        <v-card-actions>
          <v-btn @click="VerifyCertificate()"> Verify </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <!-- <v-overlay :value="this.$store.getters.getEmployerWait">
      <v-card> <v-card-title> Wait for normal user</v-card-title> </v-card>
    </v-overlay> -->
  </v-row>
</template>

<script>
import { makeHttpCall, requestTypes } from "@/restCon/restCon.js";
export default {
  data() {
    return {
      minimalAge: null,
      uploadedFile: null,
      encryptedFile: null,
      username: null,

      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },

  methods: {
    VerifyCertificate: async function () {
      let comp = this;
      await this.toBase64(this.uploadedFile).then((result) => {
        makeHttpCall(
          "http://localhost:8020/blockchain/fileEncryption",
          requestTypes.POST,
          result
        ).then((response) => {
          console.log(response);
          response.json().then((encrypted) => {
            console.log(encrypted);
            comp.encryptedFile = encrypted.hash;
          });
        }).then(() => {
          this.$store.state
        .contractInstance()
        .methods.StoreCertificate(
          comp.encryptedFile,

        )
        .send({ from: this.$store.state.web3.coinbase });
        })
      });
    },
  },

  mounted() {
    console.log("waiting for event");
    let comp = this;
    this.$store.state
      .contractInstance()
      .once("storedCertificate", function (error, event) {
        console.log(event.returnValues.done);
        comp.$store.commit("setEmployerWait", event.returnValues.done);
      });
  },
};
</script>
