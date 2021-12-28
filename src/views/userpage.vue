<template>
  <div>
    <TopBar />
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card>
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
              <v-btn @click="Upload()"> Upload </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
export default {
  data() {
    return {
      uploadedFile: null,
    };
  },
  methods: {
    Upload() {},
  },
  components: {
    TopBar: TopBar,
  },
};
</script>
