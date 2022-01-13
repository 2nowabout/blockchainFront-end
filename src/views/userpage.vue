<template>
  <v-row align="center"
      justify="center">
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
      </v-card>
      <v-card color="card" style="margin-top:4%">
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
                v-model="certificateinfo.certificateDate"
                label="Acquired date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="certificateinfo.certificateDate"
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
                v-model="certificateinfo.certificateExperationDate"
                label="Experation date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="certificateinfo.certificateExperationDate"
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
        <v-card-actions>
          <v-text-field v-model="userinfo.name" label="Name"> </v-text-field>
        </v-card-actions>
        <v-card-actions>
          <v-text-field v-model="userinfo.email" label="Email"> </v-text-field>
        </v-card-actions>
        <v-card-actions>
          <v-text-field v-model.number="userinfo.age" type="number" label="Age">
          </v-text-field>
        </v-card-actions>
        <v-card-actions>
          <v-text-field v-model="userinfo.address" label="Address">
          </v-text-field>
        </v-card-actions>
        <v-card-actions>
          <v-text-field v-model="userinfo.zipcode" label="Zipcode">
          </v-text-field>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card color="card">
        <v-card-title style="text-align: center"
          >4. Upload information</v-card-title
        >
        <v-card-actions>
          <v-btn color="primary" @click="Upload()"> Upload </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { makeHttpCall, requestTypes } from "@/restCon/restCon.js";
export default {
  data() {
    return {
      menu1: false,
      menu2: false,

      uploadedFile: null,
      certificateinfo: {
        certificateDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
        certificateExperationDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
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
    };
  },
  methods: {
    Upload() {

    },
  },
};
</script>
