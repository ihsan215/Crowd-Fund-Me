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
        for (let i = 0; i < 5; i++) {
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

    it("check create request function", async () => {
      const owner = accounts[2];
      const title = "Example Project 2";
      const description = "example description";
      const min_contribution = 1;

      // Create Project
      await contractInstance.create_project(
        title,
        description,
        min_contribution,
        {
          from: owner,
        }
      );

      const project_list = await contractInstance.returnProject({
        from: owner,
      });

      const project_id = project_list[0].words[0];

      // Create request
      const request_des = "example request";
      const title_res = "example title";
      const buyer = accounts[4];
      const value = 5;

      const result = await contractInstance.create_request(
        project_id,
        request_des,
        title_res,
        buyer,
        value,
        {
          from: owner,
        }
      );

      // Check event
      assert.equal(
        result.logs[0].args.id.toNumber(),
        0,
        "first request id equal to 0"
      );

      assert.equal(result.logs[0].args.owner, owner, "requesst owner check");

      // check only owner can create request
      try {
        await contractInstance.create_request(
          project_id,
          request_des,
          title_res,
          buyer,
          value,
          {
            from: accounts[1],
          }
        );
        assert(false);
      } catch (e) {
        assert(
          e.message.indexOf("revert") >= 0,
          "error message must contain revert"
        );
      }

      // only can 5 unsolved request
      try {
        for (let i = 0; i < 5; i++) {
          await contractInstance.create_request(
            project_id,
            request_des,
            title_res,
            buyer,
            value,
            {
              from: owner,
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

    it("check support project function", async () => {
      const owner = accounts[4];
      const supporter = accounts[5];

      const title = "Example Project 2";
      const description = "example description";
      const min_contribution = 2;

      // Create Project
      await contractInstance.create_project(
        title,
        description,
        min_contribution,
        {
          from: owner,
        }
      );

      // get project id
      const project_list = await contractInstance.returnProject({
        from: owner,
      });

      const project_id = project_list[0].words[0];
      const non_existent_id = 100;

      const request_des = "example request";
      const title_res = "example title";
      const buyer = accounts[6];
      const value = 5;

      await contractInstance.create_request(
        project_id,
        request_des,
        title_res,
        buyer,
        value,
        {
          from: owner,
        }
      );

      // Support with insufficient funds
      try {
        await contractInstance.support_project(project_id, {
          from: supporter,
          value: min_contribution - 1,
        });

        assert(false);
      } catch (e) {
        assert(true);
      }

      // support non-existent project
      try {
        await contractInstance.support_project(non_existent_id, {
          from: supporter,
          value: min_contribution,
        });

        assert(false);
      } catch (e) {
        assert(true);
      }

      // support project
      const result = await contractInstance.support_project(project_id, {
        from: supporter,
        value: min_contribution,
      });

      // check sponsor;
      const sponsor_check = await contractInstance.supponsor_check.call(
        supporter,
        project_id
      );
      assert(sponsor_check, "check is sponser exist");

      const fund_value = await contractInstance.return_sponsor_value.call(
        supporter,
        project_id
      );
      assert.equal(
        fund_value.toNumber(),
        min_contribution,
        "check is fund value"
      );

      const project = await contractInstance.projects(project_id);
      assert.equal(
        project.sponsors_count.toNumber(),
        1,
        "sponspr count must equal to 1"
      );
      // check event
      assert.equal(result.logs[0].args.id.toNumber(), project_id, "project id");

      assert.equal(result.logs[0].args.from, supporter, "supporter");
      assert.equal(
        result.logs[0].args.value.toNumber(),
        min_contribution,
        "value"
      );
    });
  });
});
