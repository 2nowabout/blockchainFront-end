<template>
  <v-row align="center" justify="center">
    <v-col cols="4">
      <v-card color="card">
        <v-card-title style="text-align: center"
          >1. Upload a certificate</v-card-title
        >
        <v-card-actions class="justify-center">
          <v-file-input
            truncate-length="15"
            v-model="uploadedFile"
            label="Upload certificate"
          >
          </v-file-input>
        </v-card-actions>
        <v-card-actions>
          <v-btn width="100%" color="primary" v-on:click="UploadFile">
            Upload file</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-card color="card" style="margin-top: 4%">
        <v-card-title style="text-align: center"
          >2. Extra certificate information</v-card-title
        >
        <v-card-actions class="justify-center">
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="ipfsdata.certificateinfo.certificateDate"
                label="Acquired date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="ipfsdata.certificateinfo.certificateDate"
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-card-actions>
        <v-card-actions class="justify-center">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="ipfsdata.certificateinfo.certificateExperationDate"
                label="Experation date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                required
                :rules="[rules.required]"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="ipfsdata.certificateinfo.certificateExperationDate"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card color="card">
        <v-card-title style="text-align: center"
          >3. User information</v-card-title
        >
        <v-form style="width: 100%" ref="userinfo">
          <v-card-actions>
            <v-text-field
              v-model="ipfsdata.userinfo.name"
              label="Name"
              required
              :rules="[rules.required]"
            >
            </v-text-field>
          </v-card-actions>
          <v-card-actions>
            <v-text-field
              v-model="ipfsdata.userinfo.email"
              label="Email"
              required
              :rules="[rules.required]"
            >
            </v-text-field>
          </v-card-actions>
          <v-card-actions>
            <v-text-field
              v-model.number="ipfsdata.userinfo.age"
              type="number"
              label="Age"
              required
              :rules="[rules.required]"
            >
            </v-text-field>
          </v-card-actions>
          <v-card-actions>
            <v-text-field
              v-model="ipfsdata.userinfo.address"
              label="Address"
              required
              :rules="[rules.required]"
            >
            </v-text-field>
          </v-card-actions>
          <v-card-actions>
            <v-text-field
              v-model="ipfsdata.userinfo.zipcode"
              label="Zipcode"
              required
              :rules="[rules.required]"
            >
            </v-text-field>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card color="card">
        <v-card-title style="text-align: center"
          >4. Upload information</v-card-title
        >
        <v-card-actions>
          <v-btn color="primary" @click="UploadAll()"> Upload </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn color="primary" @click="Verify()"> Verify </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-overlay :value="this.$store.getters.getComplete">
      <v-card>
        <v-card-title style="text-align: center">You are done!</v-card-title>
        <v-card-text> Watch the other screens! </v-card-text>
      </v-card>
    </v-overlay>
  </v-row>
</template>

<script>
import { makeHttpCall, requestTypes } from "@/restCon/restCon.js";
export default {
  data() {
    return {
      menu1: false,
      menu2: false,

      rules: {
        required: (value) => !!value || "Required.",
      },

      uploadedFile: null,
      ipfsdata: {
        certificateinfo: {
          certificateDate: new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .substr(0, 10),
          certificateExperationDate: new Date(
            Date.now() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .substr(0, 10),
        },
        userinfo: {
          name: null,
          email: null,
          age: null,
          address: null,
          zipcode: null,
        },
      },
      encryptedFile: null,
      ipfshash: null,
    };
  },
  methods: {
    toBase64(file) {
      console.log(file);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },

    onSubmit: function () {},
    UploadFile: async function () {
      // if (!this.$refs.userinfo.validate()) {
      //   return;
      // }

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
        });
      });
    },
    async UploadAll() {
      console.log(this.encryptedFile);
      console.log("getting ipfs");
      const ipfs = this.$store.getters.getIPFS;
      let comp = this;
      await new Promise((resolve) => {
        ipfs.addJSON(this.ipfsdata, (err, hash) => {
          if (err) {
            return console.log(err);
          }
          resolve(hash);
        });
      }).then((result) => {
        comp.Ipfshash = result;
      });
      alert(this.Ipfshash);

      this.$store.state
        .contractInstance()
        .methods.StoreCertificate(
          this.encryptedFile,
          this.Ipfshash,
          this.ipfsdata.userinfo.name
        )
        .send({ from: this.$store.state.web3.coinbase });
      this.$store.commit("setComplete", true);
    },

    Verify() {
      this.$store.state
        .contractInstance()
        .methods.findCertificates(this.ipfsdata.userinfo.name)
        .call({ from: this.$store.state.web3.coinbase })
        .then((result) => {
          alert(result);
        });
      const ipfs = this.$store.getters.getIPFS;
      ipfs.cat(this.ipfshash, (err, result) => {
        console.log(result);
      });
    },
  },
};
</script>
