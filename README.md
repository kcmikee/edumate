# EduMate

## Overview

EduMate revolutionizes education through blockchain technology by creating an innovative NFT-based attendance tracking system. This platform allows students to receive unique NFTs for class participation, providing immutable and secure digital proof of their achievements. By leveraging blockchain's security and NFT technology, EduMate transforms educational engagement and enhances the overall learning experience.

<img width="1438" alt="Screenshot 2025-01-15 at 4 50 56 PM" src="https://github.com/user-attachments/assets/859cd041-5d71-453b-8c0f-cd796b8a372c" />

## Key Features

- **Automatic NFT Minting for Attendance**: Each time a student attends a class, an NFT is automatically minted, serving as a digital certificate of attendance.
  
- **Tamper-Proof Record-Keeping**: All attendance records are stored on the blockchain, ensuring that they are immutable and cannot be altered or deleted.

- **Real-Time Accessibility**: Both students and administrators can access attendance records in real-time, providing transparency and ease of management.

- **Gamified Learning with Reward Mechanisms**: Students can earn rewards for their participation, encouraging engagement and motivation through a gamified experience.

- **Smart Contract-Driven Administrative Processes**: Administrative tasks are streamlined through smart contracts, reducing the need for manual intervention and increasing efficiency.

## Benefits

- **For Institutions**: Gain transparent and simplified management of attendance records, reducing administrative overhead and enhancing accountability.

- **For Students**: Earn collectible and verifiable credentials that can be showcased to potential employers, enhancing their professional profiles.

- **For Employers**: Receive authentic achievement records that provide a reliable measure of a candidate's educational background and participation.

## Getting Started

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)


## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.18)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Install dependencies if it was skipped in CLI:

```
cd edumate
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `packages/hardhat/hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contracts in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/hardhat/deploy`


## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
