import "./App.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Problems from "./components/Problems";

function App() {
  const [show, setShow] = useState(false);
  const [handle, setHandle] = useState("");
  const [problems, setProblems] = useState([]);

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
        let solved_aux = res.result.filter((sub) => sub.verdict === "OK");
        solved_aux = new Set(
          solved_aux.map((sub) => (sub.problem.contestId + " " + sub.problem.index))
        );
        bound = Math.floor((bound + 50) / 100) * 100;
        let count = 0;
        const aux = problems.filter(
          sub =>
            count <= 10 &&
            sub.rating === bound + 200 &&
            !solved_aux.has((sub.contestId  + " " +  sub.index))
            && count++
        );
        const aux_slice = aux.slice(0, 10);
        // console.log(bound, aux_slice, aux);
        setProblems(aux_slice);
        setShow(true);
      });
  };

  return (
    <>
      <Header />
      <section className="main">
        <h1>Cf Stats</h1>

        <form className="form" action="#" onSubmit={handleSubmit}>
          <label>Put your codeforces handle</label>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
          />
          {/* <Button>
            Submit
          </Button> */}
        </form>

        {show && <Problems problems={problems} handle={handle} />}
      </section>
    </>
  );
}

export default App;
