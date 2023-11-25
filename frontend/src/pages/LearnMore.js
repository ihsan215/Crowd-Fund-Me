import React from "react";
import "../style/LearnMore.css";
import imgSrc from "../style/img/learn-more-page.png";
import imgSrc2 from "../style/img/learn-more-page-2.png";
function LearnMore() {
  return (
    <React.Fragment>
      <div className="learn-more-container">
        <h1>Welcome to Our CrowdFundMe Platform</h1>
        <div className="sample-image">
          <img
            src={imgSrc}
            alt="Technology and Crowdfunding"
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
          />
        </div>
        <div className="platform-info">
          <div className="text-img-area"></div>
          <p>
            Crowdfunding has emerged as a pivotal mechanism for supporting
            innovative ventures across diverse industries. This article explores
            the paradigm shift in crowdfunding methodologies through the
            utilization of blockchain technology, specifically Ethereum's
            Sepolia Testnet, and the integration of smart contracts. By
            dissecting the intricacies of a hypothetical crowdfunding platform,
            this article elucidates the transformative potential of
            decentralized finance (DeFi) in democratizing funding opportunities
            for creative endeavors.
          </p>
          <p>
            The evolution of crowdfunding platforms has been marked by a
            transition toward decentralized networks, driven by the advent of
            blockchain technology. This article delves into the architectural
            framework and operational mechanics of a cutting-edge crowdfunding
            platform leveraging the Ethereum network's Sepolia Testnet. This
            platform orchestrates the convergence of creative projects and
            financial support, facilitated by immutable smart contracts,
            reshaping the traditional landscape of fundraising and project
            realization.
          </p>
          <p>
            User interaction with the platform commences with wallet
            integration, establishing a secure and authenticated connection to
            the Ethereum network. Creators are empowered to initiate up to 5
            distinct projects, spanning a spectrum of artistic domains such as
            Arts, Illustration, Tech, Film, Games, Music, and Publishing. Within
            each project, creators delineate up to 5 specific funding requests,
            elucidating the precise financial requisites for project execution.
          </p>
          <p>
            Transparency and community consensus form the bedrock of this
            decentralized ecosystem. Expense requests within projects
            necessitate approval from at least half of the contributing
            accounts, ensuring a democratic decision-making process. Creators
            can stipulate minimum donation thresholds, tailoring the initial
            support required for project commencement.
          </p>
          <p>
            The amalgamation of blockchain technology and crowdfunding presents
            an unprecedented avenue for fostering innovation and creativity. The
            decentralized nature of this platform circumvents traditional
            financial gatekeepers, democratizing access to funding and
            amplifying the reach of groundbreaking projects. As blockchain
            technology continues to evolve, the prospects for decentralized
            crowdfunding platforms promise greater inclusivity and global
            participation in catalyzing novel ventures.
          </p>
          <div className="sample-image">
            <img
              src={imgSrc2}
              alt="Technology and Crowdfunding"
              style={{ marginTop: "2rem", marginBottom: "2rem" }}
            />
          </div>
          <p>
            Here's a breakdown of our platform's functionalities and guidelines:
          </p>
          <ol>
            <li>
              Initiate your journey by connecting your wallet account, enabling
              seamless interaction with our platform.
            </li>
            <li>
              Creators have the opportunity to generate up to 5 unique and
              ongoing projects, spanning categories such as Arts, Illustration,
              Tech, Film, Games, Music, and Publishing.
            </li>
            <li>
              Within each project, creators can outline up to 5 specific
              requests, meticulously detailing the necessary funding required
              for project realization.
            </li>
            <li>
              Transparency and community consensus are vital! All expense
              requests must attain approval from at least half of the
              contributing accounts to proceed.
            </li>
            <li>
              To kickstart their projects, creators have the flexibility to set
              a minimum donation amount, initiating their quest for support.
            </li>
          </ol>
          <p>
            Imagine a collaborative space where creative minds converge with
            technology. Our platform offers a vibrant ecosystem where backers
            and creators unite to foster innovative projects across diverse
            fields.
          </p>
          <p>
            Funding and expenditure management are seamlessly handled by our
            smart contracts, ensuring a secure and transparent process for all
            involved.
          </p>

          <p>
            The possibilities are endless! Dive into a world of creativity and
            support visionary projects or embark on your own creative endeavor.
            Connect your wallet, explore, and be a part of our growing
            community!
          </p>

          <p>
            The evolution of crowdfunding into a decentralized realm epitomizes
            the transformative potential of blockchain technology. This
            hypothetical platform, powered by Ethereum's Sepolia Testnet and
            smart contracts, epitomizes transparency, security, and
            accessibility. The convergence of creative ingenuity and financial
            backing on a decentralized landscape heralds a new era in
            democratizing innovation, redefining the dynamics of fundraising and
            project realization.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LearnMore;
