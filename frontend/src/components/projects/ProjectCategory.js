import React, { useState } from "react";
import Switch from "../../UI/Switch";

const InitialState = [
  {
    name: "Arts",
    status: false,
    key: 0,
  },
  {
    name: "Comics & Illustrarion",
    status: false,
    key: 1,
  },
  {
    name: "Design & Tech",
    status: false,
    key: 2,
  },
  {
    name: "Film",
    status: false,
    key: 3,
  },
  {
    name: "Games",
    status: false,
    key: 4,
  },
  {
    name: "Music",
    status: false,
    key: 5,
  },
  {
    name: "Publishing",
    status: false,
    key: 6,
  },
];

function ProjectCategory({ setSelectedItem }) {
  const [State, setState] = useState(InitialState);
  setSelectedItem(State);

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

  return (
    <React.Fragment>
      <div className="project-page__category" state={State}>
        {State.map((item) => (
          <Switch
            name={item.name}
            key={item.key}
            index={item.key}
            onChange={SwitchOnChangeHandle}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

export default ProjectCategory;
