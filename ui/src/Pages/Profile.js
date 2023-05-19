import React, {useContext} from "react";
import AuthContext from "../context/AuthContext";
const Profile = (props) => {
    const authCtx = useContext(AuthContext);
    return (
        <div className="container">
        <div className="card">
            <div>
            <img src={props.image} alt={props.name} />
            <div>{authCtx.userName}</div>
            <div>{authCtx.userGpa}</div>
            <div>{authCtx.userDepartment}</div>
            </div>
        </div>
        </div>
    );
    }

export default Profile;