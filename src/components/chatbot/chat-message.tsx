import Image from 'next/image';
import type { User } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Icons } from '../icons';
import { motion } from 'framer-motion';

interface Message {
    id: number;
    text: string;
    isUser: boolean;
    user: { name: string; avatar: string };
    isLoading?: boolean;
    photoDataUri?: string;
}

export function ChatMessage({ message, user }: { message: Message, user: User | null }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={cn(
                'flex items-start gap-3',
                message.isUser && 'justify-end'
            )}
        >
            {!message.isUser && (
                <Avatar className="h-9 w-9 border">
                    {/* Using an icon for the bot avatar for simplicity */}
                    <AvatarFallback><Icons.logo className="h-5 w-5 text-primary" /></AvatarFallback>
                </Avatar>
            )}
            <div
                className={cn(
                    'max-w-md rounded-lg p-3 text-sm',
                    message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                )}
            >
                {message.isLoading ? (
                    <div className="flex items-center gap-2">
                       <Skeleton className="h-3 w-3 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
                       <Skeleton className="h-3 w-3 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                       <Skeleton className="h-3 w-3 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                ) : (
                    <div className="grid gap-2">
                        {message.photoDataUri && message.isUser && (
                            <div className="relative aspect-video rounded-md overflow-hidden">
                                <Image src={message.photoDataUri} alt="User upload" fill className="object-cover" />
                            </div>
                        )}
                        {message.text && <p className="whitespace-pre-wrap">{message.text}</p>}
                    </div>
                )}
            </div>
            {message.isUser && user && (
                <Avatar className="h-9 w-9 border">
                    <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? ''} />
                    <AvatarFallback>
                        {user.displayName
                        ? user.displayName.split(' ').map((n) => n[0]).join('')
                        : user.email?.[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            )}
        </motion.div>
    );
}
