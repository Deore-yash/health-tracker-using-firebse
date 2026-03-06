'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  useUser,
  useFirestore,
  useCollection,
  useMemoFirebase,
  addDocumentNonBlocking,
} from '@/firebase';
import { collection } from 'firebase/firestore';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { cn } from '@/lib/utils';
import type { Itinerary } from '@/lib/types';
import { CheckCircle2, Circle, Plus, Radio } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const itinerarySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  time: z.string().min(1, 'Time is required'),
  description: z.string().optional(),
  location: z.string().optional(),
});

type ItineraryFormValues = z.infer<typeof itinerarySchema>;

export default function ItineraryPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const itineraryRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'itinerary');
  }, [user, firestore]);
  
  const { data: itinerary, isLoading } = useCollection<Itinerary>(itineraryRef);

  const form = useForm<ItineraryFormValues>({
    resolver: zodResolver(itinerarySchema),
    defaultValues: { title: '', time: '', description: '', location: ''},
  });

  const onSubmit = (values: ItineraryFormValues) => {
    if (!itineraryRef || !user) return;
    addDocumentNonBlocking(itineraryRef, { 
      ...values, 
      userId: user.uid,
      status: 'upcoming'
    });
    form.reset();
    setIsDialogOpen(false);
  };

  const getStatusIcon = (status: 'completed' | 'upcoming' | 'ongoing') => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-primary" />;
      case 'ongoing':
        return <Radio className="h-5 w-5 text-accent animate-pulse" />;
      case 'upcoming':
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.4 } },
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Today's Schedule</h1>
        <p className="text-muted-foreground">
          A schedule of your health activities for the day.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Timeline</CardTitle>
            <CardDescription>Your scheduled events.</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Schedule Item</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="time" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl><Input type="time" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl><Input {...field} placeholder="e.g., Morning Walk" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl><Input {...field} placeholder="A short description of the event" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl><Input {...field} placeholder="e.g., Godavari Park" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" disabled={form.formState.isSubmitting}>Add to Schedule</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {isLoading ? (
             <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
             </div>
          ) : (
          <motion.div
            className="relative pl-6 after:absolute after:inset-y-0 after:w-px after:bg-border after:left-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {itinerary && itinerary.length > 0 ? (
              itinerary.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="grid gap-2 mb-8 pl-8 relative transition-all hover:bg-muted/50 -ml-8 p-2 rounded-md"
              >
                <div className="flex items-center gap-4">
                  <div className="absolute -left-[13px] top-1.5 flex items-center justify-center bg-background rounded-full">
                    {getStatusIcon(item.status)}
                  </div>
                  <p
                    className={cn(
                      'text-sm font-semibold',
                      item.status === 'completed' && 'text-muted-foreground'
                    )}
                  >
                    {item.time}
                  </p>
                </div>

                <div className="grid gap-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.location}
                  </p>
                </div>
              </motion.div>
            ))
            ) : (
                <div className="text-center py-10 text-muted-foreground">
                    <p>No schedule items for today.</p>
                    <p className="text-sm">Click "Add Event" to plan your day.</p>
                </div>
            )}
          </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
