import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { TouristStat } from '@/lib/types';
import { cn } from '@/lib/utils';

type HealthMetricCardProps = {
  metric: TouristStat;
};

export function HealthMetricCard({ metric }: HealthMetricCardProps) {
  const isPositiveChange = metric.change.startsWith('+');
  return (
    <Card className="transition-all hover:shadow-md hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
        <metric.icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {metric.value}
          <span className="text-base font-normal text-muted-foreground ml-1">
            {metric.unit}
          </span>
        </div>
        <p
          className={cn(
            'text-xs text-muted-foreground',
            isPositiveChange ? 'text-green-600' : 'text-red-600'
          )}
        >
          {metric.change} from yesterday
        </p>
      </CardContent>
    </Card>
  );
}
