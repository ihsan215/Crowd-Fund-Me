import React, { useContext } from "react";
import Web3Context from "../../web3/Web3-context";
import UserContext from "../../user/User-context";

import Spinning from "../../UI/Spinning";
import Button from "../../UI/Button";

function CreateProjectForm() {
  const web3Ctx = useContext(Web3Context);
  const userCtx = useContext(UserContext);

  async function submitFunc(e) {
    try {
      // get project ID
      const projectId = Number(
        await web3Ctx.contractInstance.methods.Project_ID_Count().call({
          from: web3Ctx.address,
        })
      );

      const formData = new FormData();
      const mainPageImg = e.target[2].value;
      const categoria = e.target[3].value;
      const projectMaterial = e.target[5].value;
      const projectSummary = e.target[6].value;
      formData.append("walletId", web3Ctx.address);
      formData.append("mainPageImg", mainPageImg);
      formData.append("categoria", categoria);
      formData.append("projectMaterial", projectMaterial);
      formData.append("projectSummary", projectSummary);

      const projectTitle = e.target[0].value;
      const projectDesc = e.target[1].value;
      const minContrinute = web3Ctx.web3Instance.utils.toWei(
        `${e.target[4].value}`,
        "ether"
      );
      console.log(projectId);

      await web3Ctx.contractInstance.methods
        .create_project("deneme", "deneme2", 12)
        .send({
          from: web3Ctx.address,
          gas: "1500000",
        });

      console.log("end");

      const responseData = await userCtx.sendData(
        `/uploadProject/${projectId}`,
        formData
      );

      if (responseData.message === "ok") {
        console.log("end save");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    submitFunc(e);
  }

  return (
    <React.Fragment>
      <h1>Create Project</h1>
      <form className="contact-form" onSubmit={submitHandler}>
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
              <option value="Arts">Arts</option>
              <option value="Illustrarion">Illustrarion</option>
              <option value="Tech">Tech</option>
              <option value="Film">Film</option>
              <option value="Games">Games</option>
              <option value="Music">Music</option>
              <option value="Publishing">Publishing</option>
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
          {userCtx.dataisLoading ? <Spinning isBtn={true} /> : "Submit"}
        </Button>
      </form>
    </React.Fragment>
  );
}

export default CreateProjectForm;
