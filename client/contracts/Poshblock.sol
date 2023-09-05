// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Poshblock {
    struct Contract {
        uint id;
        string title;
        string creatorId;
        string receiverId;
        string docLink;
        string span;
    }

    Contract[] public contracts;
    uint public count = 0;
    address public manager;

    constructor() {
        manager = msg.sender;
    }

    modifier onlyManager() {
        require(manager == msg.sender, "You are not the manager");
        _;
    }

    function createContract(
        string calldata _title,
        string calldata _cid,
        string calldata _rid,
        string calldata _doclink,
        string calldata _span
    ) external {
        contracts.push(Contract(count, _title, _cid, _rid, _doclink, _span));
        count++;
    }

    function allContracts() external view returns (Contract[] memory) {
        return contracts;
    }
}
