import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Icons } from '../icons';

interface Message {
    id: number;
    text: string;
    isUser: boolean;
    user: { name: string; avatar: string };
    isLoading?: boolean;
    photoDataUri?: string;
}

export function ChatMessage({ message }: { message: Message }) {
    return (
        <div
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
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-32" />
                    </div>
                ) : (
                    <div className="grid gap-2">
                        {message.photoDataUri && message.isUser && (
                            <div className="relative aspect-video rounded-md overflow-hidden">
                                <Image src={message.photoDataUri} alt="User upload" fill className="object-cover" />
                            </div>
                        )}
                        {message.text && <p>{message.text}</p>}
                    </div>
                )}
            </div>
            {message.isUser && (
                <Avatar className="h-9 w-9 border">
                    <AvatarImage src={message.user.avatar} alt={message.user.name} />
                    <AvatarFallback>
                        {message.user.name.split(' ').map((n) => n[0]).join('')}
                    </AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}
