import MessagePreviewMui from "src/components/messagePreviewMui/MessagePreviewMui";
import { messages } from "src/users_messages";


////// fetch all messages written by me


export default function Outbox() {
  return (
    <>
      {messages.slice(7,).map((message) => (
        <MessagePreviewMui key={message.id} message={message} />
      ))}
    </>
  );
}
