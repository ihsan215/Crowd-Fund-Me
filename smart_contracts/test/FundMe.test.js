const FundMe = artifacts.require("FundMe");

contract("FundMe Contract", (accounts) => {
  describe("FundMe Contract Test", () => {
    let contractInstance;
    const admin = accounts[0];

    before("Deploy Contract", async () => {
      contractInstance = await FundMe.deployed();
    });

    it("Check is contract deployed", async () => {
      assert.ok(contractInstance.address);
      const acc = await contractInstance.admin();
      assert.equal(acc, admin);
    });
  });
});
