<template>
  <div>
    <TopBar />
    <v-container>
      <v-row>
        <v-col v-for="index in 3" v-bind:key="index" cols="6">
          <v-card>
            <v-card-title style="text-align: center"
              >1. Upload a certificate</v-card-title
            >
            <v-card-actions class="justify-center">
              <v-file-input truncate-length="15"> </v-file-input>
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
  components: {
    TopBar: TopBar,
  },
};
</script>
