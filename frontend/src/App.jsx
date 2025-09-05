import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPagenpm ";
import ChatPage from "./pages/ChatPage";
import AppBackground from "./components/common/AppBackground";

function App() {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (authUser && (pathname === "/login" || pathname === "/signup")) {
      navigate("/");
    } else if (!authUser && pathname === "/") {
      navigate("/login");
    }
  }, [authUser, navigate, pathname]);

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <div className="flex h-screen"> {/* Keep the flex container for the split-screen */}
      <div className={isAuthPage ? "w-1/2 bg-white flex items-center justify-center p-4" : "w-full"}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<ChatPage />} />
        </Routes>
      </div>

      {isAuthPage && (
        <div className="w-1/2 bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center relative overflow-hidden">
          <AppBackground />
        </div>
      )}
    </div>
  );
}

export default App;