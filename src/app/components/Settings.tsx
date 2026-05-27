import { motion } from "motion/react";
import { Sun, Moon, Search, User, Key, Lock, MessageSquare, ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface SettingsProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  userName: string;
  language: string;
  setLanguage: (value: string) => void;
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

export default function Settings({ isDark, setIsDark, userName, language, setLanguage, onNavigate, onBack }: SettingsProps) {
  const initials = userName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const languageOptions = [
    { value: "pt-BR", label: "Portugues (Brasil)" },
    { value: "en-US", label: "Ingles (EUA)" },
    { value: "es-ES", label: "Espanhol" },
    { value: "fr-FR", label: "Frances" },
    { value: "de-DE", label: "Alemao" },
    { value: "it-IT", label: "Italiano" },
    { value: "ja-JP", label: "Japones" },
    { value: "ko-KR", label: "Coreano" },
  ];
  const menuItems = [
    {
      id: "profile",
      icon: User,
      title: "Perfil",
      subtitle: "Nome, foto do perfil",
    },
    {
      id: "account",
      icon: Key,
      title: "Conta",
      subtitle: "Notificações de segurança, dados da conta",
    },
    {
      id: "privacy",
      icon: Lock,
      title: "Privacidade",
      subtitle: "Contatos bloqueados, mensagens temporárias",
    },
    {
      id: "conversations",
      icon: MessageSquare,
      title: "Conversas",
      subtitle: "Tema, papel de parede, configurações de conversas",
    },
  ];

  return (
    <div
      style={{ backgroundColor: isDark ? "#080a00" : "#e9e9e7" }}
      className={`min-h-svh w-full transition-colors duration-500 ${
        isDark ? "text-white" : "text-[#1d1d1b]"
      }`}
    >
      {/* Header */}
      <div className="p-4 sm:p-6 pb-3 sm:pb-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className={`p-2 rounded-full transition-colors ${
              isDark
                ? "bg-white/10 hover:bg-white/20"
                : "bg-black/10 hover:bg-black/20"
            }`}
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-full transition-colors ${
              isDark
                ? "bg-white/10 hover:bg-white/20"
                : "bg-black/10 hover:bg-black/20"
            }`}
            aria-label="Trocar tema"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
            style={{ color: "#DC143C" }}
          />
          <input
            type="text"
            placeholder="Pesquisar"
            className={`w-full pl-12 pr-4 py-3 rounded-full transition-colors border-2 backdrop-blur-lg ${
              isDark
                ? "bg-white/5 border-[#DC143C] text-white placeholder-gray-400"
                : "bg-white/50 border-[#DC143C] text-[#1d1d1b] placeholder-[#1d1d1b]"
            }`}
            style={{ borderColor: "#DC143C" }}
          />
        </div>
      </div>

      {/* Profile */}
      <div className="flex justify-center mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative text-center"
        >
          <div
            className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full border flex items-center justify-center text-2xl sm:text-3xl font-semibold ${
              isDark
                ? "bg-white/5 border-white/20 text-white"
                : "bg-black/5 border-black/20 text-[#1d1d1b]"
            }`}
            style={{ boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)" }}
          >
            {initials}
          </div>
          <div className="mt-4">
            <p className="text-xl sm:text-2xl font-bold">{userName}</p>
          </div>
        </motion.div>
      </div>

      {/* Language */}
      <div className="px-4 sm:px-6 mb-6">
        <div
          className={`w-full p-4 rounded-xl border transition-colors backdrop-blur-xl ${
            isDark
              ? "bg-white/5 border-white/15"
              : "bg-white/40 border-white/40"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-lg">Idioma</p>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-[#1d1d1b]"
                }`}
              >
                Escolha o idioma do aplicativo
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger
                className={`w-full rounded-xl px-4 py-3 text-sm transition-colors border focus:outline-none backdrop-blur-lg ${
                  isDark
                    ? "bg-white/5 border-white/20 text-white"
                    : "bg-white/50 border-white/40 text-[#1d1d1b]"
                }`}
              >
                <SelectValue placeholder="Selecione um idioma" />
              </SelectTrigger>
              <SelectContent
                className={
                  isDark
                    ? "bg-[#0d0f08] text-white border-white/10"
                    : "bg-white text-[#1d1d1b] border-black/10"
                }
              >
                {languageOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className={isDark ? "text-white" : "text-[#1d1d1b]"}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 sm:px-6 space-y-2">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate(item.id)}
            className={`w-full p-3 sm:p-4 rounded-xl flex items-start gap-4 transition-colors backdrop-blur-lg ${
              isDark
                ? "bg-white/5 hover:bg-white/10"
                : "bg-white/40 hover:bg-white/50"
            }`}
          >
            <item.icon className="w-6 h-6 mt-1 flex-shrink-0" />
            <div className="text-left flex-1">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-[#1d1d1b]"
                }`}
              >
                {item.subtitle}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
