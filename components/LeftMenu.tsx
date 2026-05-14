import type { MouseEvent } from "react";

type Chat = {
  id: number;
  title: string;
};

type LeftMenuProps = {
  chats: Chat[];
  selectedChatId: number | null;
  onCreateChat: () => void;
  onSelectChat: (chatId: number) => void;
  onDeleteChat: (chatId: number, event: MouseEvent<HTMLButtonElement>) => void;
};

function LeftMenu({ chats, selectedChatId, onCreateChat, onSelectChat, onDeleteChat }: LeftMenuProps) {
  return (
    <aside className="left-menu">
      <div className="menu-header">
        <h2>Chats</h2>
        <button className="create-chat-button" onClick={onCreateChat}>
          + Novo
        </button>
      </div>

      {chats.length === 0 ? (
        <p className="empty-list"></p>
      ) : (
        <div className="chat-list">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${selectedChatId === chat.id ? "active" : ""}`}
              onClick={() => onSelectChat(chat.id)}
            >
              <span>{chat.title}</span>
              <button
                type="button"
                className="delete-chat-button"
                onClick={(event) => onDeleteChat(chat.id, event)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}

export default LeftMenu;
