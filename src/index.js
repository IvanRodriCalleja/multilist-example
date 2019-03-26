import React from "react";
import { render } from "react-dom";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import "./styles.css";

//------------------------------------
//-- Pendings topics
//------------------------------------
// - Scroll => Una lista de listas
// - Collapsable => Preprocesamiendo de padres y nodes hijos
// - Storage => Mobx OR Context
// - Drag&Drop => PENDING

const data = {
  date: "2019-03-26",
  channelId: 1,
  timeTable: [
    {
      id: 1,
      type: "container",
      parentId: "",
      name: "BE MAD TRAVEL",
      tcIn: "07:00:00.00",
      duration: "00:00:00.00",
      isopen: true,
      childrens: []
    },
    {
      id: 2,
      type: "product",
      parentId: 1,
      name: "EL ZAPPING DE SURFEROS: LO MEJOR",
      tcIn: "07:00:00.00",
      duration: "01:13:31.00"
    },
    {
      id: 3,
      type: "segment",
      parentId: 2,
      name: "EL ZAPPING DE SURFEROS: LO MEJOR",
      tcIn: "07:00:00.00",
      duration: "00:35:20.10"
    },
    {
      id: 4,
      type: "break",
      parentId: 2,
      name: "BREAK 07.30",
      tcIn: "07:35:20.10",
      duration: "00:01:30.00"
    }
  ]
};

let numberOfParents = 0;

const handlerCollapsable = componentIdentifier => {
  console.log(componentIdentifier);
};

const Row = ({ index, style }) => {
  const row = data.timeTable[index % data.timeTable.length];
  numberOfParents = row.parentId === "" ? 0 : numberOfParents + 1;
  const componentIdentifier = `component-${row.type}-${row.id}`;

  return (
    <div
      className={
        componentIdentifier + (index % 2 ? " ListItemOdd" : " ListItemEven")
      }
      style={style}
    >
      <div className={"width-20"}>{row.tcIn}</div>
      {numberOfParents >= 0 && (
        <div style={{ background: "purple" }} className={"line"} />
      )}
      {numberOfParents >= 1 && (
        <div style={{ background: "red" }} className={"line"} />
      )}
      {numberOfParents >= 2 && (
        <div style={{ background: "lightblue" }} className={"line"} />
      )}
      {numberOfParents >= 3 && (
        <div style={{ background: "gray" }} className={"line"} />
      )}
      <div className={"width-60"}>
        <button
          onClick={e => {
            handlerCollapsable(componentIdentifier);
          }}
        >
          -
        </button>{" "}
        {row.name} - {row.type}
      </div>
      <div className={"width-20 text-align-right"}>{row.duration}</div>
    </div>
  );
};

const Lists = ({ index, style, data: { height } }) => {
  const getRowNumber = numberOfParents => {
    return data.timeTable.length * numberOfParents;
  };
  return (
    <div style={style}>
      <List
        className="List"
        itemCount={getRowNumber(100)}
        itemSize={50}
        width={600}
        height={height}
      >
        {Row}
      </List>
    </div>
  );
};

const Example = () => {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className="List"
          itemCount={2}
          itemSize={600}
          width={width}
          height={height}
          layout="horizontal"
          itemData={{ height }}
        >
          {Lists}
        </List>
      )}
    </AutoSizer>
  );
};

render(<Example />, document.getElementById("root"));
