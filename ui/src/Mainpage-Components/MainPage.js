import SideBar from "./SideBar";
import "./MainPage.css";
export default function MainPage(props) {
    function loggedInHandler() {
        props.changeLoggedInStatus();
    }
    return (
        <div className="container">
            <SideBar changeLoggedInStatus={loggedInHandler} />
        </div>
    );
}
