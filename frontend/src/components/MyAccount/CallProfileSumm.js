import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import { ContractInfo } from "../../contract/ContractInfo";

function CallProfileSumm() {
  const { userId } = useParams();

  const [totalProject, setTotalProject] = useState(0);
  const [totalDonationAmount, setTotalDonationAmount] = useState(0);
  const [totalFund, setTotalFund] = useState(0);

  async function callSummaryInfo() {
    const web3 = new Web3(window.ethereum);
    const contractInstance = new web3.eth.Contract(
      ContractInfo.ABI,
      ContractInfo.ADDRESS
    );
    const projects = await contractInstance.methods.returnProject().call({
      from: userId,
    });

    let totalFund = 0;
    projects.map(async (id) => {
      const project = await contractInstance.methods.projects(Number(id)).call({
        from: userId,
      });

      const current_amount = Number(
        web3.utils.fromWei(Number(project.current_amount), "ether")
      );

      totalFund += current_amount;
      if (Number(id) + 1 === projects.length) {
        setTotalFund(totalFund);
      }
    });

    const totalDonate = await contractInstance.methods
      .total_foundation_mapping(userId)
      .call({
        from: userId,
      });

    setTotalDonationAmount(web3.utils.fromWei(Number(totalDonate), "ether"));
    setTotalProject(projects.length);
  }

  useEffect(() => {
    callSummaryInfo();
  }, []);

  return (
    <React.Fragment>
      <div className="summ-info-item">
        <h3>{totalProject}</h3>
        <p>Total project</p>
      </div>
      <div className="summ-info-item">
        <h3>
          {totalFund} <span className="symbol">ETH</span>
        </h3>
        <p>Total Fund</p>
      </div>
      <div className="summ-info-item">
        <h3>
          {totalDonationAmount} <span className="symbol">ETH</span>
        </h3>
        <p>Total Donation</p>
      </div>
    </React.Fragment>
  );
}

export default CallProfileSumm;
