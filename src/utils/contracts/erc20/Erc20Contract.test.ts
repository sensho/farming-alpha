import { Erc20AssetIds } from '../../../types';
import { Erc20TokenContract } from './Erc20Contract';

import { TransactionModel } from '../../../models/transaction.model';

jest.mock('../../../models/transaction.model');
jest.mock('../../../models/wallet.model');

const CHAIN = 'ethereum';
const TOKEN = {
	id: 'usdc' as Erc20AssetIds,
	decimals: 6,
	name: 'USD Coin',
	symbol: 'USDC',
};

const PRIVATE_KEY =
	'0xe9adf5dc27f18e9b792a3af82fbce8fb335967bd94a21917f253269d78b60db6';

const ADDRESS_2 = '0xB6ecdB43A981a51334Ad04c9AaE189a6dFdb63F5';

describe('Erc20 Contract Tests', () => {
	const token = new Erc20TokenContract(CHAIN, TOKEN.id, PRIVATE_KEY);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('Token Metadata', () => {
		it('Token symbol is displayed correctly', async () => {
			expect(await token.symbol()).toEqual(TOKEN.symbol);
		}, 30000);

		it('Token name is displayed correctly', async () => {
			expect(await token.name()).toEqual(TOKEN.name);
		}, 30000);

		it('Token decimals is displayed correctly', async () => {
			expect(await token.decimals()).toEqual(TOKEN.decimals);
		}, 30000);
	});

	describe('Token Spend Approval', () => {
		it('Token allowance function works', async () => {
			expect(await token.allowance(ADDRESS_2)).not.toBeNull();
		}, 30000);

		it('Token approval function works', async () => {
			const amount = await token.parseValue('1');

			const preAllowance = await token.allowance(ADDRESS_2);

			await token.approve(ADDRESS_2, amount);

			const postAllowance = await token.allowance(ADDRESS_2);

			expect(postAllowance).toEqual(amount);

			if (preAllowance.gte(amount)) {
				expect(TransactionModel.create).toHaveBeenCalledTimes(0);
			} else {
				expect(TransactionModel.create).toHaveBeenCalledTimes(1);
			}
		}, 30000);
	});
});
