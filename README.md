# my-wave-portal
Blockchain Learning - Building wave portal using solidity, Hardhat by following Buildspace tutorial

A simple daap for sending messages and viewing them on web.

URL - https://my-wave-portal-mu.vercel.app

<img src="/assets/wave-portal.PNG" width=500 />

# Frameworks
<table>
  <tr>
    <th>Front-End</th>
    <th>Back-End</th>
  </tr>
  <tr>
    <td>Sveltekit</td>
    <td>Hardhat</td>
  </tr> 
</table>

## Running back-end Solidity smart contract

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat node
```

## Add Hardhat Local Account to MetaMask
Add hardhat local account - 0x5FbDB2315678afecb367f032d93F642f64180aa3 to metamask wallet

switch contract address from rinkeby to localhost at - WavePortalService.ts

```
// from
export function getContractAddress() {    
    return Constants.CONTRACT_ADDRESS_RINKEBY;
}

// to
export function getContractAddress() {    
    return Constants.CONTRACT_ADDRESS_LOCALHOST;
}
```

## Running front-end Svelte app

Once you've switched to project directory and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

