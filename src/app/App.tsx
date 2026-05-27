import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import ConversationSettings from "./components/ConversationSettings";
import Account from "./components/Account";
import Privacy from "./components/Privacy";
import Chats from "./components/Chats";
import Status from "./components/Status";
import ghatLogoLight from "../../arquivos/ghat_logo hor mod cla.png";
import ghatLogoDark from "../../arquivos/ghat_logo hor mod esc.png";

type Screen = "welcome" | "login" | "register" | "forgot-password" | "settings" | "profile" | "account" | "privacy" | "conversations" | "chats" | "status";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  
  const [userName, setUserName] = useState(() => {
    if (typeof window === "undefined") {
      return "Kaio";
    }
    return localStorage.getItem("ghat-user-name") ?? "Kaio";
  });
  const [userEmail, setUserEmail] = useState(() => {
    if (typeof window === "undefined") {
      return "kaio@email.com";
    }
    return localStorage.getItem("ghat-user-email") ?? "kaio@email.com";
  });
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") {
      return "pt-BR";
    }
    return localStorage.getItem("ghat-language") ?? "pt-BR";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ghat-language", language);
    }
  }, [language]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ghat-user-name", userName);
    }
  }, [userName]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ghat-user-email", userEmail);
    }
  }, [userEmail]);

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return (
          <Login
            isDark={isDark}
            setIsDark={setIsDark}
            email={userEmail}
            setEmail={setUserEmail}
            onBack={() => setCurrentScreen("welcome")}
            onRegister={() => setCurrentScreen("register")}
            onForgotPassword={() => setCurrentScreen("forgot-password")}
            onLogin={() => setCurrentScreen("chats")}
          />
        );
      case "register":
        return (
          <Register
            isDark={isDark}
            setIsDark={setIsDark}
            name={userName}
            setName={setUserName}
            email={userEmail}
            setEmail={setUserEmail}
            onBack={() => setCurrentScreen("welcome")}
            onLogin={() => setCurrentScreen("login")}
          />
        );
      case "forgot-password":
        return (
          <ForgotPassword
            isDark={isDark}
            setIsDark={setIsDark}
            email={userEmail}
            setEmail={setUserEmail}
            onBack={() => setCurrentScreen("login")}
            onSubmit={() => undefined}
          />
        );
      case "settings":
        return (
          <Settings
            isDark={isDark}
            setIsDark={setIsDark}
            userName={userName}
            language={language}
            setLanguage={setLanguage}
            onNavigate={(screen) => setCurrentScreen(screen as Screen)}
            onBack={() => setCurrentScreen("chats")}
          />
        );
      case "profile":
        return (
          <Profile
            isDark={isDark}
            name={userName}
            setName={setUserName}
            email={userEmail}
            setEmail={setUserEmail}
            onBack={() => setCurrentScreen("settings")}
          />
        );
      case "conversations":
        return <ConversationSettings isDark={isDark} onBack={() => setCurrentScreen("settings")} />;
      case "account":
        return <Account isDark={isDark} onBack={() => setCurrentScreen("settings")} />;
      case "privacy":
        return <Privacy isDark={isDark} onBack={() => setCurrentScreen("settings")} />;
      case "status":
        return (
          <Status
            isDark={isDark}
            setIsDark={setIsDark}
            onSettings={() => setCurrentScreen("settings")}
            onNavigate={(screen) => setCurrentScreen(screen as Screen)}
          />
        );
      case "chats":
        return (
          <Chats
            isDark={isDark}
            setIsDark={setIsDark}
            onSettings={() => setCurrentScreen("settings")}
            onNavigate={(screen) => setCurrentScreen(screen as Screen)}
          />
        );
      default:
        return (
          <div
            style={{ backgroundColor: isDark ? "#080a00" : "#e9e9e7" }}
            className={`min-h-svh w-full flex flex-col items-center justify-center transition-colors duration-500 ${
              isDark ? "text-white" : "text-[#1d1d1b]"
            }`}
          >
            <button
              onClick={() => setIsDark(!isDark)}
              className={`absolute top-8 right-8 p-3 rounded-full transition-colors ${
                isDark
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-black/10 hover:bg-black/20"
              }`}
              aria-label="Trocar tema"
            >
              {isDark ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>

            <div className="flex flex-col items-center gap-12">
              <motion.div
                initial={{ opacity: 0, y: -30, scale: 0.75, rotate: -3 }}
                animate={{ opacity: 1, y: 0, scale: [0.75, 1.05, 1], rotate: [-3, 1, 0] }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
              >
                <h1 className="text-4xl md:text-5xl text-center font-husty">
                  Bem-vindo ao
                </h1>
                <img
                  src={isDark ? ghatLogoDark : ghatLogoLight}
                  alt="Ghat"
                  className="h-20 md:h-24 w-auto"
                />
              </motion.div>

              <AnimatePresence mode="wait">
                {!showAuth ? (
                  <motion.button
                    key="touch"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => setShowAuth(true)}
                    className={`text-2xl px-8 py-4 rounded-full transition-all ${
                      isDark
                        ? "bg-white/10 hover:bg-white/20"
                        : "bg-black/10 hover:bg-black/20"
                    }`}
                  >
                    Toque aqui para continuar
                  </motion.button>
                ) : (
                  <motion.div
                    key="auth"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <button
                      onClick={() => setCurrentScreen("login")}
                      className={`px-8 py-3 rounded-full text-lg transition-all ${
                        isDark
                          ? "bg-white text-black hover:bg-white/90"
                          : "bg-black text-white hover:bg-black/90"
                      }`}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => setCurrentScreen("register")}
                      className={`px-8 py-3 rounded-full text-lg transition-all ${
                        isDark
                          ? "bg-white/10 hover:bg-white/20 border border-white"
                          : "bg-black/10 hover:bg-black/20 border border-black"
                      }`}
                    >
                      Registro
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="min-h-svh w-full"
      style={{ backgroundColor: isDark ? "#080a00" : "#e9e9e7" }}
    >
      <motion.div
        key={currentScreen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="h-full w-full"
      >
        {renderScreen()}
      </motion.div>
    </div>
  );
}