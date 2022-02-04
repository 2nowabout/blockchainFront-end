import Vue from "vue";
import Vuex from "vuex";
import start from "../util/getWeb3";
import pollWeb3 from "../util/pollWeb3";
import getContract from "../util/getContract";
import getIPFS from "../util/getIPFS";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    web3: {
      isInjected: false,
      web3Instance: null,
      networkId: null,
      coinbase: null,
      balance: null,
      error: null,
    },
    contractInstance: null,
    logincode: null,
    succesfullLogin: false,
    choosenRole: null,
    items: [
      { text: "Home", to: "/home" },
      { text: "Choose Role", to: "/role" },
    ],
    ipfs: null,
    complete: false,
    employerWait: true,
  },
  getters: {
    getCode: (state) => state.logincode,
    getSuccesfullLogin: (state) => state.succesfullLogin,
    getChosenRole: (state) => state.choosenRole,
    getNavItems: (state) => state.items,
    getIPFS: (state) => state.ipfs,
    getComplete: (state) => state.complete,
    getEmployerWait: (state) => state.employerWait,
  },
  mutations: {
    registerIPFSinstance(state, payload) {
      console.log("IPFS CHECK" + payload);
      let result = payload;
      console.log(result);
      state.ipfs = result;
      console.log("----------------------------------------------------------");
      console.log(state.ipfs);
    },
    registerWeb3Instance(state, payload) {
      console.log("registerWeb3instance Mutation being executed", payload);
      let result = payload;
      let web3Copy = state.web3;
      web3Copy.coinbase = result.coinbase;
      web3Copy.networkId = result.networkId;
      web3Copy.balance = parseInt(result.balance, 10);
      web3Copy.isInjected = result.injectedWeb3;
      web3Copy.web3Instance = result.web3;
      state.web3 = web3Copy;
      pollWeb3();
    },
    pollWeb3Instance(state, payload) {
      console.log("pollWeb3Instance mutation being executed", payload);
      state.web3.coinbase = payload.coinbase;
      state.web3.balance = parseInt(payload.balance, 10);
      state.web3.networkId = payload.networkId;
    },
    registerContractInstance(state, payload) {
      console.log("Certificate contract instance: ", payload);
      state.contractInstance = () => payload;
    },
    registercode(state, code) {
      state.logincode = code;
    },
    succesfullCode(state) {
      state.succesfullLogin = true;
    },
    fullReset(state) {
      state.succesfullLogin = false;
      state.logincode = null;
      state.choosenRole = null;
    },
    setRole(state, role) {
      state.choosenRole = role;
    },
    setComplete(state, complete) {
      state.complete = complete;
    },
    setEmployerWait(state, employerWait) {
      if (employerWait) {
        state.employerWait = false;
      }
    },
    addNavItem(state, item) {
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].text == item.text) {
          state.items[i] = item;
          return;
        }
      }
      state.items.push(item);
    },
  },
  actions: {
    registerIPFS({ commit }) {
      console.log("registering IPFS Storage system");
      getIPFS
        .then((result) => {
          commit("registerIPFSinstance", result);
        })
        .catch((e) => console.log(e));
    },
    registerWeb3({ commit }) {
      console.log("registerWeb3 Action being executed");
      start()
        .then((result) => {
          console.log("committing result to registerWeb3Instance mutation");
          commit("registerWeb3Instance", result);
        })
        .catch((e) => {
          console.log("error in action registerWeb3", e);
        });
    },
    pollWeb3({ commit }, payload) {
      console.log("pollWeb3 action being executed");
      commit("pollWeb3Instance", payload);
    },
    getContractInstance({ commit }) {
      getContract
        .then((result) => {
          commit("registerContractInstance", result);
        })
        .catch((e) => console.log(e));
    },
  },
  modules: {},
});
