import React from "react";

function GeneralInfo() {
  const totalProjects = 150; // Replace with actual data
  const totalDonations = 4500; // Replace with actual data
  const totalSponsors = 300; // Replace with actual data

  return (
    <React.Fragment>
      <div className="stats-container">
        <div className="card">
          <h3 className="card-text">{totalProjects}</h3>
          <p className="card-title">Total Projects</p>
        </div>
        <div className="card">
          <h3 className="card-text">${totalDonations}</h3>
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
