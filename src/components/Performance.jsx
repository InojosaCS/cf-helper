import React from "react";
import { JSC, JSCharting } from "jscharting-react";

const config = {
  type: "horizontal column",
  series: [
    {
      points: [
        { x: "A", y: 50 },
        { x: "B", y: 30 },
        { x: "C", y: 50 },
      ],
    },
  ],
};

const divStyle = {
  maxWidth: "700px",
  height: "400px",
  margin: "0px auto",
};

function Performance() {
  return (
    <>
      <div>arriba</div>
      <div style={divStyle}>
        <JSCharting options={config} />
      </div>
      <div>abajo</div>
    </>
  );
}

export default Performance;
