import { NextResponse } from "next/server";

// In-memory storage for messages (for testing/demo purposes)
const messages: { id: number; chatId: string; text: string }[] = [];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get("chatId") || "";

  // Filter messages by chatId
  const chatMessages = messages.filter((m) => m.chatId === chatId);

  return NextResponse.json(chatMessages, {
    headers: {
      "Cache-Control": "no-store" // avoid 304 responses
    }
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const newMessage = {
    id: messages.length + 1,
    chatId: body.chatId,
    text: body.text,
  };

  messages.push(newMessage);

  return NextResponse.json(newMessage);
}
