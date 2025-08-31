import { RiChat3Line } from "react-icons/ri"; // Import a chat icon

const AppBackground = () => {
  return (
    <div className="text-white text-center">
      <RiChat3Line className="text-8xl mb-4 mx-auto" />
      <h1 className="text-7xl font-extrabold tracking-wide">ChatApp</h1>
      <p className="text-xl mt-4 max-w-md">Connect with friends, share your moments, and chat in real-time.</p>
    </div>
  );
};

export default AppBackground;