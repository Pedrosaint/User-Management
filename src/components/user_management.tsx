import { useEffect, useState } from "react";
import UserDetails from "./user_details";
import UserList from "./user_list";
import type { IUser } from "../types/user.type";
import { useGetUsersQuery } from "../api/usersApi";

const UserManagement = () => {
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState("");

  const { data: users = [], isLoading, error } = useGetUsersQuery();

  useEffect(() => {
    if (!users.length) {
      setFilteredUsers([]);
      return;
    }

    setSearching(true);

    const handle = setTimeout(() => {
      const result = users.filter((user: IUser) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(result);
      setSearching(false);
    }, 150);

    return () => clearTimeout(handle);
  }, [search, users]);

  return (
    <div className="container">
      <h1>User Management</h1>

      <input
        type="text"
        placeholder="Filter by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      {isLoading && <p>Loading users...</p>}
      {searching && !isLoading && <p>Filtering users...</p>}

      {error && <p className="error">Failed to load users.</p>}

      {!isLoading && !error && filteredUsers.length === 0 && (
        <p>No users found.</p>
      )}

      {!isLoading && !error && filteredUsers.length > 0 && (
        <UserList users={filteredUsers} onSelect={setSelectedUser} />
      )}

      {selectedUser && (
        <UserDetails
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UserManagement;
