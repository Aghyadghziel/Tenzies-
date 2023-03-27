import Game from "./Game";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [allNums, setAllNums] = React.useState(GenNumber());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const wining = allNums.every((num) => num.bcColor);
    const firstValue = allNums[0].value;
    const allSameValues = allNums.every((num) => num.value === firstValue);
    if (wining && allSameValues) {
      setTenzies(true);
    }
  }, [allNums]);

  function GenNumber() {
    const num = [];
    for (let i = 0; i < 10; i++) {
      num.push({
        value: Math.ceil(Math.random() * 6),
        bcColor: false,
        id: nanoid(),
      });
    }
    return num;
  }

  function Mapnums() {
    return allNums.map((old) => (
      <Game
        key={old.id}
        bcColor={old.bcColor}
        number={old.value}
        Change={() => Change(old.id)}
      />
    ));
  }

  function Rolling() {
    if (!tenzies) {
      setAllNums((old) =>
        old.map((num) =>
          num.bcColor
            ? num
            : {
                value: Math.ceil(Math.random() * 6),
                bcColor: false,
                id: nanoid(),
              }
        )
      );
    } else {
      setTenzies(false);
      setAllNums(GenNumber());
    }
  }

  function Change(id) {
    setAllNums((old) =>
      old.map((num) =>
        num.id === id ? { ...num, bcColor: !num.bcColor } : num
      )
    );
  }

  return (
    <div className="App">
      <div className="container">
        <h2 className="title">Tenzies</h2>
        <p className="explain">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        {Mapnums()}
        <button onClick={Rolling}>{tenzies ? "New Game" : "Roll"}</button>
        {tenzies && (
          <Confetti
            width={document.querySelector(".container").clientWidth}
            height={document.querySelector(".container").clientHeight}
          />
        )}
      </div>
    </div>
  );
}

export default App;
