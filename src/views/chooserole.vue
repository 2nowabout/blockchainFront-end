<template>
  <div>
    <TopBar />
    <v-container>
      <h1 style="text-align: center">Choose your role!</h1>
      <v-row>
        <v-col
          v-for="index in this.allRoles.length"
          v-bind:key="index"
          cols="4"
        >
          <v-card>
            <v-img contain height="350" :src="allRoles[index - 1].link"></v-img>
            <v-card-title
              class="justify-center"
              style="margin-top: -8px; text-align: center"
              >{{ allRoles[index - 1].name }}</v-card-title
            >
            <v-card-actions class="justify-center">
              <v-btn @click="chooseRole(allRoles[index - 1])">Select</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <p>{{ choosenRole.name }}</p>
    </v-container>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
export default {
  name: "certificate-dapp",
  beforeMount() {
    console.log("registerWeb3 Action dispatched from casino-dapp.vue");
    this.$store.dispatch("registerWeb3");
    let default1 = {
      id: 0,
      name: "NotChosen",
      link: "null",
    };
    this.$store.commit("setRole", default1);
  },
  mounted() {
    console.log("dispatching getContractInstance");
    this.$store.dispatch("getContractInstance");
    let role1 = {
      id: 1,
      name: "Normal user",
      link: "https://cdn1.iconfinder.com/data/icons/app-user-interface-glyph/64/user_man_user_interface_app_person-512.png",
    };
    let role2 = {
      id: 2,
      name: "Employer",
      link: "https://static.thenounproject.com/png/1050475-200.png",
    };
    let role3 = {
      id: 3,
      name: "Verifier",
      link: "https://icon-library.com/images/verification-icon/verification-icon-17.jpg",
    };
    this.allRoles.push(role1);
    this.allRoles.push(role2);
    this.allRoles.push(role3);
  },
  computed: {
    choosenRole() {
      return this.$store.state.choosenRole;
    },
  },
  data() {
    return {
      allRoles: [],
    };
  },
  components: {
    TopBar: TopBar,
  },
  methods: {
    chooseRole(role) {
      this.$store.commit("setRole", role);
      if (role.id == 1) {
        this.$router.push("userpage");
      }
      if (role.id == 2) {
        this.$router.push("employer");
      }
      if (role.id == 3) {
        this.$router.push("verifier");
      }
    },
  },
};
</script>
