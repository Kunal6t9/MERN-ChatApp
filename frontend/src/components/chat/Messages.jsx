import useGetMessages from '../../hooks/useGetMessages';

const Messages = () => {
  const {loading, messages} = useGetMessages();

  if(loading){
    return <div className="text-center">Loading messages...</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message._id} className="p-2 rounded-lg bg-blue-500 text-white self-start">
            {message.text}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No messages yet...</div>
      )}
    </div>
  );
}

export default Messages 