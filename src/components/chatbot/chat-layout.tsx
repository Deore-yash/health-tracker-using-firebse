'use client';

import { useState, useRef, FormEvent, useEffect } from 'react';
import { Paperclip, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { personalizedTourAdvice } from '@/ai/flows/personalized-health-advice';
import { ChatMessage } from './chat-message';
import { tourist as mockUser } from '@/lib/data';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  user: { name: string; avatar: string };
  isLoading?: boolean;
}

export function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI tour assistant. How can I help you plan your day?",
      isUser: false,
      user: { name: 'TourBot', avatar: '/bot-avatar.png' },
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is a bit of a hack to scroll to bottom in a ScrollArea component
    setTimeout(() => {
      const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }, 100);
  }, [messages]);
  

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isUser: true,
      user: { name: mockUser.name, avatar: mockUser.avatar },
    };

    const loadingMessage: Message = {
      id: Date.now() + 1,
      text: '...',
      isUser: false,
      user: { name: 'TourBot', avatar: '/bot-avatar.png' },
      isLoading: true,
    }

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // NOTE: In a real app, you would pass actual tourist data.
      const tourDataStr = JSON.stringify({ location: 'Rome', interests: ['history', 'food'] });
      const preferences = JSON.stringify({ communicationStyle: 'friendly' });

      const response = await personalizedTourAdvice({
        query: input,
        tourData: tourDataStr,
        preferences,
      });

      const botMessage: Message = {
        id: Date.now() + 2,
        text: response.advice,
        isUser: false,
        user: { name: 'TourBot', avatar: '/bot-avatar.png' },
      };

      setMessages((prev) => [...prev.slice(0, -1), botMessage]);
    } catch (error) {
      console.error('Error getting AI advice:', error);
      const errorMessage: Message = {
        id: Date.now() + 2,
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        user: { name: 'TourBot', avatar: '/bot-avatar.png' },
      };
      setMessages((prev) => [...prev.slice(0, -1), errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full rounded-lg border bg-card">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-background">
        <form
          onSubmit={handleSend}
          className="relative"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for recommendations, directions, etc."
            className="pr-24"
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
             <Button type="button" size="icon" variant="ghost">
                <Paperclip className="size-5 text-muted-foreground" />
             </Button>
            <Button type="submit" size="icon" variant="ghost" disabled={isLoading || !input.trim()}>
                <Send className="size-5 text-muted-foreground" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
