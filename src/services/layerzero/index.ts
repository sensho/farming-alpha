import { LayerZeroPlanModel } from '../../models/layerzero-plan.model';
import { ILayerZeroPlan, IWallet } from '../../models/types';
import { HydratedDocument } from 'mongoose';
import { AssetId, ChainId } from '../../types';

export class LayerZeroPlanService {
	static getCurrentBridgeState = async (wallet: HydratedDocument<IWallet>) => {
		const lzPlan = await LayerZeroPlanModel.findOne({ wallet });

		if (!lzPlan) throw new Error('No Plan Found');

		return {
			srcChain: lzPlan.stargate.bridging.current_chain_code,
			srcAsset: lzPlan.stargate.bridging.current_asset_code,
			isActive: lzPlan.stargate.bridging.isTransactionActive,
		};
	};

	static updateCurrentBridgeState = async (
		wallet: HydratedDocument<IWallet>,
		chain: ChainId,
		asset: AssetId
	) => {
		return await LayerZeroPlanModel.findOneAndUpdate(
			{ wallet },
			{
				$set: {
					stargate: {
						bridging: {
							current_chain_code: chain,
							current_asset_code: asset,
						},
					},
				},
			}
		);
	};

	static setBridgingTransactionStatus = async (
		wallet: HydratedDocument<IWallet>,
		isActive: boolean
	) => {
		return await LayerZeroPlanModel.findOneAndUpdate(
			{ wallet },
			{
				$set: {
					stargate: {
						bridging: {
							isTransactionActive: isActive,
						},
					},
				},
			}
		);
	};

	static findLayerZeroPlanFromWallet = async (
		wallet: HydratedDocument<IWallet>
	) => {
		return await LayerZeroPlanModel.findOne({ wallet });
	};

	static createPlan = async (args: Partial<ILayerZeroPlan>) => {
		return await LayerZeroPlanModel.create({ ...args });
	};
}
