import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import type { HealthMetric } from '@/lib/types';
import { cn } from '@/lib/utils';

type HealthMetricCardProps = {
  metric: HealthMetric;
};

export function HealthMetricCard({ metric }: HealthMetricCardProps) {
  const isPositiveChange = metric.change.startsWith('+');
  return (
    <Card>
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
          {metric.change} from last week
        </p>
      </CardContent>
    </Card>
  );
}
