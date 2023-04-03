const config = {
    'copyright': 'EUDI | powered by walt.id',
    'logo': {
        path: 'https://i0.wp.com/eudiwalletconsortium.org/wp-content/uploads/2022/04/cropped-eudi-favicon2.png',
        alt: 'walt.id logo'
    },
    'whiteLogo': {
        path: 'https://i0.wp.com/eudiwalletconsortium.org/wp-content/uploads/2022/04/cropped-eudi-favicon2.png',
        alt: 'walt.id logo'
    },
    hidePage: {
        credentials: false,
        nfts: false,
        settings: false,
        connections: false
    },
    home: "/Credentials",
    evmDefaultChain: "MUMBAI",
    tezosdefaultChain: "TEZOS",
    neardefaultChain: "testnet",
    evmChains: ["ETHEREUM", "POLYGON", "MUMBAI"],
    tezosChains: ["TEZOS", "GHOSTNET"],
    nearChains: ["mainnet" , "testnet"],
    marketplaces: {
        "POLYGON": "https://opensea.io/assets/matic/",
        "ETHEREUM": "https://opensea.io/assets/ethereum/",
        "TEZOS": "https://rarible.com/token/tezos/",
        "mainnet": ""
    }
}
export{config}
