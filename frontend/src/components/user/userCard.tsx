import React from 'react';
import { User } from '../../types/user';
import Button from '../common/Button';

interface UserCardProps {
  user: User;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
      <p className="text-gray-600 mb-4">{user.email}</p>
      <div className="flex justify-end">
        <Button onClick={() => onEdit(user.id)} className="mr-2">
          Edit
        </Button>
        <Button
          onClick={() => onDelete(user.id)}
          className="bg-red-500 hover:bg-red-600"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default UserCard;