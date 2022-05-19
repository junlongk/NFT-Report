import React, { useState } from "react";
import { ethers } from "ethers";
import "./Metamask.css";

const Metamask = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [currentBlock, setBlock] = useState(null);

  async function connectMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const bal = await provider.getBalance(accounts[0]);
    const balanceInEther = ethers.utils.formatEther(bal);
    setAccount(accounts[0].slice(0, 4) + "..." + accounts[0].slice(37, 41));
    setBalance(balanceInEther);
  }

  const disconnectMetamask = () => {
    setAccount(null);
    setBalance(null);
  };

  const renderMetamask = () => {
    if (!account) {
      return (
        <div className="UserCard">
          <button className="MetamaskButton" onClick={() => connectMetamask()}>
            Connect to Metamask
          </button>
        </div>
      );
    } else {
      return (
        <div className="UserCard">
          <p>Welcome {account}</p>
          <p>Balance: {balance} ETH</p>
          <button
            className="MetamaskButton"
            onClick={() => disconnectMetamask()}
          >
            Disconnect
          </button>
        </div>
      );
    }
  };

  return <div>{renderMetamask()}</div>;
};

export default Metamask;
