<template>
  <div class="fill-height d-flex flex-column">
    <h1 class="text-center white--text">Welcome to the Blockchain Demo</h1>
    <v-row align="center">
      <v-col cols="6">
        <v-img src="/blockchain-1.svg" height="500px" contain />
      </v-col>
      <v-col cols="6">
        <h2 class="text-center white--text" style="width: 50%">
          This demo has been brough to you by Weconomics for companies that want
          to experience Blockchain Technology. Click the button below to start!
        </h2>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn
          to="/role"
          height="50px"
          max-width="50%"
          elevation="0"
          width="100%"
          color="primary"
          >Choose your role</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>
