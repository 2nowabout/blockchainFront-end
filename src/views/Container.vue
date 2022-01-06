<template>
  <v-app>
    <v-app-bar color="primary" absolute elevation="0" style="z-index: 3">
      <v-list dense color="transparent">
        <v-list-item-group
          class="d-flex flex-row"
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in getNavItems"
            :key="i"
            :ripple="false"
            :to="item.to"
          >
            <v-list-item-content>
              <v-list-item-title
                v-text="item.text"
                class="font-weight-bold subtitle-1 white--text"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-spacer></v-spacer>

      <theme-switch />
      <v-list dense color="transparent">
        <v-list-item-group
          class="d-flex flex-row"
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item :ripple="false">
            <v-list-item-content>
              <v-list-item-title
                v-text="'Logout'"
                class="font-weight-bold subtitle-1 white--text"
                to="/login"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-app-bar>
    <v-main class="fill-height" style="padding-top: 64px">
      <div class="d-flex flex-column wrapper">
        <div class="top"></div>
        <div class="bottom"></div>
      </div>
      <v-container class="content fill-height">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ThemeSwitch from "@/components/ThemeSwitch";

export default {
  name: "Container",

  components: { ThemeSwitch },
  computed: {
    getNavItems: function () {
      return this.$store.getters.getNavItems;
    },
  },

  data: () => ({
    selectedItem: 1,
  }),
};
</script>

<style scoped>
::v-deep .v-messages {
  color: white;
}

.content {
  position: relative;
  z-index: 2;
}

.list-active:hover {
  background-color: transparent;
}

.wrapper {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
}

.top {
  height: 50%;
  width: 100%;
  background-color: var(--v-primary);
}

.bottom {
  height: 50%;
  width: 100%;
  background-color: var(--v-background);
}
</style>
