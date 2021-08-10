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
        internalType: 'string',
        name: '_tokenId',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: '_userId',
        type: 'string',
      },
    ],
    name: 'BidUpdated',
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
        internalType: 'enum DelegateContract.TransactionType',
        name: '_transactionType',
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
        internalType: 'address',
        name: '_seller',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_bidder',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_bidPrice',
        type: 'uint256',
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
        internalType: 'address',
        name: '_seller',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_buyer',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_erc20TokenAmount',
        type: 'uint256',
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
    name: 'instantBuy',
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
        name: '_erc20TokenAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_nftTokenAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_previousBidder',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_currentBidder',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_previousBid',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_currentBid',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_tokenId',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_userId',
        type: 'string',
      },
    ],
    name: 'updateBid',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
