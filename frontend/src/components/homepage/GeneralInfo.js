import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { ContractInfo } from "../../contract/ContractInfo";

function GeneralInfo() {
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalSponsors, setTotalSponsors] = useState(0); // Replace with actual data] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);

  async function callInfo() {
    const web3 = new Web3(window.ethereum);
    const contractInstance = new web3.eth.Contract(
      ContractInfo.ABI,
      ContractInfo.ADDRESS
    );

    const totalDonations = await web3.eth.getBalance(ContractInfo.ADDRESS);

    const lastProjectId = await contractInstance.methods
      .Project_ID_Count()
      .call({
        from: "0xDD21f068F4D5A99139fCC8c0Dc4217FEBdA66ad8",
      });

    const total_sponsors = await contractInstance.methods
      .total_sponsors()
      .call({
        from: "0xDD21f068F4D5A99139fCC8c0Dc4217FEBdA66ad8",
      });

    setTotalProjects(Number(lastProjectId));
    setTotalDonations(web3.utils.fromWei(Number(totalDonations), "ether"));
    setTotalSponsors(Number(total_sponsors));
  }

  useEffect(() => {
    callInfo();
  }, []);

  return (
    <React.Fragment>
      <div className="stats-container">
        <div className="card">
          <h3 className="card-text">{totalProjects}</h3>
          <p className="card-title">Total Projects</p>
        </div>
        <div className="card">
          <h3 className="card-text">{totalDonations} ETH</h3>
          <p className="card-title">Total Donations</p>
        </div>
        <div className="card">
          <h3 className="card-text">{totalSponsors}</h3>
          <p className="card-title">Total Sponsors</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default GeneralInfo;
