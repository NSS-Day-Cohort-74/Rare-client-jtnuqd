import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const UserList = () => {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8088/users")
            .then((response) => response.json())
            .then((data) => setAllUsers(data));
    }, []);

    return (
        <section>
            <h1 className="title is-3 has-text-centered">All Users</h1>
            <div className="grid">
                <table className="cell is-hoverable">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Email Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user) => {
                            return (
                                <tr
                                    key={user.id}
                                    className="table is-bordered is-striped"
                                >
                                    <td className="">
                                        <Link to={`/users/${user.id}`}>
                                            {user.username}
                                        </Link>
                                    </td>
                                    <td className="">
                                        {user.first_name} {user.last_name}
                                    </td>
                                    <td className="">{user.email}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
