import { ethers } from 'ethers';

import { WrappedTokenContract } from './WrappedContract';
import { TransactionModel } from '../../../../models/transaction.model';

const PRIVATE_KEY =
	'0xe9adf5dc27f18e9b792a3af82fbce8fb335967bd94a21917f253269d78b60db6';

jest.mock('../../../../models/transaction.model');
jest.mock('../../../../models/wallet.model');

describe('Wrapped Token Contract', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	describe('Tests for ethereum', () => {
		const CHAIN = 'ethereum';

		it('Swaps ETH for exact WETH', async () => {
			const depositAmount = ethers.utils.parseEther('1');

			const wrapToken = new WrappedTokenContract(CHAIN, PRIVATE_KEY);

			const preWrapBalance = await wrapToken.balance();

			await wrapToken.deposit(depositAmount);

			const postWrapBalance = await wrapToken.balance();

			expect(postWrapBalance.sub(preWrapBalance)).toEqual(depositAmount);

			expect(TransactionModel.create).toBeCalledTimes(1);
		}, 30000);

		it('Swaps WETH for exact ETH', async () => {
			const withdrawAmount = ethers.utils.parseEther('1');

			const wrapToken = new WrappedTokenContract(CHAIN, PRIVATE_KEY);

			const preWrapBalance = await wrapToken.balance();

			await wrapToken.withdraw(withdrawAmount);

			const postWrapBalance = await wrapToken.balance();

			expect(preWrapBalance.sub(postWrapBalance)).toEqual(withdrawAmount);

			expect(TransactionModel.create).toBeCalledTimes(1);
		}, 30000);
	});
});
