import { ArrowLeft, ChevronRight } from "lucide-react";

interface GeneralProps {
  isDark: boolean;
  onBack: () => void;
}

export default function General({ isDark, onBack }: GeneralProps) {
  return (
    <div
      style={{ backgroundColor: isDark ? "#080a00" : "#e9e9e7" }}
      className={`min-h-svh w-full transition-colors duration-500 ${
        isDark ? "text-white" : "text-[#1d1d1b]"
      }`}
    >
      {/* Header */}
      <div className="p-6 flex items-center gap-4">
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
        <h1 className="text-2xl font-bold">Geral</h1>
      </div>

      <div className="px-6 space-y-2">
        <button
          className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors ${
            isDark ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
          }`}
        >
          <div className="text-left">
            <p className="font-semibold">Iniciar automaticamente</p>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
              Abrir Ghat ao iniciar o computador
            </p>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors ${
            isDark ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
          }`}
        >
          <div className="text-left">
            <p className="font-semibold">Minimizar na bandeja</p>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
              Manter o app em execução em segundo plano
            </p>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors ${
            isDark ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
          }`}
        >
          <div className="text-left">
            <p className="font-semibold">Notificações</p>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
              Gerenciar alertas e sons
            </p>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          className={`w-full p-4 rounded-xl flex items-center justify-between transition-colors ${
            isDark ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"
          }`}
        >
          <div className="text-left">
            <p className="font-semibold">Idioma</p>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
              Português (Brasil)
            </p>
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
