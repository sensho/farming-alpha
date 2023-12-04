WALLET_SEED="bar jungle bean try butter donor inch bike farm enemy scatter seat"

INFURA_APP_ID="65de9f0218ba466880107a2edca5f5a2"

ETHEREUM_URL="https://mainnet.infura.io/v3/${INFURA_APP_ID}"

yarn ganache \
	--wallet.mnemonic "${WALLET_SEED}" \
	--fork.url ${ETHEREUM_URL} \
	--server.rpcEndpoint /ethereum \
	--wallet.unlockedAccounts 0x171cda359aa49E46Dec45F375ad6c256fdFBD420