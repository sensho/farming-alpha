export const MESSAGE = {
	commands: {
		start: {
			welcome_message: '🫡 Welcome to Farmville!',
		},
	},
	callback: {
		get_started: {
			intro: `🪂 AIRDROPS AVAILABLE
			
Airdrops are a way to validate a user's proof of history in a protocol. While there are no guarantees, the formula is usually a high number of interactions, volume and TVL with the protocols contracts.

     ❖ None of your actions will be in vain, as the stronger your transaction history, the better is the proof of history of your wallet. This is a marathon, not a sprint! 🏃‍♂️ 

     ❖ Farmville automates the manual effort associated with consistently interacting with a large number of protocol ecosystems. 

     ❖ Here is a list of ecosystems that we are live with now, with new ones being added every 2 weeks.

     ❖ Click on the link below to get started!`,
		},
		farm_layer_zero: {
			intro: `
			SELECT TIER

Layer zero has passed 50m messages. While there has been no officially announced date for the Airdrop, we speculate that it is in the fall of 2023. 

After carefully studying the data, we've carefully crafted the following 3 strategies. 

A) Freebie User

        ❖ Minimum Deposit= 0.3 ETH
        ❖ Minimum Estimated Volume: $7,500
        ❖ Minimum Number of Transactions: 25
        ❖ Minimum Number of Source Chains: 5
        ❖ Number of Consecutive Days: Daily Until Airdrop


B) Focused User 

        ❖ Minimum Deposit= 0.45 ETH
        ❖ Minimum Volume: $20,000
        ❖ Minimum Number of Transactions: 40
        ❖ Minimum Number of Source Chains: 6
        ❖ Number of Consecutive days: Daily Until Airdrop


C) Power User (Highest Time-adjusted Probability)

        ❖ Minimum Deposit= 0.70 ETH
        ❖ Minimum Volume: $55,000
        ❖ Minimum Number of Transactions: 80
        ❖ Minimum Number of Source Chains: 8
        ❖ Number of Consecutive days: Daily Until Airdrop 

Please note that you could select any option and put more than the minimum, to increase your ranking, but never less.`,

			option_select:
				'Congratulations, you have selected option {selected_option}. Before you top up your new farming wallet, please read and understand the pricing model.\
				\n\n10% of initial deposits and top ups.\
				\n\n10% of Airdropped Tokens.',
			confirm_option: `💰 PAYMENT

⚠️ Please transfer a minimum of {min}ETH \\(higher the amount, the higher your chances\\) to address \`{address}\`
On the basis of your indicated deposit, here is a fee breakdown 

Volume \\- {volume}

Gas \\(estimated\\) \\- {gas}

Bot Fee \\- {bot_fee}`,
		},
	},
};
