import { ChatLayout } from '@/components/chatbot/chat-layout';

export default function ChatbotPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4">
        <h1 className="text-3xl font-headline font-bold">AI Assistant</h1>
        <p className="text-muted-foreground">
          Ask me anything about your health, diet, or for wellness advice.
        </p>
      </div>
      <ChatLayout />
    </div>
  );
}
