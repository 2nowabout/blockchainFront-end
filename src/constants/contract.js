const address = "0x7aA750570d0AcabDfde061EE8bdcE92b9d60849a";
const ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "done",
        type: "bool",
      },
    ],
    name: "storedCertificate",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "hash",
        type: "string",
      },
      {
        internalType: "string",
        name: "ipfshash",
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
        components: [
          {
            internalType: "string",
            name: "hash",
            type: "string",
          },
          {
            internalType: "string",
            name: "ipfshash",
            type: "string",
          },
        ],
        internalType: "struct Certificate.Certificatestruct[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "testEvent",
    outputs: [],
    stateMutability: "nonpayable",
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
