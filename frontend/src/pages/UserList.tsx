import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  selectUsers,
  selectUserStatus,
  selectUserError,
} from "../store/userSlice";
import { AppDispatch } from "../store";
import UserCard from "../components/user/userCard";
import LoadingSpinner from "../components/common/LoaderSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const status = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "failed") {
    return <ErrorMessage message={error || "Failed to fetch users"} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">User List</h1>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={(id) => console.log(`Edit user ${id}`)}
          onDelete={(id) => console.log(`Delete user ${id}`)}
        />
      ))}
    </div>
  );
};

export default UserList;
