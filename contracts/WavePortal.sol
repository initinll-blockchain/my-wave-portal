// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "hardhat/console.sol";

contract WavePortal {
    uint public totalWaves;
    mapping(address => uint) private wavesPerUser;
    address[] private keys;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave() public {
        if (wavesPerUser[msg.sender] == 0) {
            keys.push(msg.sender);
        }

        totalWaves += 1;
        wavesPerUser[msg.sender] += 1;

        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns(uint) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getTotalUsersWaved() public view returns(uint) {
        console.log("Total Users waved %d", keys.length);
        return keys.length;
    }
}