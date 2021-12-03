import Web3 from "web3";

/*
 * 1. Check for injected web3 (mist/metamask)
 * 2. If metamask/mist create a new web3 instance and pass on result
 * 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
 * 4. Get user account from metamask
 * 5. Get user balance
 */

let getWeb3 = new Promise(function (resolve, reject) {
  // Check for injected web3 (mist/metamask)
  // From now on, this should always be true:
  // provider === window.ethereum
  if (window.ethereum) {
    window.ethereum.send('eth_requestAccounts');
    window.web3 = new Web3(window.ethereum);
    var web3 = window.web3;
    resolve({
      injectedWeb3: window.ethereum.isMetaMask,
      web3() {
        console.log(web3)
        return web3;
      },
    });
  } else {
    // web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) GANACHE FALLBACK
    reject(new Error("Unable to connect to Metamask"));
  }
})
  .then((result) => {
    return new Promise(function (resolve, reject) {
      // Retrieve network ID
      console.log(result.web3().eth)
      result.web3().eth.net.getId((err, networkId) => {
        if (err) {
          // If we can't find a networkId keep result the same and reject the promise
          console.log(err);
          reject(new Error("Unable to retrieve network ID"));
        } else {
          // Assign the networkId property to our result and resolve promise
          result = Object.assign({}, result, { networkId });
          resolve(result);
        }
      });
    });
  })
  .then((result) => {
    return new Promise(function (resolve, reject) {
      // Retrieve coinbase
      result.web3().eth.getCoinbase((err, coinbase) => {
        if (err) {
          reject(new Error("Unable to retrieve coinbase"));
        } else {
          result = Object.assign({}, result, { coinbase });
          resolve(result);
        }
      });
    });
  })
  .then((result) => {
    return new Promise(function (resolve, reject) {
      // Retrieve balance for coinbase
      result.web3().eth.getBalance(result.coinbase, (err, balance) => {
        if (err) {
          reject(
            new Error(
              "Unable to retrieve balance for address: " + result.coinbase
            )
          );
        } else {
          result = Object.assign({}, result, { balance });
          resolve(result);
        }
      });
    });
  });

export default getWeb3;
