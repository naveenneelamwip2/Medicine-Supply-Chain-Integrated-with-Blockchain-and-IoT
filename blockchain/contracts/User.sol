// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract User is ERC721Upgradeable, OwnableUpgradeable {
    function initialize() public initializer {
        __ERC721_init("User", "UD");
        __Ownable_init(msg.sender);
    }

    mapping(string => string) private userHashes;

    event UserDetailsUpdated(string emailId, string userHash);

    function addUser(string memory emailId, string memory userHash) public onlyOwner {
        userHashes[emailId] = userHash;
        emit UserDetailsUpdated(emailId, userHash);
    }

    function getUserHash(string memory emailId) public view returns (string memory) {
        return userHashes[emailId];
    }

    function updateUserDetails(string memory emailId, string memory userHash) public onlyOwner {
        userHashes[emailId] = userHash;
        emit UserDetailsUpdated(emailId, userHash);
    }
}