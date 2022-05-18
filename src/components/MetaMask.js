import React, { useState } from "react";
import { ethers } from "ethers";

const MetaMask = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [currentBlock, setBlock] = useState(null);

  async function connectMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
  }

  const renderMetamask = () => {
    if (!account) {
      return (
        <button onClick={() => connectMetamask()}>Connect to Metamask</button>
      );
    } else {
      return <p>Welcome {account}</p>;
    }
  };

  return <div>{renderMetamask()}</div>;
};

export default MetaMask;
