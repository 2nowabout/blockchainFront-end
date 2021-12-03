import Web3 from "web3";
import store from "../store/";

let pollWeb3 = async function () {
  let web3 = window.web3;
  web3 = new Web3(Web3.givenProvider);
  console.log(
    "under here _______________________________________________________________"
  );
  console.log(web3);
  web3.eth.getCoinbase().then(console.log);
  console.log(
    "above here ______________________________________________________"
  );

  setInterval(async () => {
    if (web3 && store.state.web3.web3Instance) {
      if ((await web3.eth.getCoinbase()) !== store.state.web3.coinbase) {
        console.log(web3.eth.getCoinbase);
        let newCoinbase = await web3.eth.getCoinbase();
        let networkId = await web3.eth.net.getId();
        web3.eth
          .getBalance(await web3.eth.getCoinbase())
          .then(function (err, newBalance) {
            if (err) {
              console.log(err);
            } else {
              store.dispatch("pollWeb3", {
                coinbase: newCoinbase,
                balance: parseInt(newBalance, 10),
                networkId: networkId,
              });
            }
          });
      } else {
        let networkId = await web3.eth.net.getId();
        web3.eth.getBalance(store.state.web3.coinbase, (err, polledBalance) => {
          if (err) {
            console.log(err);
          } else if (
            parseInt(polledBalance, 10) !== store.state.web3.balance ||
            networkId !== store.state.web3.networkId
          ) {
            store.dispatch("pollWeb3", {
              coinbase: store.state.web3.coinbase,
              balance: polledBalance,
              networkId: networkId,
            });
            console.log("changes saved");
          }
        });
      }
    }
  }, 500);
};

export default pollWeb3;
