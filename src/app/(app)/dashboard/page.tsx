import { HealthMetricCard } from '@/components/dashboard/health-metric-card';
import { HealthChart } from '@/components/dashboard/health-chart';
import { healthMetrics, user, weeklyHealthData } from '@/lib/data';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">
          Welcome back, {user.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s a look at your health data for today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {healthMetrics.map((metric) => (
          <HealthMetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <HealthChart
          data={weeklyHealthData}
          title="Weekly Heart Rate"
          description="Your average heart rate over the past week."
          dataKey="heartRate"
          unit="bpm"
          chartType="line"
        />
        <HealthChart
          data={weeklyHealthData}
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
