<template>
  <div class="px-2 d-flex flex-column">
    <label class="theme-switch">
      <input
        type="checkbox"
        v-model="$vuetify.theme.dark"
        id="theme-switch"
        checked
      />
      <span class="slider round"></span>
    </label>
    <div class="text white--text">
      {{ this.$vuetify.theme.dark ? "Dark Theme" : "Light Theme" }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ThemeSwitch",
  mounted: function () {
    let comp = this;
    document.getElementById("theme-switch").onchange = function () {
      comp.$vuetify.theme.dark =
        document.getElementById("theme-switch").checked;
      localStorage.setItem("darkTheme", comp.$vuetify.theme.dark.toString());
    };
  },
};
</script>

<style>
.theme-switch {
  margin: auto;
  position: relative;
  display: inline-block;
  width: 52px;
  height: 26px;
}

.theme-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 4px;
  background-color: var(--v-switch);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: white;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
