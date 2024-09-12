// SPDX-License-Identifier: Wipro Limited
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MedicineTracking is ERC721Upgradeable, OwnableUpgradeable {
    function initialize() public initializer {
        __ERC721_init("MedicineTracking", "MT");
        __Ownable_init(msg.sender);
    }

    struct Medicine {
        string userId;
        string name;
        uint256 price;
        uint256 quantity;
        string image;
        string description;
        uint256 lastUpdateDate;
        string status; 
    }

    mapping(uint256 => Medicine) private medicines;

    event MedicineUpdated(string userId, uint256 medicineId, string name, uint256 price, uint256 quantity, string image, string description, uint256 lastUpdateDate, string status);

    function mintMedicine(address to, string memory userId, uint256 medicineId, string memory name, uint256 price, uint256 quantity, string memory image, string memory description, string memory status) public onlyOwner {
        _mint(to, medicineId);
        medicines[medicineId] = Medicine(userId, name, price, quantity, image, description, block.timestamp, status);
    }

    function getMedicineDetails(uint256 medicineId) public view returns(Medicine memory){
        Medicine memory medicine = medicines[medicineId];
        return medicine;
    }

    function updateMedicineDetails(string memory userId, uint256 medicineId, string memory name, uint256 price, uint256 quantity, string memory image, string memory description, string memory status) public onlyOwner {
        medicines[medicineId].userId = userId;
        medicines[medicineId].name = name;
        medicines[medicineId].price = price;
        medicines[medicineId].quantity = quantity;
        medicines[medicineId].image = image;
        medicines[medicineId].description = description;
        medicines[medicineId].lastUpdateDate = block.timestamp;
        medicines[medicineId].status = status;
        emit MedicineUpdated(userId, medicineId, name, price, quantity, image, description, block.timestamp, status);
    }
}
