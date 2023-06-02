import React from "react";
import "./Home.css";

export default function Home(props) {
  return (
    // ayarla domal
    <div className="home-temp-container">
      <div className="home-container">
        Department representitive election time: {props.time}
      </div>
    </div>
  );
}
