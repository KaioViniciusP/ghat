import { Camera, Plus, Sun, Moon, Settings, MessageSquare, MessagesSquare, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import catLogo from "../../imports/Ghat_Logo-semfundo.png";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

interface StatusProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  onSettings: () => void;
  onNavigate: (screen: string) => void;
}

type StatusItem = {
  id: string;
  name: string;
  time: string;
  seen: boolean;
  imageUrl: string;
};

export default function Status({ isDark, setIsDark, onSettings, onNavigate }: StatusProps) {
  const [activeStatusId, setActiveStatusId] = useState<string | null>(null);
  const [statusItems, setStatusItems] = useState<StatusItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const activeStatus = statusItems.find((item) => item.id === activeStatusId) ?? null;
  const accentColor = "#DC143C";
  const mutedRing = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.15)";
  const mutedBorder = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)";
  const sidebarItems = [
    { id: "chats", label: "Chat", icon: MessageSquare },
    { id: "forum", label: "Forum", icon: MessagesSquare },
    { id: "status", label: "Status", icon: Sparkles },
  ];

  const handleSidebarClick = (id: string) => {
    if (id === "chats") {
      onNavigate("chats");
    }
  };

  const handlePickStatus = () => {
    setUploadError(null);
    fileInputRef.current?.click();
  };

  const formatStatusTime = (date: Date) =>
    date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  const handleUploadStatus = async (file: File) => {
    if (!isSupabaseConfigured || !supabase) {
      setUploadError("Configure o Supabase para enviar imagens.");
      return;
    }
    setIsUploading(true);
    setUploadError(null);
    const safeName = file.name.replace(/\s+/g, "-");
    const filePath = `status/${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;

    const { error } = await supabase.storage
      .from("status-media")
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (error) {
      setUploadError("Nao foi possivel enviar a imagem.");
      setIsUploading(false);
      return;
    }

    const { data } = supabase.storage.from("status-media").getPublicUrl(filePath);
    const nextItem: StatusItem = {
      id: `${Date.now()}`,
      name: "Meu status",
      time: formatStatusTime(new Date()),
      seen: false,
      imageUrl: data.publicUrl,
    };
    setStatusItems((prev) => [nextItem, ...prev]);
    setActiveStatusId(nextItem.id);
    setIsUploading(false);
  };

  const handleNextStatus = () => {
    if (statusItems.length === 0) {
      return;
    }
    const currentIndex = statusItems.findIndex((item) => item.id === activeStatusId);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % statusItems.length;
    setActiveStatusId(statusItems[nextIndex].id);
  };

  return (
    <div
      style={{ backgroundColor: isDark ? "#080a00" : "#e9e9e7" }}
      className={`h-svh w-full flex flex-col transition-colors duration-500 ${
        isDark ? "text-white" : "text-[#1d1d1b]"
      }`}
    >
      <div className="p-6 flex-1">
        <div
          className={`h-full w-full rounded-3xl border overflow-hidden backdrop-blur-xl ${
            isDark ? "border-white/15 bg-white/5" : "border-white/40 bg-white/40"
          }`}
        >
          <div className="flex h-full flex-col md:flex-row">
            <aside
              className={`hidden md:flex w-16 lg:w-20 flex-col items-center py-5 border-b md:border-b-0 md:border-r ${
                isDark ? "border-white/10" : "border-black/10"
              }`}
            >
              <div
                className={`flex size-11 items-center justify-center rounded-2xl ${
                  isDark ? "bg-white/10" : "bg-black/10"
                }`}
              >
                <img
                  src={catLogo}
                  alt="Ghat"
                  className="size-9 object-contain"
                />
              </div>
              <div className="mt-6 flex flex-1 flex-col items-center gap-3">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSidebarClick(item.id)}
                    className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center gap-1 text-[10px] transition-colors ${
                      item.id === "status"
                        ? "text-white"
                        : isDark
                          ? "bg-white/10 hover:bg-white/20"
                          : "bg-black/10 hover:bg-black/20"
                    }`}
                    style={item.id === "status" ? { backgroundColor: accentColor } : undefined}
                    aria-label={item.label}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="leading-none">{item.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex flex-col items-center gap-3">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    isDark
                      ? "bg-white/10 hover:bg-white/20"
                      : "bg-black/10 hover:bg-black/20"
                  }`}
                  aria-label="Trocar tema"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                  onClick={onSettings}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    isDark
                      ? "bg-white/10 hover:bg-white/20"
                      : "bg-black/10 hover:bg-black/20"
                  }`}
                  aria-label="Configuracoes"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </aside>

            <aside
              className={`w-full md:w-[360px] lg:w-[420px] border-b md:border-b-0 md:border-r backdrop-blur-xl ${
                isDark ? "border-white/15 bg-white/5" : "border-white/40 bg-white/30"
              }`}
            >
              <div className="p-5 pb-3">
                <p className="font-semibold text-lg">Status</p>
                <p className={`text-xs ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
                  Atualizacoes recentes
                </p>
              </div>

              <div className="px-5 pb-4">
                <button
                  type="button"
                  onClick={handlePickStatus}
                  className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-colors backdrop-blur-lg ${
                    isDark
                      ? "bg-white/5 hover:bg-white/10"
                      : "bg-white/40 hover:bg-white/50"
                  }`}
                >
                  <div className="relative">
                    <div
                      className="size-12 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: accentColor }}
                    >
                      <Camera className="w-5 h-5" />
                    </div>
                    <span
                      className="absolute -bottom-1 -right-1 size-5 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Plus className="w-3 h-3" />
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Meu status</p>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
                      {isUploading ? "Enviando imagem..." : "Toque para adicionar"}
                    </p>
                  </div>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      handleUploadStatus(file);
                    }
                    if (event.target) {
                      event.target.value = "";
                    }
                  }}
                />
                {uploadError && (
                  <p className={`mt-2 text-xs ${isDark ? "text-red-300" : "text-red-600"}`}>
                    {uploadError}
                  </p>
                )}
              </div>

              <div className="px-5 pb-2">
                <p className={`text-xs uppercase tracking-wide ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
                  Atualizacoes recentes
                </p>
              </div>

              <div className="px-3 pb-4 space-y-2 overflow-auto">
                {statusItems.length > 0 ? (
                  statusItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveStatusId(item.id)}
                      className={`w-full px-4 py-3 rounded-2xl flex items-center gap-4 transition-colors ${
                        isDark
                          ? "bg-white/5 hover:bg-white/10"
                          : "bg-black/5 hover:bg-black/10"
                      }`}
                      style={{ border: "1px solid", borderColor: activeStatusId === item.id ? accentColor : mutedBorder }}
                    >
                      <div
                        className="size-12 rounded-full border-2 flex items-center justify-center text-lg"
                        style={{ borderColor: item.seen ? mutedRing : accentColor }}
                      >
                        {item.name.slice(0, 1).toUpperCase()}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold">{item.name}</p>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
                          {item.time}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div
                    className={`px-4 py-6 rounded-2xl text-sm text-center backdrop-blur-lg ${
                      isDark ? "text-gray-300 bg-white/5" : "text-[#1d1d1b] bg-white/40"
                    }`}
                  >
                    Sem atualizacoes por enquanto.
                  </div>
                )}
              </div>
            </aside>

            <section className="flex flex-1 flex-col items-center justify-center p-6 text-center">
              {activeStatus ? (
                <div className="w-full max-w-[640px] h-full flex flex-col gap-6">
                  <div
                    className={`w-full rounded-3xl border px-5 py-4 flex items-center justify-between gap-4 backdrop-blur-xl ${
                      isDark ? "border-white/15 bg-white/5" : "border-white/40 bg-white/40"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="size-12 rounded-full border-2 flex items-center justify-center text-lg"
                        style={{ borderColor: accentColor }}
                      >
                        {activeStatus.name.slice(0, 1).toUpperCase()}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-lg">{activeStatus.name}</p>
                        <p className={`text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
                          {activeStatus.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: accentColor, color: "white" }}
                      >
                        Status ativo
                      </div>
                      <button
                        type="button"
                        onClick={handleNextStatus}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
                          isDark
                            ? "border-white/20 hover:bg-white/10"
                            : "border-black/20 hover:bg-black/10"
                        }`}
                      >
                        Proximo status
                      </button>
                    </div>
                  </div>
                  <div
                    className={`flex-1 w-full rounded-3xl border flex items-center justify-center overflow-hidden backdrop-blur-xl ${
                      isDark ? "border-white/15 bg-white/5" : "border-white/40 bg-white/40"
                    }`}
                  >
                    {activeStatus.imageUrl ? (
                      <img
                        src={activeStatus.imageUrl}
                        alt={`Status de ${activeStatus.name}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div
                          className={`size-20 rounded-3xl mx-auto flex items-center justify-center ${
                            isDark ? "bg-white/10" : "bg-black/10"
                          }`}
                        >
                          <Camera className="w-9 h-9" />
                        </div>
                        <p className="mt-4 text-base font-semibold">Visualizacao do status</p>
                        <p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
                          Conteudo do status aparecera aqui
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className={`size-16 rounded-2xl flex items-center justify-center ${
                      isDark ? "bg-white/10" : "bg-black/10"
                    }`}
                  >
                    <Camera className="w-8 h-8" />
                  </div>
                  <h2 className="mt-6 text-xl font-semibold">Clique em um status para visualizar</h2>
                  <p className={`mt-2 text-sm ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
                    Selecione um contato da lista ao lado
                  </p>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
