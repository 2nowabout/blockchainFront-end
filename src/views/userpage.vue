<template>
  <v-row>
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
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="Upload()"> Upload </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card color="card">
        <v-card-title style="text-align: center"
          >2. Extra certificate information</v-card-title
        >
        <v-card-actions class="justify-center">
          <v-text-field
            ref="certificateDate"
            v-model="certificateinfo.certificateDate"
            required
            label="Date of emission"
          >
          </v-text-field>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      uploadedFile: null,
      certificateinfo: {
        certificateDate: null,
        certificateExperationDate: null,
      },
      userinfo: {
        name: null,
        age: null,
        address: null,
        zipcode: null,
      },
    };
  },
  methods: {
    Upload() {},
  },
};
</script>
