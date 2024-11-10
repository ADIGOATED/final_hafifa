import MessagePreviewMui from "src/components/messagePreviewMui/MessagePreviewMui";
import { messages } from "src/users_messages";


////// fetch all messages written by others to me




export default function Inbox() {
  return (
    <>
      {messages.map((message) => (
        <MessagePreviewMui key={message.id} message={message} />
      ))}
    </>
  );
}
