let getIPFS = new Promise(function (resolve) {
  const IPFS = require("ipfs-mini");
  const ipfs = new IPFS({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  });
  console.log(ipfs);
  resolve(ipfs);
});

export default getIPFS;
