import React from "react";
import Badge from "react-bootstrap/Badge";

function Bagdes({ tags }) {
  return (
    <div>
      Tags:
      {tags.map((tag) => (
        <Badge key={tag} style={{ margin: "0 4px" }} variant="secondary">{tag}</Badge>
      ))}
    </div>
  );
}

export default Bagdes;
