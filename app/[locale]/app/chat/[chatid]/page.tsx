import ChatPage from "../chat-ui";

export default async function Chat({
  params,
}: {
  params: Promise<{ chatid: string }>;
}) {
  const id = (await params).chatid;
  return <ChatPage chatId={id}></ChatPage>;
}
