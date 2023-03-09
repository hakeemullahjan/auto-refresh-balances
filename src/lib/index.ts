import { ethers, providers } from "ethers";

export function getProvider(): providers.Provider | null {
  return new ethers.providers.JsonRpcProvider(
    "https://goerli.infura.io/v3/578bf4e7e0904a5aa9908fd9d5e6d181"
  );
}

export async function getETHBalance(
  provider: providers.Provider,
  address: string
): Promise<string> {
  // Handle ETH directly
  return ethers.utils.formatEther(await provider.getBalance(address));
}
