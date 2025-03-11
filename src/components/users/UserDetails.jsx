import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDataByUserId } from "../../services/userService";
import { HumanDate } from "../utils/HumanDate";
import { subscribeToUser } from "../../services/subscriptionService";

export const UserDetail = ({ token }) => {
    const [userData, setUserData] = useState();

    const { userId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        getUserDataByUserId(userId).then((data) => setUserData(data));
    }, []);

    const handleSubscribe = () => {
        const submissionObject = {
            follower_id: parseInt(token),
            author_id: parseInt(userId),
            created_on: new Date(),
        };
        subscribeToUser(submissionObject).then(() => {
            navigate("/");
        });
    };

    const handleUnsubscribe = () => {
        const submissionObject = {
            follower_id: parseInt(token),
            author_id: parseInt(userId),
        };
    };

    return (
        <div className="grid">
            <div className="cell is-col-min-20">
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
                                Full Name: {userData?.first_name}{" "}
                                {userData?.last_name}
                            </div>
                        </div>
                        <div className="column">
                            <div>Username: {userData?.username}</div>
                            <div>
                                Joined:{" "}
                                <HumanDate date={userData?.created_on} />
                            </div>
                            <div>Bio: {userData?.bio}</div>
                        </div>
                    </section>
                </div>
            </div>
            <div className="cell">
                {userData?.followers?.includes(parseInt(token)) ||
                parseInt(token) === parseInt(userId) ? (
                    <button className="button" disabled>
                        Subscribe to User
                    </button>
                ) : (
                    <button
                        className="button"
                        onClick={() => {
                            handleSubscribe();
                        }}
                    >
                        Subscribe to User
                    </button>
                )}
                {userData?.followers?.includes(parseInt(token)) ? (
                    <button
                        className="button"
                        onClick={() => {
                            handleUnsubscribe();
                        }}
                    >
                        Unsubscribe
                    </button>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};
