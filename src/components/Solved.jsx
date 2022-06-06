import React from "react";

function Solved({ solved, handle }) {
  return (
    <div>
      <h3 style={{ margin: "30px 0" }}>
        Top 10 harderst solves for{" "}
        <a href={"https://codeforces.com/profile/" + handle}>{handle}</a>
      </h3>
      <ol>
        {solved ? solved.map((sub) => (
          <li
            key={sub.id}
            style={{ margin: "15px 0" }}
          >
            <h5>{sub.problem.name}, rating: {sub.problem.rating}</h5>
            <a
              href={
                "https://codeforces.com/problemset/problem/" +
                sub.problem.contestId +
                "/" +
                sub.problem.index
              }
            >
              Open problem
            </a>
          </li>
        )) : <p>Waiting</p>}
      </ol>
    </div>
  );
}

export default Solved;
