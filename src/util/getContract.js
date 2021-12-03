import Web3 from "web3";
import { address, ABI } from "../constants/contract";

let getContract = new Promise(function (resolve) {
  let web3 = new Web3(window.web3.currentProvider);
  let certificateContract = new web3.eth.Contract(ABI);
  let certificateContractInstance = certificateContract.at(address);
  //casinoContractInstance = () => casinoContractInstance
  resolve(certificateContractInstance);
});
export default getContract;
