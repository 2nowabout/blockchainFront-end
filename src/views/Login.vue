<template>
  <v-row no-gutters>
    <v-col class="left-side" cols="7">
      <v-container fill-height>
        <v-img src="/blockchain-1.svg" height="600px" contain />
      </v-container>
    </v-col>
    <v-col class="pa-12 right-side" cols="5">
      <v-container fill-height class="align-start">
        <v-row no-gutters class="flex-column mt-16" justify="start">
          <v-col cols="12">
            <h1 class="font-weight-light text-center display-3">Hello!</h1>
          </v-col>
          <v-col cols="12">
            <h1 class="font-weight-bold text-center greeting display-3">
              {{ getTimeOfDay }}
            </h1>
          </v-col>
        </v-row>
        <v-row no-gutters class="flex-column mt-n16">
          <v-col cols="12" class="align-center">
            <v-form>
              <v-text-field
                filled
                label="Code"
                v-model="code"
                single-line
                required
                prepend-inner-icon="mdi-lock"
                style="letter-spacing: 5px"
              ></v-text-field>
              <v-btn
                @click="checkCode()"
                height="50px"
                elevation="0"
                width="100%"
                color="primary"
                >LOGIN</v-btn
              >
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Login",
  mounted() {
    console.log("generating login code as test");
    this.$store.commit("registercode", "testcode123");
  },
  data() {
    return {
      code: null,
    };
  },
  components: {},
  methods: {
    login() {
      // Validate code and set variable that authenticated is true
      this.$router.push("/home");
    },
    checkCode() {
      if (this.$store.getters.getCode == this.code) {
        this.$store.commit("succesfullCode");
        this.login();
      }
    },
  },
  computed: {
    getTimeOfDay: function () {
      var data = [
          [22, "Working Late!"],
          [18, "Good Evening!"],
          [12, "Good Afternoon!"],
          [5, "Good Morning!"],
          [0, "Whoa, Early Bird!"],
        ],
        hr = new Date().getHours();
      for (var i = 0; i < data.length; i++) {
        if (hr >= data[i][0]) {
          return data[i][1];
        }
      }
      return "Good Day!";
    },
  },
};
</script>

<style scoped>
.left-side {
  background-color: var(--v-primary);
}

.right-side {
  background-color: var(--v-background);
}

.greeting {
  color: var(--v-primary);
}

::v-deep .v-input input {
  text-align: center;
  letter-spacing: 3px;
}

::v-deep .v-input .v-label {
  letter-spacing: 3px;
  width: 100%;
  text-align: center;
}

::v-deep .v-text-field .v-label {
  max-width: 100%;
}

::v-deep .v-input__prepend-inner {
  position: absolute;
}
</style>
