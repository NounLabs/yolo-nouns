import { PROVIDER_KEY } from '../config';
import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: PROVIDER_KEY,
  network: Network.ETH_MAINNET, // Replace with your network.
};

export async function getOwnersForNft(tokenAddress: string, tokenId: string): Promise<string | undefined> {
 	const alchemy = new Alchemy(settings);

	const response = await alchemy.nft.getOwnersForNft(tokenAddress, tokenId);
	return response.owners[0];	
}