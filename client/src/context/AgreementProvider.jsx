import React, { useState, useEffect, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { AgreementAbi, AgreementAddress } from "./context";

//Fetch the smart contract

const fetchContract = (signOrProvider) =>
  new ethers.Contract(AgreementAddress, AgreementAbi, signOrProvider);

export const AgreementContext = createContext();

export const AgreementProvider = ({ children }) => {
  const titleData = "Contract";
  let [currentAccount, setCurrentAccount] = useState();

  const createAgreement = async (campaign) => {
    console.log("createAgreement");
    console.log(campaign);
    const { title, creatorId, receiverId, docLink, span } = campaign;
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    // console.log("Contract:", contract);
    // console.log("Curr: ", currentAccount);
    try {
      const transaction = await contract.createContract(
        title,
        creatorId,
        receiverId,
        docLink,
        span
        // currentAccount
      );
      await transaction.wait();

      console.log("Contract call success", transaction);
      console.log("Using address: ", currentAccount);
    } catch (error) {
      console.log("Contract call failed", error);
    }
  };
  const getAgreements = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);

    const agreements = await contract.allContracts();
    // console.log(campaigns);

    const parsedAgreements = agreements.map((agreement, i) => ({
      title: agreement.title,
      creatorId: agreement.creatorId,
      recieverId: agreement.recieverId,
      docLink: agreement.docLink,
      span: agreement.span,
      pId: i,
    }));
    return parsedAgreements;
  };
  const getFirmAgreements = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);
    const agreements = await contract?.allContracts();

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    const currUser = accounts[0];

    // const filteredContracts = agreements?.filter(
    //   (campaign) =>
    //     //0x4112B43F670797F8939E9649d8E60496BEE09Bbf
    //     campaign.firm_address.toString().toLowerCase() === currUser
    // );

    const firmData = filteredContracts?.map((agreement, i) => ({
      title: agreement.title,
      creatorId: agreement.creatorId,
      recieverId: agreement.recieverId,
      docLink: agreement.docLink,
      span: agreement.span,
      pId: i,
    }));
    return firmData;
  };
  //Check wallet connected

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(true), setError("Install Metamask");
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        alert("No Account Found");
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  });

  //Connect wallet

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log("Install Metamask");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error while connecting to wallet");
    }
  };
  return (
    <AgreementContext.Provider
      value={{
        titleData,
        createAgreement,
        getAgreements,
        getFirmAgreements,
        currentAccount,
        connectWallet,
      }}
    >
      {children}
    </AgreementContext.Provider>
  );
};
