import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDataByUserId } from "../../services/userService";
import { HumanDate } from "../utils/HumanDate";
import {
    deleteSubscriptionBySubscriptionId,
    subscribeToUser,
} from "../../services/subscriptionService";

export const UserDetail = ({ token }) => {
    const [userData, setUserData] = useState();

    const { userId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetchAndSetUserData();
    }, []);

    const fetchAndSetUserData = () => {
        getUserDataByUserId(userId).then((data) => setUserData(data));
    };
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

    const handleUnsubscribe = (sub_id) => {
        deleteSubscriptionBySubscriptionId(parseInt(sub_id)).then(() =>
            fetchAndSetUserData()
        );
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
                {/* Filter through the list of follower dictionaries, to see if the user's token is a value for a follower_id key.
                    Check to see if the current user detail userId is the author_id of the follower.
                    Check the length. If length != 0, then the button will be disabled.
                */}
                {userData?.followers?.filter(
                    (follower) =>
                        follower.follower_id === parseInt(token) &&
                        follower.author_id === parseInt(userId)
                ).length || parseInt(token) === parseInt(userId) ? (
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
                {userData?.followers?.filter(
                    (follower) =>
                        follower.follower_id === parseInt(token) &&
                        follower.author_id === parseInt(userId)
                ).length ? (
                    <button
                        className="button"
                        onClick={() => {
                            handleUnsubscribe(
                                userData?.followers?.filter(
                                    (follower) =>
                                        follower.follower_id ===
                                            parseInt(token) &&
                                        follower.author_id === parseInt(userId)
                                )[0].sub_id
                            );
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
