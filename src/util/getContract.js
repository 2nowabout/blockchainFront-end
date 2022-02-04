import Web3 from "web3";
import { address, ABI } from "../constants/contract";

let getContract = new Promise(function (resolve) {
  let web3 = new Web3(window.ethereum);
  let certificateContract = new web3.eth.Contract(ABI, address);
  console.log(address);
  resolve(certificateContract);
});
export default getContract;
