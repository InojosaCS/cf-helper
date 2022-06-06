import React from "react";
import Bagdes from "./Bagdes";

function Problems({ problems, handle }) {
  return (
    <div>
      <h3 style={{ margin: "30px 0" }}>
        Challenging (+200 rating) unsolved problems for{" "}
        <a href={"https://codeforces.com/profile/" + handle}>{handle}</a>
      </h3>
      <ol>
        {problems.map((problem) => (
          <li
            key={problem.contestId + "/" + problem.index}
            style={{ margin: "15px 0" }}
          >
            <h5>{problem.name}</h5>
            <Bagdes tags={problem.tags} />
            <a
              href={
                "https://codeforces.com/problemset/problem/" +
                problem.contestId +
                "/" +
                problem.index
              }
            >
              Open problem
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Problems;
