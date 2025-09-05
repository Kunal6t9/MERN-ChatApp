import Sidebar from '../components/chat/Sidebar'
import ChatContainer from '../components/chat/ChatContainer'

const ChatPage = () => {
  return (
    <div className="flex w-full h-screen bg-gray-100">
      {/* Sidebar for user list */}
      <div className="w-1/4 bg-white border-r border-gray-200">
        <Sidebar />
      </div>

      {/* Main chat window */}
      <div className="w-3/4">
        <ChatContainer />
      </div>
    </div>
  );
};

export default ChatPage