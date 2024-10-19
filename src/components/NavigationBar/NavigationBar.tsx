import "./NavigationBar.css";

const NavigationBar = ({ showCreateGame }: any) => {
  return (
    <div className="nav-bar">
      <button>Info</button>
      <h3>Music Relations Game</h3>
      <button onClick={showCreateGame}>New Game</button>
    </div>
  );
};

export default NavigationBar;
