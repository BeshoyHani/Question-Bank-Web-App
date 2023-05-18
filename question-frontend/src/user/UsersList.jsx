import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "./UserAPI";
import UserItem from "./UserItem";

export default function UsersList() {
    const [users, setUsers] = useState([]);

    const onDeleteUser = async (username) => {
        try {
            await deleteUser(username);
            setUsers(users.map(user => user.username !== username));
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const getUsers = async () => {
            const users = await getAllUsers();
            return users;
        };

        getUsers()
            .then(users => setUsers(users))
            .catch(error => console.log(error.message));
    }, []);
    return (
        <div>
            {users.map((user, index) => {
                return <UserItem username={user.username} userType={user.userType} onDeleteUser={onDeleteUser} key={index} />
            })}
        </div>
    );
}