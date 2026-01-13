import { useEffect, useState } from "react";
import UserDetails from "./user_details";
import UserList from "./user_list";
import type { IUser } from "../types/user.type";

const UserManagement = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data: IUser[] = await res.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // show a brief searching state to signal local filtering work
    setSearching(true);

    const handle = setTimeout(() => {
      const result = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(result);
      setSearching(false);
    }, 150); // small debounce to avoid flicker while typing

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

      {loading && <p>Loading users...</p>}
      {searching && !loading && <p>Filtering users...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && filteredUsers.length === 0 && (
        <p>No users found.</p>
      )}

      {!loading && !error && filteredUsers.length > 0 && (
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
