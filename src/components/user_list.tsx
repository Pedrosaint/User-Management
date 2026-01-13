import type { IUser } from "../types/user.type";


interface Props {
  users: IUser[];
  onSelect: (user: IUser) => void;
}

const UserList = ({ users, onSelect }: Props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Company</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} onClick={() => onSelect(user)}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.company.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
