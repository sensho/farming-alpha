import { getChainRpcFromChainId } from '../../../../config/environment';
import { ethers } from 'ethers';
import { Erc20TokenContract } from '../../erc20/Erc20Contract';
import { UniswapRouterContract } from './UniswapRouterContract';
import { UniswapQuoterContract } from '../quoter/UniswapQuoterContract';

jest.mock('../../../../models/transaction.model');
jest.mock('../../../../models/wallet.model');

const CHAIN = 'ethereum';

const PRIVATE_KEY =
	'0xe9adf5dc27f18e9b792a3af82fbce8fb335967bd94a21917f253269d78b60db6';

describe('Uniswap Router Contract', () => {
	const quoter = new UniswapQuoterContract(CHAIN, PRIVATE_KEY);
	const router = new UniswapRouterContract(CHAIN, PRIVATE_KEY);

	describe('Uniswap token swap tests', () => {
		const usdc = new Erc20TokenContract(CHAIN, 'usdc', PRIVATE_KEY);
		const usdt = new Erc20TokenContract(CHAIN, 'usdt', PRIVATE_KEY);

		beforeAll(async () => {
			const txParams = await usdc.contract.populateTransaction['transfer']?.(
				await usdc.wallet.getAddress(),
				usdc.parseValue('1000')
			);

			if (!txParams) return;

			const unsignedProvider = new ethers.providers.JsonRpcProvider(
				getChainRpcFromChainId(CHAIN)
			);

			txParams.from = '0x171cda359aa49E46Dec45F375ad6c256fdFBD420';

			await unsignedProvider.send('eth_sendTransaction', [txParams]);
		}, 30000);

		it('Should swap usdc to usdt', async () => {
			const amount = await usdc.parseValue('100');

			const preUsdtBalance = await usdt.balance();
			const preUsdcBalance = await usdc.balance();

			await usdc.approve(router.contract.address, amount);

			const quote = await quoter.quote(usdc, usdt, amount);

			await router.exactInputSingle(usdc, usdt, amount, quote);

			const postUsdtBalance = await usdt.balance();
			const postUsdcBalance = await usdc.balance();

			expect(preUsdtBalance.lt(postUsdtBalance)).toEqual(true);
			expect(preUsdcBalance.sub(postUsdcBalance)).toEqual(amount);
		}, 30000);
	});
});
