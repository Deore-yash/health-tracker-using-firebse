import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { itinerary } from '@/lib/data';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, Radio } from 'lucide-react';

export default function ItineraryPage() {
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
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Today's Itinerary</h1>
        <p className="text-muted-foreground">
          A schedule of your activities for the day.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
          <CardDescription>Your scheduled events in Rome.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative pl-6 after:absolute after:inset-y-0 after:w-px after:bg-border after:left-0">
            {itinerary.map((item) => (
              <div
                key={item.id}
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
