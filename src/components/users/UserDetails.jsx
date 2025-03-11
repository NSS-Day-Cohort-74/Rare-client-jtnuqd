import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserDataByUserId } from "../../services/userService";
import { HumanDate } from "../utils/HumanDate";

export const UserDetail = () => {
    const [userData, setUserData] = useState();

    const { userId } = useParams();

    useEffect(() => {
        getUserDataByUserId(userId).then((data) => setUserData(data));
    }, []);

    return (
        <div className="card p-2 m-5">
            <section className="columns m-2 p-2">
                <div className="column card-image">
                    <figure className="image-is4by3">
                        <img
                            src={userData?.profile_image_url}
                            alt="Placeholder img"
                        />
                    </figure>
                    <div>
                        Full Name: {userData?.first_name} {userData?.last_name}
                    </div>
                </div>
                <div className="column">
                    <div>Username: {userData?.username}</div>
                    <div>
                        Joined: <HumanDate date={userData?.created_on} />
                    </div>
                    <div>Bio: {userData?.bio}</div>
                </div>
            </section>
        </div>
    );
};
