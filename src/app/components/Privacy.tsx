import { ArrowLeft, ChevronRight } from "lucide-react";

interface PrivacyProps {
  isDark: boolean;
  onBack: () => void;
}

export default function Privacy({ isDark, onBack }: PrivacyProps) {
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
        <h1 className="text-xl sm:text-2xl font-bold">Privacidade</h1>
      </div>

      <div className="px-4 sm:px-6 space-y-2">
        <button
          className={`w-full p-3 sm:p-4 rounded-xl flex items-center justify-between transition-colors backdrop-blur-lg ${
            isDark ? "bg-white/5 hover:bg-white/10" : "bg-white/40 hover:bg-white/50"
          }`}
        >
          <div className="text-left">
            <p className="font-semibold">Última visualização</p>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
              Todos
            </p>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          className={`w-full p-3 sm:p-4 rounded-xl flex items-center justify-between transition-colors backdrop-blur-lg ${
            isDark ? "bg-white/5 hover:bg-white/10" : "bg-white/40 hover:bg-white/50"
          }`}
        >
          <div className="text-left">
            <p className="font-semibold">Foto do perfil</p>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
              Todos
            </p>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          className={`w-full p-3 sm:p-4 rounded-xl flex items-center justify-between transition-colors backdrop-blur-lg ${
            isDark ? "bg-white/5 hover:bg-white/10" : "bg-white/40 hover:bg-white/50"
          }`}
        >
          <div className="text-left">
            <p className="font-semibold">Recado</p>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
              Todos
            </p>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          className={`w-full p-3 sm:p-4 rounded-xl flex items-center justify-between transition-colors backdrop-blur-lg ${
            isDark ? "bg-white/5 hover:bg-white/10" : "bg-white/40 hover:bg-white/50"
          }`}
        >
          <div className="text-left">
            <p className="font-semibold">Contatos bloqueados</p>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
              Gerenciar contatos bloqueados
            </p>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          className={`w-full p-3 sm:p-4 rounded-xl flex items-center justify-between transition-colors backdrop-blur-lg ${
            isDark ? "bg-white/5 hover:bg-white/10" : "bg-white/40 hover:bg-white/50"
          }`}
        >
          <div className="text-left">
            <p className="font-semibold">Mensagens temporárias</p>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
              Configurar tempo de expiração
            </p>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          className={`w-full p-3 sm:p-4 rounded-xl flex items-center justify-between transition-colors backdrop-blur-lg ${
            isDark ? "bg-white/5 hover:bg-white/10" : "bg-white/40 hover:bg-white/50"
          }`}
        >
          <div className="text-left">
            <p className="font-semibold">Confirmação de leitura</p>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
              Enviar e receber confirmações
            </p>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
