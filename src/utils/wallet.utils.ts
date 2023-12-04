import { ethers } from 'ethers';

export const generateWallet = () => {
	return ethers.Wallet.createRandom();
};
