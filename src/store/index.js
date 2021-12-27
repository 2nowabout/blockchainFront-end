import Vue from "vue";
import Vuex from "vuex";
import getWeb3 from "../util/getWeb3";
import pollWeb3 from "../util/pollWeb3";
import getContract from "../util/getContract";

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
  },
  getters: {
    getCode: (state) => state.logincode,
    getSuccesfullLogin: (state) => state.succesfullLogin,
    getChosenRole: (state) => state.choosenRole,
  },
  mutations: {
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
  },
  actions: {
    registerWeb3({ commit }) {
      console.log("registerWeb3 Action being executed");
      getWeb3
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
