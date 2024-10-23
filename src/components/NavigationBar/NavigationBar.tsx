import { MouseEventHandler } from "react";
import "./NavigationBar.css";

interface NavigationProps {
  showCreateGame: MouseEventHandler<HTMLElement>;
  showInfo: MouseEventHandler<HTMLElement>;
}

const NavigationBar = ({ showCreateGame, showInfo }: NavigationProps) => {
  return (
    <div className="nav-bar">
      <button onClick={showInfo}>Info</button>
      <h3>Music Relations Game</h3>
      <button onClick={showCreateGame}>New Game</button>
    </div>
  );
};

export default NavigationBar;
