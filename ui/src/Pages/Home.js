import React, {useEffect} from "react";
import "./Home.css";

export default function Home(props) {
  useEffect(() => {
    localStorage.getItem("isDateSet");
  }, []);

  return (
    <div className="home-temp-container">
      <div className="home-header">
        <h1 className="home-title">IZTECH ONLINE ELECTION SYSTEM</h1>
      </div>
      <section>
        <div className="home-left-box">
          <h2>ABOUT THE SYSTEM</h2>
          <p>
            The goal of this dedicated website for our school's upcoming
            elections is to ensure transparency and foster active participation
            among students. The system aims to provide a reliable source of
            information regarding the candidates and their respective visions
            for our educational institution. By equipping you with comprehensive
            profiles and proposed initiatives, the system empowers you to make
            informed decisions and actively contribute to shaping the future of
            our school community.
          </p>
        </div>
        <div className="home-right-box">
          <img
            className="home-main-icon"
            src={require("../images/home/system.png")}
          />
        </div>
      </section>

      <div className="dates">
        <div className="date dep-rep-el-date">
          <p>Department representative election date: </p>
          <span style={{ color: "#9a0e20", fontWeight: "bold" }}>
          {props.time && localStorage.getItem("isDateSet") === "true"
          ? "Election is on"
          : props.time}
          </span>
        </div>

       {/*  <div className="date fac-rep-el-date">
          <p>Faculty representative election date: </p>
          <span style={{ color: "#9a0e20", fontWeight: "bold" }}>
            {props.time}
          </span>
        </div>*/}
      </div>
      <h3 className="how-it-works">HOW IT WORKS</h3>
      <div className="QA-section-container">
        <div className="QA-section">
          <div className="QA-icon-box">
            <img
              className="QA-icon"
              src={require("../images/home/voting.png")}
            />
          </div>
          <div className="QA">
            <h4>VOTE</h4>
            <p>
              Our system is designed to make your voting process easy, fast and
              secure.
            </p>
          </div>
        </div>
        <div className="QA-section">
          <div className="QA-icon-box">
            <img
              className="QA-icon"
              src={require("../images/home/candidate.png")}
            />
          </div>
          <div className="QA">
            <h4>BECOME CANDIDATE</h4>
            <p>
              You can be a candidate to shape the future of campus. With this
              system, it is much easier.
            </p>
          </div>
        </div>
        <div className="QA-section">
          <div className="QA-icon-box">
            <img
              className="QA-icon"
              src={require("../images/home/upload_documents.png")}
            />
          </div>
          <div className="QA">
            <h4>UPLOAD DOCUMENTS</h4>
            <p>
              Your documents are transmitted much faster to the units they need
              to go.
            </p>
          </div>
        </div>
        <div className="QA-section">
          <div className="QA-icon-box">
            <img
              className="QA-icon"
              src={require("../images/home/notify.png")}
            />
          </div>
          <div className="QA">
            <h4>GET NOTIFIED</h4>
            <p>
              You will receive notifications for your actions. Don't forget to
              check your mailbox
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
