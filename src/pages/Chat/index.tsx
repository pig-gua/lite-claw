import { useParams } from "react-router";

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      Chat
      {id && <p>Agent ID: {id}</p>}
    </div>
  );
};

export default ChatPage;
