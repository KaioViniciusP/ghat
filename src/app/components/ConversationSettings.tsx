import { motion } from "motion/react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

interface ConversationSettingsProps {
  isDark: boolean;
  onBack: () => void;
}

export default function ConversationSettings({ isDark, onBack }: ConversationSettingsProps) {
  const [spellCheck, setSpellCheck] = useState(true);
  const [emojiSubstitution, setEmojiSubstitution] = useState(true);
  const [sendWithEnter, setSendWithEnter] = useState(true);
  const friends = useMemo(() => {
    const names = ["Andressa", "Joao", "Marina", "Pedro", "Camila"];
    const used = new Set<string>();
    const createId = () => {
      let id = "";
      while (!id || used.has(id)) {
        id = `#${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`;
      }
      used.add(id);
      return id;
    };

    return names.map((name) => ({ name, id: createId() }));
  }, []);

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className="relative w-12 h-7 rounded-full transition-colors"
      style={{ backgroundColor: checked ? "#00ff00" : isDark ? "#333" : "#ccc" }}
    >
      <motion.div
        className="absolute w-5 h-5 bg-white rounded-full top-1"
        animate={{ left: checked ? "26px" : "4px" }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );

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
        <h1 className="text-xl sm:text-2xl font-bold">Conversas</h1>
      </div>

      <div className="px-4 sm:px-6">
        {/* Exibição Section */}
        <div className="mb-8">
          <h2 className={`text-sm font-semibold mb-4 ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
            Exibição
          </h2>

          <button
            className={`w-full p-3 sm:p-4 rounded-xl flex items-center justify-between mb-2 transition-colors backdrop-blur-lg ${
              isDark ? "bg-white/5 hover:bg-white/10" : "bg-white/40 hover:bg-white/50"
            }`}
          >
            <div>
              <p className="font-semibold text-left">Tema</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
                Automático (sistema)
              </p>
            </div>
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            className={`w-full p-3 sm:p-4 rounded-xl flex items-center justify-between transition-colors backdrop-blur-lg ${
              isDark ? "bg-white/5 hover:bg-white/10" : "bg-white/40 hover:bg-white/50"
            }`}
          >
            <p className="font-semibold">Papel de parede</p>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Configurações de conversas Section */}
        <div>
          <h2 className={`text-sm font-semibold mb-4 ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
            Configurações de conversas
          </h2>

          <button
            className={`w-full p-3 sm:p-4 rounded-xl flex items-center justify-between mb-2 transition-colors backdrop-blur-lg ${
              isDark ? "bg-white/5 hover:bg-white/10" : "bg-white/40 hover:bg-white/50"
            }`}
          >
            <p className="font-semibold">Qualidade da mídia</p>
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            className={`w-full p-3 sm:p-4 rounded-xl flex items-center justify-between mb-2 transition-colors backdrop-blur-lg ${
              isDark ? "bg-white/5 hover:bg-white/10" : "bg-white/40 hover:bg-white/50"
            }`}
          >
            <p className="font-semibold">Baixar mídia automaticamente</p>
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            className={`w-full p-3 sm:p-4 rounded-xl flex items-center justify-between mb-2 backdrop-blur-lg ${
              isDark ? "bg-white/5" : "bg-white/40"
            }`}
          >
            <div>
              <p className="font-semibold text-left">Verificação ortográfica</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
                Verificar ortografia ao digitar.
              </p>
            </div>
            <Toggle checked={spellCheck} onChange={() => setSpellCheck(!spellCheck)} />
          </div>

          <div
            className={`w-full p-3 sm:p-4 rounded-xl flex items-center justify-between mb-2 backdrop-blur-lg ${
              isDark ? "bg-white/5" : "bg-white/40"
            }`}
          >
            <div>
              <p className="font-semibold text-left">Substituição de texto por emoji</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
                Substitui textos específicos por emojis ao digitar.
              </p>
            </div>
            <Toggle checked={emojiSubstitution} onChange={() => setEmojiSubstitution(!emojiSubstitution)} />
          </div>

          <div
            className={`w-full p-3 sm:p-4 rounded-xl flex items-center justify-between backdrop-blur-lg ${
              isDark ? "bg-white/5" : "bg-white/40"
            }`}
          >
            <div>
              <p className="font-semibold text-left">Enviar com Enter</p>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
                A tecla Enter envia a mensagem.
              </p>
            </div>
            <Toggle checked={sendWithEnter} onChange={() => setSendWithEnter(!sendWithEnter)} />
          </div>
        </div>

        <div className="mt-10">
          <h2 className={`text-sm font-semibold mb-4 ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
            Amigos
          </h2>
          <div className="space-y-2">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className={`w-full p-3 sm:p-4 rounded-xl flex items-center justify-between backdrop-blur-lg ${
                  isDark ? "bg-white/5" : "bg-white/40"
                }`}
              >
                <div className="text-left">
                  <p className="font-semibold">{friend.name}</p>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
                    Id="{friend.id}"
                  </p>
                </div>
                <button
                  type="button"
                  className={`text-sm font-semibold px-3 py-1 rounded-full border transition-colors ${
                    isDark
                      ? "border-white/20 hover:bg-white/10"
                      : "border-black/20 hover:bg-black/10"
                  }`}
                >
                  Adicionar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
