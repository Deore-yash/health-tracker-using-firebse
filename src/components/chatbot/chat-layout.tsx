'use client';

import { useState, useRef, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import { Paperclip, Send, X } from 'lucide-react';
import { doc } from 'firebase/firestore';
import {
  useUser,
  useFirestore,
  useDoc,
  useMemoFirebase,
  updateDocumentNonBlocking,
} from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { personalizedHealthAdvice } from '@/ai/flows/personalized-health-advice';
import { ChatMessage } from './chat-message';
import type { UserProfile, AiHealthState } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';
import { AnimatePresence, motion } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  user: { name: string; avatar: string };
  isLoading?: boolean;
  photoDataUri?: string;
}

export function ChatLayout() {
  const { user } = useUser();
  const firestore = useFirestore();

  const profileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid, 'profile', 'data');
  }, [user, firestore]);
  const { data: profile, isLoading: isProfileLoading } = useDoc<UserProfile>(profileRef);

  const aiHealthStateRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid, 'aiHealthState', 'data');
  }, [user, firestore]);
  const { data: aiHealthState, isLoading: isStateLoading } = useDoc<AiHealthState>(aiHealthStateRef);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI health assistant. How can I help you today? You can ask about symptoms, diet, or general wellness.",
      isUser: false,
      user: { name: 'HealthBot', avatar: '/bot-avatar.png' },
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      const viewport = scrollAreaRef.current?.querySelector(
        'div[data-radix-scroll-area-viewport]'
      );
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }, 100);
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !imagePreview) || isLoading || !user || !profile) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isUser: true,
      user: { name: profile.firstName, avatar: user.photoURL || '' },
      photoDataUri: imagePreview || undefined,
    };

    const loadingMessage: Message = {
      id: Date.now() + 1,
      text: '...',
      isUser: false,
      user: { name: 'HealthBot', avatar: '/bot-avatar.png' },
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    const conversationHistory = [...messages, userMessage].map(m => `${m.isUser ? 'User' : 'AI'}: ${m.text}`);

    setInput('');
    setImagePreview(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
    setIsLoading(true);

    try {
      const healthDataStr = JSON.stringify({
        age: profile.dateOfBirth ? new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear() : 'N/A',
        // In a real app, you would fetch and include more specific health conditions.
        conditions: ['High BP'],
      });

      const response = await personalizedHealthAdvice({
        query: input,
        healthData: healthDataStr,
        currentState: aiHealthState?.state,
        history: conversationHistory,
        photoDataUri: imagePreview || undefined,
      });

      const botMessage: Message = {
        id: Date.now() + 2,
        text: response.advice,
        isUser: false,
        user: { name: 'HealthBot', avatar: '/bot-avatar.png' },
      };

      setMessages((prev) => [...prev.slice(0, -1), botMessage]);

      if (aiHealthStateRef) {
        updateDocumentNonBlocking(aiHealthStateRef, {
          state: response.newState,
          lastUpdated: new Date().toISOString(),
        });
      }

    } catch (error) {
      console.error('Error getting AI advice:', error);
      const errorMessage: Message = {
        id: Date.now() + 2,
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        user: { name: 'HealthBot', avatar: '/bot-avatar.png' },
      };
      setMessages((prev) => [...prev.slice(0, -1), errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const chatDisabled = isLoading || isProfileLoading || isStateLoading;

  return (
    <div className="flex flex-col h-full rounded-lg border bg-card text-card-foreground">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <AnimatePresence>
          <motion.div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} user={user} />
            ))}
          </motion.div>
        </AnimatePresence>
      </ScrollArea>
      <form onSubmit={handleSend} className="bg-background rounded-b-lg">
          {imagePreview && (
            <div className="p-4 border-t">
              <div className="relative w-24 h-24">
                <Image
                  src={imagePreview}
                  alt="Upload preview"
                  fill
                  className="rounded-md object-cover"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => {
                    setImagePreview(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>
          )}
          <div className="p-4 border-t relative">
             {chatDisabled && !isLoading && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-b-lg">
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <p>Loading user data...</p>
                 </div>
              </div>
             )}
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={chatDisabled ? "Please wait..." : "Ask about a symptom or upload a photo..."}
              className="pr-24"
              disabled={chatDisabled}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <Button type="button" size="icon" variant="ghost" onClick={() => fileInputRef.current?.click()} disabled={chatDisabled}>
                  <Paperclip className="size-5 text-muted-foreground" />
              </Button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              <Button type="submit" size="icon" variant="ghost" disabled={chatDisabled || (!input.trim() && !imagePreview)}>
                  <Send className="size-5 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </form>
    </div>
  );
}
