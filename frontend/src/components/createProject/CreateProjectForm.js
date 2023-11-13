import React, { useContext } from "react";
import Web3Context from "../../web3/Web3-context";
import Button from "../../UI/Button";

function CreateProjectForm() {
  const web3Ctx = useContext(Web3Context);

  return (
    <React.Fragment>
      <h1>Create Project</h1>
      <form className="contact-form">
        <div className="input__item">
          <label for="pTitle">Project Title</label>
          <input type="text" id="pTitle" placeholder="Enter Project Title" />
        </div>
        <div className="input__item">
          <label for="pDesc">Project Description</label>
          <input
            type="text"
            maxLength={60}
            id="pDesc"
            placeholder="Use max 100 characters"
          />
        </div>
        <div className="input__item">
          <label for="pImg">Main Page Project Image</label>
          <input
            type="text"
            id="pImg"
            placeholder="Enter your main-page img URL"
          />
        </div>
        <div className="input__item-contact_info_group spc-10">
          <div className="input__item">
            <label for="tel">Categoria</label>
            <select class="form-select">
              <option value="1">Arts</option>
              <option value="1">Illustrarion</option>
              <option value="1">Tech</option>
              <option value="1">Film</option>
              <option value="1">Games</option>
              <option value="1">Music</option>
              <option value="1">Publishing</option>
            </select>
          </div>
          <div className="input__item">
            <label for="minCont">Minimum Contribution [ETH]</label>
            <input
              type="number"
              step={0.001}
              id="minCont"
              placeholder="Enter your minimum foundation value in ETH"
            />
          </div>
        </div>

        <div className="input__item">
          <label for="pMaterial">Project Metarial</label>
          <input
            type="text"
            id="pMaterial"
            placeholder="Please enter your project URL website/video ... vs"
          />
        </div>
        <div className="input__item">
          <label for="msg">Project Summary</label>
          <textarea
            type="textarea"
            maxLength={1200}
            id="msg"
            placeholder="Project Summary | 1200 characters"
          />
        </div>
        <Button type="submit" className="submit__btn">
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
}

export default CreateProjectForm;
