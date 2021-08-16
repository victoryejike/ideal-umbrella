export default [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_authorizedCaller',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_erc20TokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_nftTokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_previousBidder',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_currentBidder',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_previousBid',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_currentBid',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: '_userId',
        type: 'string',
      },
    ],
    name: 'BidPlaced',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_erc1155TokenContract',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'ERC1155TransferCompleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_erc20TokenContract',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'ERC20TransferCompleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_erc721TokenContract',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'ERC721TransferCompleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_erc20TokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_nftTokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum DelegateContract.TokenType',
        name: '_tokenType',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_startingBid',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_creator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: '_userId',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'enum DelegateContract.PricingType',
        name: '_paymentMode',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_startTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_endTime',
        type: 'uint256',
      },
    ],
    name: 'OrderCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_erc20TokenContract',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_erc721TokenContract',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_seller',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_buyer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_erc20TokenAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_erc721TokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum DelegateContract.PricingType',
        name: '_pricingType',
        type: 'uint8',
      },
    ],
    name: 'TransactionCompleted',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_erc20TokenAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_nftTokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
      {
        internalType: 'enum DelegateContract.TokenType',
        name: '_tokenType',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: '_startingPrice',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_userId',
        type: 'string',
      },
      {
        internalType: 'enum DelegateContract.PricingType',
        name: '_pricingType',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: '_startTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_endTime',
        type: 'uint256',
      },
    ],
    name: 'OfferForSale',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_nftTokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        internalType: 'enum DelegateContract.TokenType',
        name: '_tokenType',
        type: 'uint8',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'closeBid',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'closeOrder',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_erc20TokenContract',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_nftTokenAddress',
        type: 'address',
      },
      {
        internalType: 'enum DelegateContract.TokenType',
        name: '_tokenType',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'instantBuy',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_erc20TokenAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_nftTokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_currentBid',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_userId',
        type: 'string',
      },
    ],
    name: 'placeBid',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_erc1155TokenContract',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_quantity',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'transferERC1155',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_erc20TokenContract',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'transferERC20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_erc721TokenContract',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferERC721',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
