import { defineConfig } from "@wagmi/cli";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "therapists",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_therapist",
              type: "address",
            },
          ],
          name: "bookTherapist",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_therapist",
              type: "address",
            },
          ],
          name: "freeTherapist",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_price",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "string",
              name: "_description",
              type: "string",
            },
          ],
          name: "postAd",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "adLength",
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
          name: "getAds",
          outputs: [
            {
              internalType: "address[]",
              name: "",
              type: "address[]",
            },
            {
              internalType: "string[]",
              name: "",
              type: "string[]",
            },
            {
              internalType: "string[]",
              name: "",
              type: "string[]",
            },
            {
              internalType: "uint256[]",
              name: "",
              type: "uint256[]",
            },
            {
              internalType: "bool[]",
              name: "",
              type: "bool[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "keys",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "therapistAds",
          outputs: [
            {
              internalType: "address",
              name: "therapist",
              type: "address",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "available",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
    },
  ],
  plugins: [],
});
