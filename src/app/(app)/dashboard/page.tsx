import { HealthMetricCard } from '@/components/dashboard/health-metric-card';
import { HealthChart } from '@/components/dashboard/health-chart';
import { touristStats, tourist, weeklyActivityData } from '@/lib/data';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">
          Welcome back, {tourist.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s a look at your tour data for today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {touristStats.map((metric) => (
          <HealthMetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <HealthChart
          data={weeklyActivityData}
          title="Weekly Activity Level"
          description="Your average activity over the past week."
          dataKey="activityLevel"
          unit="%"
          chartType="line"
        />
        <HealthChart
          data={weeklyActivityData}
          title="Weekly Steps"
          description="Your total steps over the past week."
          dataKey="steps"
          unit=""
          chartType="bar"
        />
      </div>
    </div>
  );
}
