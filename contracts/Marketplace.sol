// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Marketplace {
    enum ShippingStatus { Pending, Shipped, Delivered }
    ShippingStatus public status;
    address public owner;
    uint public constant MATIC_PRICE = 0.1 ether;

    event MissionComplete();

    constructor() {
        owner = msg.sender;
        status = ShippingStatus.Pending;
    }

    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    function shipped() public ownerOnly {
        status = ShippingStatus.Shipped;
    }

    function delivered() public ownerOnly {
        status = ShippingStatus.Delivered;
        emit MissionComplete();
    }

    function getStatus() public view ownerOnly returns (ShippingStatus) {
        return status;
    }

    function getStatusForCustomer() public payable returns (ShippingStatus) {
        require(msg.value >= MATIC_PRICE, "Le paiement doit etre superieur ou egal au montant requis pour obtenir le statut.");
        return status;
    }
}