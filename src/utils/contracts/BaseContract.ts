import { getChainRpcFromChainId } from '../../config/environment';
import { ethers } from 'ethers';
import { ChainId } from '../../types';

export class BaseContract {
	contract: ethers.Contract;
	wallet: ethers.Signer;

	rpc: string;
	chain: ChainId;

	constructor(
		chain: ChainId,
		address: string,
		pk: string,
		abi: ethers.ContractInterface
	) {
		this.chain = chain;
		this.rpc = getChainRpcFromChainId(chain);

		const provider = new ethers.providers.JsonRpcProvider(this.rpc);
		this.wallet = new ethers.Wallet(pk, provider);

		this.contract = new ethers.Contract(address, abi, this.wallet);
	}
}
