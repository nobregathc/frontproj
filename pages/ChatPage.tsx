import { useEffect, useState, useRef, type MouseEvent, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../config/firebase";
import { sendMessageToGroq } from "../services/groq";
import Header from "../components/Header";
import LeftMenu from "../components/LeftMenu";
import { useTheme } from "../context/ThemeContext";
import { useStatistics } from "../context/StatisticsContext";
import "../css/ChatPage.css";

type Message = {
  id: number;
  text: string;
  from: "user" | "ai";
};

type Chat = {
  id: number;
  title: string;
  messages: Message[];
};

let nextMessageId = 1;

function ChatPage() {
  const navigate = useNavigate();
  const { dark } = useTheme();
  const { incrementAIUsage, addChatCount, addLoadingTime } = useStatistics();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const nextChatId = useRef(1);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChatId, chats]);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId) || null;

  const handleCreateChat = () => {
    const newChat: Chat = {
      id: nextChatId.current++,
      title: `Chat ${chats.length + 1}`,
      messages: [],
    };

    setChats((prev) => [...prev, newChat]);
    setSelectedChatId(newChat.id);
    addChatCount();
  };

  const handleSelectChat = (chatId: number) => {
    setSelectedChatId(chatId);
  };

  const handleDeleteChat = (chatId: number, event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setChats((prev) => {
      const remainingChats = prev.filter((chat) => chat.id !== chatId);
      if (selectedChatId === chatId) {
        setSelectedChatId(remainingChats.length > 0 ? remainingChats[0].id : null);
      }
      return remainingChats;
    });
  };

  const handleSend = async () => {
    if (!prompt.trim() || selectedChatId === null) return;

    const userMessage: Message = { id: nextMessageId++, text: prompt, from: "user" };
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChatId
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      )
    );
    incrementAIUsage();

    setPrompt("");
    setLoading(true);

    const startTime = Date.now();
    try {
      const reply = await sendMessageToGroq(prompt);
      const endTime = Date.now();
      const duration = endTime - startTime;
      addLoadingTime(duration);

      const aiMessage: Message = { id: nextMessageId++, text: reply, from: "ai" };
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === selectedChatId
            ? { ...chat, messages: [...chat.messages, aiMessage] }
            : chat
        )
      );
      incrementAIUsage();
    } catch (err) {
      const errorMessage: Message = {
        id: nextMessageId++,
        text: "Erro ao obter resposta da IA.",
        from: "ai",
      };
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === selectedChatId
            ? { ...chat, messages: [...chat.messages, errorMessage] }
            : chat
        )
      );
      incrementAIUsage();
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };
 
  return (
    <div className={`chat-page ${dark ? "dark" : ""}`}>
      <Header />

      <div className="chat-page-layout">
        <LeftMenu
          chats={chats}
          selectedChatId={selectedChatId}
          onCreateChat={handleCreateChat}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
        />

        <div className={`chat-container ${dark ? "dark" : ""}`}>
          {selectedChat ? (
            <>
              <div className="chat-messages">
                {selectedChat.messages.map((msg) => (
                  <div key={msg.id} className={`message-wrapper ${msg.from}`}>
                    <p className={`message-bubble ${msg.from}`}>{msg.text}</p>
                  </div>
                ))}

                {loading && <p>A responder...</p>}
                <div ref={bottomRef} />
              </div>

              <div className="chat-input-area">
                <input
                  type="text"
                  placeholder="Escreve o teu prompt..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />
                <button onClick={handleSend} disabled={loading}>
                  {loading ? "..." : "Enviar"}
                </button>
              </div>
            </>
          ) : (
            <div className="chat-empty-state">
              <button onClick={handleCreateChat}>Criar primeiro chat</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;