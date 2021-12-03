const address = "0xc3Ad8de373059763323F00200D6c7075abC78c90";
const ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "hash",
        type: "string",
      },
      {
        internalType: "string",
        name: "user",
        type: "string",
      },
    ],
    name: "StoreCertificate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "user",
        type: "string",
      },
    ],
    name: "findCertificates",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "hashFromCertificate",
        type: "string",
      },
      {
        internalType: "string",
        name: "user",
        type: "string",
      },
    ],
    name: "verifyCertificateFromUser",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export { address, ABI };
