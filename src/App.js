import "./App.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useRef } from "react";
import Problems from "./components/Problems";
import Solved from "./components/Solved";

function App() {
  const [show, setShow] = useState(false);
  const [showSolved, setShowSolved] = useState(false);
  const [solved, setSolved] = useState([]);
  const [handle, setHandle] = useState("");
  const [problems, setProblems] = useState([]);
  const dummy = useRef(false);

  useEffect(() => {
    async function getProblems() {
      await fetch("https://codeforces.com/api/problemset.problems")
        .then((res) => res.json())
        .then((data) => {
          data = data.result.problems;
          setProblems(data);
        });
    }
    getProblems();
  }, []);
  
  const getRating = async (e) => {
    let list_of_user = await fetch(
      "https://codeforces.com/api/user.info?handles=" + handle
    ).then((res) => res.json());
    return list_of_user.result[0].rating;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let bound = await getRating(e);
    await fetch("https://codeforces.com/api/user.status?handle=" + handle)
      .then((res) => res.json())
      .then((res) => {
        let solved_aux = res.result.filter(
          (sub) => sub.verdict === "OK" && sub.problem.hasOwnProperty("rating")
        );
        let top_solved = solved_aux.sort((a, b) => {
          return b.problem.rating - a.problem.rating;
        });
        let top10_solved = [];
        for(let problem of top_solved){
          if(top10_solved.length < 10 && !top10_solved.some(sub => sub.id === problem.id)){
            top10_solved.push(problem);
          } else {
            break;
          }
        }
        setSolved(top10_solved);

        solved_aux = new Set(
          solved_aux.map(
            (sub) => sub.problem.contestId + " " + sub.problem.index
          )
        );
        bound = Math.floor((bound + 50) / 100) * 100;
        let count = 0;
        const aux = problems.filter(
          (sub) =>
            count <= 10 &&
            sub.rating === bound + 200 &&
            !solved_aux.has(sub.contestId + " " + sub.index) &&
            count++
        );
        const aux_slice = aux.slice(0, 10);
        setProblems(aux_slice);
        setShow(true);
        setShowSolved(true);
      });
  };

  return (
    <>
      <Header />
      <section className="main">
        <h1>Cf Stats</h1>

        <form className="form" action="#" onSubmit={handleSubmit}>
          <label style={ {margin: "8px 0"} }>
            Put your codeforces handle (if you don't have a codeforces account
            you can try with my handle inojosacs). It may take a while to load the data.
          </label>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
          />
          {/* <Button>
            Submit
          </Button> */}
        </form>

        {showSolved && <Solved solved={solved} handle={handle} />}
        {show && <Problems problems={problems} handle={handle} />}
      </section>
    </>
  );
}

export default App;
