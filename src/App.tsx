import { ethers, providers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { Account, Connect, NetworkSwitcher } from "./components";

const getProvider = (): providers.Provider | null => {
  return new ethers.providers.JsonRpcProvider(
    "https://goerli.infura.io/v3/578bf4e7e0904a5aa9908fd9d5e6d181"
  );
};

const useOnBlockUpdated = (callback: (blockNumber: number) => void) => {
  useEffect(() => {
    const subscription = getProvider()?.on("block", callback);
    return () => {
      subscription?.removeAllListeners();
    };
  });
};

export function App() {
  const { isConnected, address } = useAccount();

  const [blockNumber, setBlockNumber] = useState<number>(0);
  const [ethBalance, setEthBalance] = useState("0");

  // Listen for new blocks and update the wallet
  useOnBlockUpdated(async (blockNumber: number) => {
    refreshBalances();
    setBlockNumber(blockNumber);
  });

  // Update wallet state given a block number
  const refreshBalances = useCallback(async () => {
    const provider = getProvider();
    if (!address || !provider) {
      return;
    }

    //set eth balance
    setEthBalance(
      await ethers.utils.formatEther(await provider.getBalance(address))
    );
  }, []);

  return (
    <>
      <h1>{blockNumber} ⬨</h1>

      <h1> {ethBalance} ⟠ </h1>

      <Connect />

      {isConnected && (
        <>
          <Account />
          <NetworkSwitcher />
        </>
      )}
    </>
  );
}
