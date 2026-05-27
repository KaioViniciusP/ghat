import { motion } from "motion/react";
import { Sun, Moon, ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";

interface ForgotPasswordProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  email: string;
  setEmail: (value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function ForgotPassword({
  isDark,
  setIsDark,
  email,
  setEmail,
  onBack,
  onSubmit,
}: ForgotPasswordProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
    onSubmit();
  };

  return (
    <div
      style={{ backgroundColor: isDark ? "#080a00" : "#e9e9e7" }}
      className={`min-h-svh w-full flex flex-col items-center justify-center transition-colors duration-500 ${
        isDark ? "text-white" : "text-[#1d1d1b]"
      }`}
    >
      <button
        onClick={onBack}
        className={`absolute top-4 left-4 sm:top-8 sm:left-8 p-3 rounded-full transition-colors ${
          isDark
            ? "bg-white/10 hover:bg-white/20"
            : "bg-black/10 hover:bg-black/20"
        }`}
        aria-label="Voltar"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => setIsDark(!isDark)}
        className={`absolute top-4 right-4 sm:top-8 sm:right-8 p-3 rounded-full transition-colors ${
          isDark
            ? "bg-white/10 hover:bg-white/20"
            : "bg-black/10 hover:bg-black/20"
        }`}
        aria-label="Trocar tema"
      >
        {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-6 sm:px-8"
      >
        <div className="flex flex-col items-center gap-4 mb-8 text-center">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              isDark ? "bg-white/10" : "bg-black/10"
            }`}
          >
            <Mail className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">Recuperar senha</h1>
            <p className={`mt-2 text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
              Informe seu email para receber um link de redefinicao.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="reset-email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="reset-email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className={`w-full px-4 py-3 rounded-lg transition-colors backdrop-blur-lg ${
                isDark
                  ? "bg-white/10 border border-white/20 focus:border-white/40 focus:outline-none"
                  : "bg-white/50 border border-white/40 focus:border-white/60 focus:outline-none"
              }`}
              placeholder="seu@email.com"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-full text-lg font-medium transition-all ${
              isDark
                ? "bg-white text-black hover:bg-white/90"
                : "bg-black text-white hover:bg-black/90"
            }`}
          >
            Enviar link
          </button>
        </form>

        {isSubmitted && (
          <div
            className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
              isDark
                ? "border-white/10 bg-white/5 text-gray-300"
                : "border-black/10 bg-black/5 text-[#1d1d1b]"
            }`}
          >
            Se o email existir, voce recebera um link de recuperacao em alguns minutos.
          </div>
        )}
      </motion.div>
    </div>
  );
}
