import useGetUsers from "../../hooks/useGetUsers";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  const {loading,users} = useGetUsers();


  return (
    <div className="flex flex-col p-4 overflow-y-auto h-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Chats</h2>
      {loading ? (
        <div className="text-center text-gray-500">Loading users...</div>
      ) : (
        <div className="flex flex-col gap-2">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors duration-200"
              >
                <div className="avatar mr-3">
                  <div className="w-10 rounded-full">
                    <img src={user.profilePic} alt="User Avatar" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-gray-900">{user.fullName}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No users found.</div>
          )}
        </div>
      )}
      <div className="mt-auto">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar
