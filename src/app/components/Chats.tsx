import { Search, MoreVertical, Paperclip, Smile, Mic, Sun, Moon, Settings, MessageSquare, MessagesSquare, Sparkles, X, Plus, Copy, Check, Link2 } from "lucide-react";
import { useEffect, useState } from "react";
import catLogo from "../../imports/Ghat_Logo-semfundo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";

interface ChatsProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  onSettings: () => void;
  onNavigate: (screen: string) => void;
}

const chatItems: {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread: number;
}[] = [];

const chatMessages: Record<
  string,
  { id: string; from: "me" | "them"; text: string; time: string }[]
> = {};

type MessageRow = {
  id: string;
  chat_id: string;
  from: "me" | "them";
  text: string;
  created_at: string;
};

type ChatMessage = { id: string; from: "me" | "them"; text: string; time: string };

const formatTime = (date: Date) =>
  date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

const mapMessageRow = (row: MessageRow): ChatMessage => ({
  id: row.id,
  from: row.from,
  text: row.text,
  time: formatTime(new Date(row.created_at)),
});

export default function Chats({ isDark, setIsDark, onSettings, onNavigate }: ChatsProps) {
  const [activeChatId, setActiveChatId] = useState("amor");
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [activeListTab, setActiveListTab] = useState<"conversas" | "grupos">("conversas");
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>(
    chatMessages[activeChatId] ?? [],
  );
  const [remoteMessages, setRemoteMessages] = useState<ChatMessage[]>([]);
  const [messageText, setMessageText] = useState("");
  const visibleChatItems = chatItems;
  const activeChat = visibleChatItems.find((item) => item.id === activeChatId) ?? null;
  const activeMessages = isSupabaseConfigured
    ? remoteMessages
    : localMessages;
  const useNewSidebar = true;
  const accentColor = "#DC143C";
  const sidebarItems = [
    { id: "chats", label: "Chat", icon: MessageSquare },
    { id: "forum", label: "Forum", icon: MessagesSquare },
    { id: "status", label: "Status", icon: Sparkles },
  ];
  const chatMenuItems = [
    { id: "profile", label: "Mostrar perfil" },
    { id: "search", label: "Pesquisar mensagem" },
    { id: "archive", label: "Arquivar" },
    { id: "mute", label: "Silenciar notificacao" },
    { id: "block", label: "Bloquear", variant: "destructive" as const },
    { id: "clear", label: "Limpar conversa", variant: "destructive" as const },
  ];
  const handleSidebarClick = (id: string) => {
    if (id === "status") {
      onNavigate("status");
    }
  };

  const handleSendMessage = async () => {
    const trimmed = messageText.trim();
    if (!trimmed || !activeChat) {
      return;
    }
    setMessageText("");
    if (!isSupabaseConfigured || !supabase) {
      const nextMessage: ChatMessage = {
        id: `${Date.now()}`,
        from: "me",
        text: trimmed,
        time: formatTime(new Date()),
      };
      setLocalMessages((prev) => [...prev, nextMessage]);
      return;
    }

    await supabase.from("messages").insert({
      chat_id: activeChat.id,
      from: "me",
      text: trimmed,
    });
  };

  const generateInviteLink = () => {
    const token = Math.random().toString(36).slice(2, 8);
    return `https://ghat.app/invite/${token}`;
  };

  const handleGroupDialogChange = (open: boolean) => {
    setIsGroupDialogOpen(open);
    if (open) {
      setGroupName("");
      setGroupDescription("");
      setInviteLink(generateInviteLink());
      setLinkCopied(false);
    } else {
      setGroupName("");
      setGroupDescription("");
      setInviteLink("");
      setLinkCopied(false);
    }
  };

  const handleCopyInvite = () => {
    if (!inviteLink) {
      return;
    }
    navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLocalMessages(chatMessages[activeChatId] ?? []);
    }
  }, [activeChatId]);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase || !activeChat) {
      return;
    }

    let isActive = true;
    supabase
      .from("messages")
      .select("id, chat_id, from, text, created_at")
      .eq("chat_id", activeChat.id)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (!isActive) {
          return;
        }
        setRemoteMessages((data ?? []).map(mapMessageRow));
      });

    const channel = supabase
      .channel(`messages-${activeChat.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_id=eq.${activeChat.id}`,
        },
        (payload) => {
          const row = payload.new as MessageRow;
          setRemoteMessages((prev) => [...prev, mapMessageRow(row)]);
        },
      )
      .subscribe();

    return () => {
      isActive = false;
      supabase.removeChannel(channel);
    };
  }, [activeChat?.id]);

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
            {useNewSidebar && (
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
                        item.id === "chats"
                          ? "text-white"
                          : isDark
                            ? "bg-white/10 hover:bg-white/20"
                            : "bg-black/10 hover:bg-black/20"
                      }`}
                      style={item.id === "chats" ? { backgroundColor: accentColor } : undefined}
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
            )}

            <aside
              className={`relative w-full md:w-[360px] lg:w-[420px] border-b md:border-b-0 md:border-r backdrop-blur-xl ${
                isDark ? "border-white/15 bg-white/5" : "border-white/40 bg-white/30"
              }`}
            >
              <div className="p-5 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-semibold text-lg">Ghat</p>
                    <p
                      className={`text-xs ${
                        isDark ? "text-gray-400" : "text-[#1d1d1b]"
                      }`}
                    >
                      Conversas
                    </p>
                  </div>
                </div>
                {!useNewSidebar && (
                  <div className="flex items-center gap-2">
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
                    <button
                      onClick={onSettings}
                      className={`p-2 rounded-full transition-colors ${
                        isDark
                          ? "bg-white/10 hover:bg-white/20"
                          : "bg-black/10 hover:bg-black/20"
                      }`}
                      aria-label="Configuracoes"
                    >
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="px-5 pb-4">
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                  <input
                    type="text"
                    placeholder="Pesquisar conversas"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-full transition-colors border ${
                      isDark
                        ? "bg-transparent border-white/20 text-white placeholder-gray-400"
                        : "bg-transparent border-black/20 text-[#1d1d1b] placeholder-[#1d1d1b]"
                    }`}
                  />
                </div>
              </div>

              <div className="px-5 pb-3">
                <div
                  className={`grid grid-cols-2 rounded-full p-1 border backdrop-blur-lg ${
                    isDark ? "border-white/15 bg-white/5" : "border-white/40 bg-white/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveListTab("conversas")}
                    className={`px-4 py-2 text-sm rounded-full transition-colors ${
                      activeListTab === "conversas"
                        ? "text-white"
                        : isDark
                          ? "text-gray-300"
                          : "text-[#1d1d1b]"
                    }`}
                    style={activeListTab === "conversas" ? { backgroundColor: accentColor } : undefined}
                  >
                    Conversas
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveListTab("grupos")}
                    className={`px-4 py-2 text-sm rounded-full transition-colors ${
                      activeListTab === "grupos"
                        ? "text-white"
                        : isDark
                          ? "text-gray-300"
                          : "text-[#1d1d1b]"
                    }`}
                    style={activeListTab === "grupos" ? { backgroundColor: accentColor } : undefined}
                  >
                    Grupos
                  </button>
                </div>
              </div>

              <div
                className={`px-3 pb-4 space-y-2 overflow-auto ${
                  activeListTab === "grupos" ? "pb-20" : ""
                }`}
              >
                {activeListTab === "conversas" ? (
                  visibleChatItems.length > 0 ? (
                    visibleChatItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveChatId(item.id);
                          setIsChatOpen(true);
                        }}
                        className={`w-full px-4 py-3 rounded-2xl flex items-center gap-3 transition-colors ${
                          activeChatId === item.id
                            ? isDark
                              ? "bg-white/15"
                              : "bg-black/15"
                            : isDark
                              ? "bg-white/5 hover:bg-white/10"
                              : "bg-black/5 hover:bg-black/10"
                        }`}
                      >
                        <div
                          className={`size-11 rounded-full flex items-center justify-center text-lg ${
                            isDark ? "bg-white/10" : "bg-black/10"
                          }`}
                        >
                          {item.name.slice(0, 1).toUpperCase()}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold">{item.name}</p>
                            <span
                              className={`text-xs ${
                                isDark ? "text-gray-400" : "text-[#1d1d1b]"
                              }`}
                            >
                              {item.time}
                            </span>
                          </div>
                          <p
                            className={`text-sm truncate ${
                              isDark ? "text-gray-400" : "text-[#1d1d1b]"
                            }`}
                          >
                            {item.preview.split(" ")[0]}
                          </p>
                        </div>
                        <div
                          className="min-w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                          style={{ backgroundColor: accentColor }}
                        >
                          {item.unread}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div
                      className={`px-4 py-6 rounded-2xl text-sm text-center backdrop-blur-lg ${
                        isDark ? "text-gray-300 bg-white/5" : "text-[#1d1d1b] bg-white/40"
                      }`}
                    >
                      Nenhuma conversa por enquanto.
                    </div>
                  )
                ) : (
                    <div
                      className={`px-4 py-6 rounded-2xl text-sm text-center backdrop-blur-lg ${
                        isDark ? "text-gray-300 bg-white/5" : "text-[#1d1d1b] bg-white/40"
                      }`}
                    >
                    Nenhum grupo por enquanto.
                  </div>
                )}
              </div>

              {activeListTab === "grupos" && (
                <Dialog open={isGroupDialogOpen} onOpenChange={handleGroupDialogChange}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="absolute bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg text-white transition-colors"
                      style={{ backgroundColor: accentColor }}
                      aria-label="Criar grupo"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </DialogTrigger>
                  <DialogContent
                    className={
                      isDark
                        ? "bg-[#0d0f08] text-white border-white/10"
                        : "bg-white text-[#1d1d1b] border-black/10"
                    }
                  >
                    <DialogHeader>
                      <DialogTitle>Criar grupo</DialogTitle>
                      <DialogDescription>
                        Preencha os dados para iniciar um novo grupo.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Nome do grupo</label>
                        <input
                          type="text"
                          value={groupName}
                          onChange={(event) => setGroupName(event.target.value)}
                          placeholder="Ex: Equipe Ghat"
                          className={`w-full rounded-lg px-3 py-2 text-sm border outline-none ${
                            isDark
                              ? "bg-transparent border-white/20 text-white placeholder-gray-500"
                              : "bg-transparent border-black/20 text-[#1d1d1b] placeholder-[#1d1d1b]/60"
                          }`}
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Descricao</label>
                        <textarea
                          value={groupDescription}
                          onChange={(event) => setGroupDescription(event.target.value)}
                          placeholder="Descreva o objetivo do grupo"
                          rows={3}
                          className={`w-full rounded-lg px-3 py-2 text-sm border outline-none resize-none ${
                            isDark
                              ? "bg-transparent border-white/20 text-white placeholder-gray-500"
                              : "bg-transparent border-black/20 text-[#1d1d1b] placeholder-[#1d1d1b]/60"
                          }`}
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Adicionar pessoas</label>
                        <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${
                          isDark ? "border-white/20" : "border-black/20"
                        }`}>
                          <Link2 className="w-4 h-4" />
                          <input
                            type="text"
                            value={inviteLink}
                            readOnly
                            className={`flex-1 bg-transparent text-sm outline-none ${
                              isDark ? "text-white" : "text-[#1d1d1b]"
                            }`}
                          />
                          <button
                            type="button"
                            onClick={handleCopyInvite}
                            className={`p-1.5 rounded-md transition-colors ${
                              isDark ? "hover:bg-white/10" : "hover:bg-black/10"
                            }`}
                            aria-label="Copiar link"
                          >
                            {linkCopied ? (
                              <Check className="w-4 h-4" style={{ color: accentColor }} />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <p className={`text-xs ${isDark ? "text-gray-400" : "text-[#1d1d1b]"}`}>
                          Compartilhe este link para pessoas entrarem no grupo.
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <button
                        type="button"
                        onClick={() => setIsGroupDialogOpen(false)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                          isDark
                            ? "border-white/20 hover:bg-white/10"
                            : "border-black/20 hover:bg-black/10"
                        }`}
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsGroupDialogOpen(false)}
                        className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                        style={{ backgroundColor: accentColor }}
                      >
                        Criar grupo
                      </button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </aside>

            <section className="flex flex-1 flex-col">
              {isChatOpen ? (
                <>
                  <div
                    className={`flex items-center justify-between p-5 border-b backdrop-blur-xl ${
                      isDark ? "border-white/15 bg-white/5" : "border-white/40 bg-white/30"
                    }`}
                  >
                    {activeChat ? (
                      <div className="flex items-center gap-3">
                        <div
                          className={`size-10 rounded-full flex items-center justify-center text-lg ${
                            isDark ? "bg-white/10" : "bg-black/10"
                          }`}
                        >
                          {activeChat.name.slice(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold">{activeChat.name}</p>
                          <p
                            className={`text-xs ${
                              isDark ? "text-gray-400" : "text-[#1d1d1b]"
                            }`}
                          >
                            Online agora
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="font-semibold">Nenhuma conversa selecionada</p>
                        <p
                          className={`text-xs ${
                            isDark ? "text-gray-400" : "text-[#1d1d1b]"
                          }`}
                        >
                          Inicie uma nova conversa para comecar
                        </p>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsChatOpen(false)}
                        className={`p-2 rounded-full transition-colors ${
                          isDark
                            ? "bg-white/10 hover:bg-white/20"
                            : "bg-black/10 hover:bg-black/20"
                        }`}
                        aria-label="Fechar conversa"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className={`p-2 rounded-full transition-colors ${
                              isDark
                                ? "bg-white/10 hover:bg-white/20"
                                : "bg-black/10 hover:bg-black/20"
                            }`}
                            aria-label="Mais opcoes"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[220px]">
                          {chatMenuItems.slice(0, 2).map((item) => (
                            <DropdownMenuItem key={item.id}>{item.label}</DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator />
                          {chatMenuItems.slice(2, 4).map((item) => (
                            <DropdownMenuItem key={item.id}>{item.label}</DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator />
                          {chatMenuItems.slice(4).map((item) => (
                            <DropdownMenuItem key={item.id} variant="destructive">
                              {item.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto p-6 space-y-4">
                    {activeChat ? (
                      activeMessages.length === 0 ? (
                        <div
                          className={`h-full flex items-center justify-center text-sm ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Sem mensagens por aqui ainda.
                        </div>
                      ) : (
                        activeMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.from === "me" ? "justify-end" : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[72%] rounded-2xl px-4 py-3 text-sm ${
                                message.from === "me"
                                  ? isDark
                                    ? "bg-white text-black"
                                    : "bg-black text-white"
                                  : isDark
                                    ? "bg-white/10 text-white"
                                    : "bg-black/10 text-[#1d1d1b]"
                              }`}
                            >
                              <p>{message.text}</p>
                              <span
                                className={`mt-1 block text-[11px] ${
                                  message.from === "me"
                                    ? isDark
                                      ? "text-black/60"
                                      : "text-white/70"
                                    : isDark
                                      ? "text-gray-400"
                                      : "text-[#1d1d1b]"
                                }`}
                              >
                                {message.time}
                              </span>
                            </div>
                          </div>
                        ))
                      )
                    ) : (
                      <div
                        className={`h-full flex items-center justify-center text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Selecione uma conversa para ver as mensagens.
                      </div>
                    )}
                  </div>

                  <div
                    className={`p-4 border-t ${
                      isDark ? "border-white/15" : "border-white/40"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-3 rounded-full px-4 py-3 backdrop-blur-lg ${
                        isDark ? "bg-white/5" : "bg-white/50"
                      }`}
                    >
                      <Smile className="w-5 h-5" />
                      <input
                        type="text"
                        placeholder={activeChat ? "Digite uma mensagem" : "Selecione uma conversa"}
                        value={messageText}
                        onChange={(event) => setMessageText(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        disabled={!activeChat}
                        className={`flex-1 bg-transparent text-sm outline-none ${
                          isDark
                            ? "text-white placeholder-gray-400"
                            : "text-[#1d1d1b] placeholder-[#1d1d1b]"
                        }`}
                      />
                      <Paperclip className="w-5 h-5" />
                      <Mic className="w-5 h-5" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1" />
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
