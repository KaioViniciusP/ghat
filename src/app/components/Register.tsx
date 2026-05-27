import { motion } from "motion/react";
import { Sun, Moon, ArrowLeft } from "lucide-react";
import { useState } from "react";
import ghatMascoteLight from "../../../arquivos/ghat_mascote mod cla.png";
import ghatMascoteDark from "../../../arquivos/ghat_mascote mod esc.png";
import ghatGchatLight from "../../../arquivos/ghat_gchat mod cla.png";
import ghatGchatDark from "../../../arquivos/ghat_gchat mod esc.png";

interface RegisterProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  onBack: () => void;
  onLogin: () => void;
}

export default function Register({ isDark, setIsDark, name, setName, email, setEmail, onBack, onLogin }: RegisterProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    console.log("Registro:", { name, email, password });
    onLogin();
  };

  return (
    <div
      style={{ backgroundColor: isDark ? "#080a00" : "#e9e9e7" }}
      className={`min-h-svh w-full flex flex-col items-center justify-center transition-colors duration-500 ${
        isDark ? "text-white" : "text-[#1d1d1b]"
      }`}
    >
      {/* Botão de voltar */}
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

      {/* Botão de tema */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`absolute top-4 right-4 sm:top-8 sm:right-8 p-3 rounded-full transition-colors ${
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

      {/* Conteúdo do registro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md px-6 sm:px-8"
      >
        {/* Logo e título */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <img
            src={isDark ? ghatMascoteDark : ghatMascoteLight}
            alt="Ghat Mascote"
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
          <h1 className="text-3xl sm:text-4xl text-center font-husty flex items-center justify-center gap-2">
            Registro
            <img
              src={isDark ? ghatGchatLight : ghatGchatDark}
              alt="Ghat"
              className="h-7 sm:h-8 md:h-9 w-auto"
            />
          </h1>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-lg transition-colors backdrop-blur-lg ${
                isDark
                  ? "bg-white/10 border border-white/20 focus:border-white/40 focus:outline-none"
                  : "bg-white/50 border border-white/40 focus:border-white/60 focus:outline-none"
              }`}
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-lg transition-colors backdrop-blur-lg ${
                isDark
                  ? "bg-white/10 border border-white/20 focus:border-white/40 focus:outline-none"
                  : "bg-white/50 border border-white/40 focus:border-white/60 focus:outline-none"
              }`}
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-lg transition-colors backdrop-blur-lg ${
                isDark
                  ? "bg-white/10 border border-white/20 focus:border-white/40 focus:outline-none"
                  : "bg-white/50 border border-white/40 focus:border-white/60 focus:outline-none"
              }`}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-lg transition-colors backdrop-blur-lg ${
                isDark
                  ? "bg-white/10 border border-white/20 focus:border-white/40 focus:outline-none"
                  : "bg-white/50 border border-white/40 focus:border-white/60 focus:outline-none"
              }`}
              placeholder="••••••••"
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
            Criar Conta
          </button>
        </form>

        {/* Link para login */}
        <div className="mt-6 text-center">
          <p className="text-sm">
            Já tem uma conta?{" "}
            <button
              onClick={onLogin}
              className="font-medium underline hover:no-underline"
              style={{ color: isDark ? "#e63946" : "#1d1d1b" }}
            >
              Faça login
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
