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

    it("check create project functiın", async () => {
      // Check function
      const title = "Example Project 1";
      const description = "example description";
      const min_contribution = 1;

      const result = await contractInstance.create_project(
        title,
        description,
        min_contribution,
        {
          from: accounts[1],
        }
      );

      // Check event
      assert.equal(
        result.logs[0].args.id.toNumber(),
        0,
        "first project id equal to 0"
      );

      assert.equal(
        result.logs[0].args.owner,
        accounts[1],
        "project owner check"
      );

      assert.equal(result.logs[0].args.title, title, "project title check");

      // Check result
      assert.equal(result.receipt.status, true, "status must be true");

      // Check project count
      try {
        for (let i = 0; i < 6; i++) {
          await contractInstance.create_project(
            title,
            description,
            min_contribution,
            {
              from: accounts[1],
            }
          );
        }
        assert(false);
      } catch (e) {
        assert(
          e.message.indexOf("revert") >= 0,
          "error message must contain revert"
        );
      }
    });
  });
});
