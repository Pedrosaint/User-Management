import type { IUser } from "../types/user.type";



interface Props {
  user: IUser;
  onClose: () => void;
}

const UserDetails = ({ user, onClose }: Props) => {
  return (
    <div className="side-panel">
      <button onClick={onClose} className="close-btn">
        close
      </button>

      <h2>User Details</h2>

      <p>
        <strong>Name:</strong> {user.name}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Company:</strong> {user.company.name}
      </p>
    </div>
  );
};

export default UserDetails;
