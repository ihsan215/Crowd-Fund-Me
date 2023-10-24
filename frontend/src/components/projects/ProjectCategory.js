import React, { useState } from "react";
import Switch from "../../UI/Switch";

import LeftArrow from "../../UI/LeftArrow";
import RightArrow from "../../UI/RightArrow";

const InitialState = [
  {
    name: "Arts",
    status: false,
    key: 0,
    className: "project-page__category-switch xs-active",
  },
  {
    name: "Illustrarion",
    status: false,
    key: 1,
    className: "project-page__category-switch xs-active",
  },
  {
    name: "Tech",
    status: false,
    key: 2,
    className: "project-page__category-switch",
  },
  {
    name: "Film",
    status: false,
    key: 3,
    className: "project-page__category-switch",
  },
  {
    name: "Games",
    status: false,
    key: 4,
    className: "project-page__category-switch",
  },
  {
    name: "Music",
    status: false,
    key: 5,
    className: "project-page__category-switch",
  },
  {
    name: "Publishing",
    status: false,
    key: 6,
    className: "project-page__category-switch",
  },
];

function ProjectCategory({ setSelectedItem }) {
  const [State, setState] = useState(InitialState);
  setSelectedItem(State);
  const [activeItems, setActiveItems] = useState([0, 1]);
  const [hideLeft, setHideLeft] = useState(true);
  const [hideright, setHideright] = useState(false);

  function SwitchOnChangeHandle(e) {
    const index = e.target.getAttribute("index");

    setState(
      State.map((item) => {
        if (item.key === Number(index)) {
          item.status = !item.status;
        }
        return item;
      })
    );
    setSelectedItem(State);
  }

  function assignClass(item1, item2) {
    setState(
      State.map((item) => {
        if (item.key === item1 || item.key === item2) {
          item.className = "project-page__category-switch xs-active";
        } else {
          item.className = "project-page__category-switch";
        }
        return item;
      })
    );
    setSelectedItem(State);
  }

  function nextBtn() {
    console.log(activeItems);
    if (activeItems[1] === State.length - 1) {
      setHideright(true);
      return;
    }
    const items = activeItems.map((item) => item + 1);
    assignClass(...items);
    setActiveItems(items);
    setHideLeft(false);
  }

  function preBtn() {
    if (activeItems[0] === 0) {
      setHideLeft(true);
      return;
    }
    const items = activeItems.map((item) => item - 1);
    assignClass(...items);
    setActiveItems(items);

    setHideright(false);
  }

  return (
    <React.Fragment>
      <div className="project-page__category " state={State}>
        <button
          className={`navigate__btn  ${hideLeft ? "hide" : ""}`}
          onClick={preBtn}
        >
          <LeftArrow />
        </button>
        {State.map((item) => (
          <Switch
            name={item.name}
            key={item.key}
            index={item.key}
            onChange={SwitchOnChangeHandle}
            className={item.className}
          />
        ))}
        <button
          className={`navigate__btn ${hideright ? "hide" : ""}`}
          onClick={nextBtn}
        >
          <RightArrow />
        </button>
      </div>
    </React.Fragment>
  );
}

export default ProjectCategory;
