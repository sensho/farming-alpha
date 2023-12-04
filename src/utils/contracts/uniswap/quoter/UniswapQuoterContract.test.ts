import { Erc20TokenContract } from '../../erc20/Erc20Contract';
import { UniswapQuoterContract } from './UniswapQuoterContract';

const CHAIN = 'ethereum';

const PRIVATE_KEY =
	'0xe9adf5dc27f18e9b792a3af82fbce8fb335967bd94a21917f253269d78b60db6';

describe('Uniswap Quoter Tests', () => {
	const quoter = new UniswapQuoterContract(CHAIN, PRIVATE_KEY);

	describe('Quoting Exact Input Single Swap', () => {
		const tokenIn = new Erc20TokenContract('ethereum', 'usdc', PRIVATE_KEY);
		const tokenOut = new Erc20TokenContract('ethereum', 'usdt', PRIVATE_KEY);

		test('usdt <-> usdc should be almost equal', async () => {
			const amount = await tokenIn.parseValue('1');
			const quote = await quoter.quote(tokenIn, tokenOut, amount, 0);

			const quoteParse = parseFloat(await tokenOut.formatValue(quote));
			const amountParse = parseFloat(await tokenIn.formatValue(amount));

			expect(Math.abs(quoteParse - amountParse)).toBeLessThan(0.001);
		}, 30000);
	});
});
