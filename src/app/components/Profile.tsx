import { motion } from "motion/react";
import { ArrowLeft, Edit, Camera, Copy, Check, Mail } from "lucide-react";
import { useState } from "react";

interface ProfileProps {
  isDark: boolean;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  onBack: () => void;
}

export default function Profile({ isDark, name, setName, email, setEmail, onBack }: ProfileProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [copied, setCopied] = useState(false);
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{ backgroundColor: isDark ? "#080a00" : "#e9e9e7" }}
      className={`min-h-svh w-full transition-colors duration-500 ${
        isDark ? "text-white" : "text-[#1d1d1b]"
      }`}
    >
      {/* Header */}
      <div className="p-4 sm:p-6 flex items-center gap-4">
        <button
          onClick={onBack}
          className={`p-2 rounded-full transition-colors ${
            isDark
              ? "bg-white/10 hover:bg-white/20"
              : "bg-black/10 hover:bg-black/20"
          }`}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold">Perfil</h1>
      </div>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-8 sm:mb-12 mt-6 sm:mt-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative mb-4"
        >
          <div
            className={`w-28 h-28 sm:w-40 sm:h-40 rounded-full border flex items-center justify-center text-3xl sm:text-5xl font-semibold ${
              isDark
                ? "bg-white/5 border-white/20 text-white"
                : "bg-black/5 border-black/20 text-[#1d1d1b]"
            }`}
            style={{ boxShadow: "0 16px 36px rgba(0, 0, 0, 0.18)" }}
          >
            {initials || "U"}
          </div>
        </motion.div>

        <button
          className="flex items-center gap-2 px-5 sm:px-6 py-2 rounded-full transition-colors"
          style={{ backgroundColor: isDark ? "#00ff00" : "#00cc00", color: isDark ? "#000" : "#1d1d1b" }}
        >
          <Camera className="w-4 h-4" />
          <span className="font-semibold">Editar</span>
        </button>
      </div>

      {/* Name Section */}
      <div className="px-4 sm:px-6 mb-8">
        <p className={`text-sm mb-2 ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
          Nome
        </p>
        <div className={`flex items-center justify-between rounded-2xl px-4 py-3 backdrop-blur-lg ${
          isDark ? "bg-white/5" : "bg-white/40"
        }`}>
          {isEditingName ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.currentTarget.blur();
                  setIsEditingName(false);
                }
              }}
              onBlur={() => setIsEditingName(false)}
              autoFocus
              className={`text-xl sm:text-2xl font-semibold bg-transparent border-b-2 outline-none flex-1 ${
                isDark ? "border-white" : "border-black"
              }`}
            />
          ) : (
            <h2 className="text-xl sm:text-2xl font-semibold">{name}</h2>
          )}
          <button
            onClick={() => setIsEditingName(true)}
            className={`p-2 rounded-full transition-colors ${
              isDark
                ? "hover:bg-white/10"
                : "hover:bg-black/10"
            }`}
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Email Section */}
      <div className="px-4 sm:px-6">
        <p className={`text-sm mb-2 ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
          Email
        </p>
        <div className={`flex items-center justify-between rounded-2xl px-4 py-3 backdrop-blur-lg ${
          isDark ? "bg-white/5" : "bg-white/40"
        }`}>
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded ${
                isDark ? "bg-white/10" : "bg-black/10"
              }`}
            >
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={`bg-transparent text-base sm:text-xl font-medium outline-none ${
                isDark ? "text-white" : "text-[#1d1d1b]"
              }`}
            />
          </div>
          <button
            onClick={handleCopyEmail}
            className={`p-2 rounded-full transition-colors ${
              isDark
                ? "hover:bg-white/10"
                : "hover:bg-black/10"
            }`}
          >
            {copied ? (
              <Check className="w-5 h-5" style={{ color: "#00ff00" }} />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
