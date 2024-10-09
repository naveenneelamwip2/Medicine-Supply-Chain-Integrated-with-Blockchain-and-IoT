// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Medicine is ERC721Upgradeable, OwnableUpgradeable {
    function initialize() public initializer {
        __ERC721_init("Medicine", "MC");
        __Ownable_init(msg.sender);
    }

    mapping(string => mapping(string => string[])) private medicineHistory;

    event MedicineEvt(string indexed userCid, string medicineId, string medicineCid);

    function addMedicine(string memory userCid, string memory medicineId, string memory medicineCid) public {
        medicineHistory[userCid][medicineId].push(medicineCid);
        emit MedicineEvt(userCid, medicineId, medicineCid);
    }

    function getMedicineHistory(string memory userCid, string memory medicineId) public view returns (string[] memory) {
        return medicineHistory[userCid][medicineId];
    }

    function updateMedicine(string memory userCid, string memory medicineId, string memory newMedicineCid) public {
        medicineHistory[userCid][medicineId].push(newMedicineCid);
        emit MedicineEvt(userCid, medicineId, newMedicineCid);
    }
}
