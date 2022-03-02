// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import "hardhat/console.sol";

contract WavePortal {

    event NewWave(address indexed from, string message, uint256 timestamp);

    struct Wave {
        address from; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    uint256 private seed;    
    mapping(address => bool) private exWinner;

    Wave[] waves;
    uint public totalWaves;

    constructor() payable {
        console.log("We have been constructed!");
        /*
         * Set the initial seed
         */
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        require(bytes(_message).length != 0, "Message required");
        
        totalWaves += 1;
        console.log("%s waved w/ message %s", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        luckDraw();

        emit NewWave(msg.sender, _message, block.timestamp);
    }

    function getAllWaves() public view returns(Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns(uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function luckDraw() private {

        if (!exWinner[msg.sender] && address(this).balance != 0 ether) {
            /*
            * Generate a new seed for the next user that sends a wave
            */
            seed = (block.difficulty + block.timestamp + seed) % 100;

            console.log("Random # generated: %d", seed);

            /*
            * Give a 33% chance that the user wins the prize.
            */
            if (seed <= 33) {
                console.log("%s won!", msg.sender);

                uint256 prizeAmount = 0.0001 ether;

                if (prizeAmount <= address(this).balance) {
                    (bool success, ) = (msg.sender).call{value: prizeAmount}("");

                    if (success) {
                        exWinner[msg.sender] = true;
                        console.log("%d send to %s", prizeAmount, msg.sender);
                    } else {
                        console.log("Unable to send Prize Amount");
                    }
                } else {
                    console.log("Insufficient Contract Balance");
                }
            }
        }   
    }
}