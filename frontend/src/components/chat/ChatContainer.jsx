import { useAuthContext } from '../../context/AuthContext';
import Messages from './Messages';
import { FaUserCircle } from 'react-icons/fa';
import MessageInput from './MessageInput';
import useCreateChat from '../../hooks/useCreateChat';

const ChatContainer = () => {
  const { selectedUser } = useAuthContext();
  const {chatId} = useCreateChat();

  return (
    <div className="w-full flex flex-col h-full bg-gray-50 text-gray-800">
      {selectedUser && chatId ? ( // <-- Conditional rendering now depends on selectedUser and chatId
        <>
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center">
              <div className="avatar mr-3">
                <div className="w-10 rounded-full flex items-center justify-center bg-gray-300">
                  {selectedUser.profilePic ? (
                    <img src={selectedUser.profilePic} alt="User Avatar" />
                  ) : (
                    <FaUserCircle className="w-full h-full text-gray-500" />
                  )}
                </div>
              </div>
              <h2 className="text-xl font-semibold">{selectedUser.fullName}</h2>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <Messages chatId={chatId} /> {/* <-- Pass chatId as a prop */}
          </div>
          <div className="bg-white border-t border-gray-200 p-4">
            <MessageInput chatId={chatId} /> {/* <-- Pass chatId as a prop */}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-3xl font-bold">Welcome to ChatApp!</h1>
          <p className="text-lg text-gray-600 mt-2">Select a user from the sidebar to start a chat.</p>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;