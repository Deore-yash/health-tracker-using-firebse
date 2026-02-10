'use client';

import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import type { DailyHealthData } from '@/lib/types';

type HealthChartProps = {
  data: DailyHealthData[];
  title: string;
  description: string;
  dataKey: keyof DailyHealthData;
  unit: string;
  chartType: 'line' | 'bar';
};

export function HealthChart({
  data,
  title,
  description,
  dataKey,
  unit,
  chartType,
}: HealthChartProps) {
  const chartConfig = {
    [dataKey]: {
      label: title,
      color: 'hsl(var(--primary))',
    },
  } satisfies ChartConfig;

  const ChartComponent = chartType === 'line' ? LineChart : BarChart;
  const DataComponent = chartType === 'line' ? Line : Bar;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ChartComponent
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}${unit ? ` ${unit}` : ''}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <DataComponent
              dataKey={dataKey}
              fill="var(--color-primary)"
              stroke="var(--color-primary)"
              radius={chartType === 'bar' ? 4 : 0}
            />
          </ChartComponent>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
