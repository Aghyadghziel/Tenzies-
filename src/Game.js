export default function Game(props) {
  const colr = {
    backgroundColor: props.bcColor ? "#59E391" : "",
  };

  return (
    <div>
      <div className="numbers" onClick={props.Change} style={colr}>
        {props.number}{" "}
      </div>
    </div>
  );
}
