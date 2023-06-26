import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "./UserAPI";
import UserItem from "./UserItem";
import TimedModal from "../common/TimedModal";

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    const setErrorMessage = (msg) => {
        setError(msg);
        setTimeout(() => setError(''), 2000);
    }

    const onDeleteUser = async (username) => {
        try {
            await deleteUser(username);
            const users = await getAllUsers();
            setUsers(users);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }


    useEffect(() => {
        const getUsers = async () => {
            const users = await getAllUsers();
            return users;
        };

        getUsers()
            .then(users => setUsers(users))
            .catch(error => setErrorMessage(error.message));
    }, []);
    return (
        <div className="question-list-container">
            <h2 id='list-title'>Users</h2>
            {users.map((user, index) => {
                return <UserItem username={user.username} userType={user.userType} onDeleteUser={onDeleteUser} key={index} />
            })}


            {
                error.length > 0 &&
                <TimedModal time={3000} modalTitle='Error' modalMessage={error} />
            }
        </div>
    );
}