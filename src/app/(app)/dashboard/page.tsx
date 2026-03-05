'use client';

import { motion } from 'framer-motion';
import { HealthMetricCard } from '@/components/dashboard/health-metric-card';
import { HealthChart } from '@/components/dashboard/health-chart';
import { WeeklySummary } from '@/components/dashboard/weekly-summary';
import { healthMetrics, user, weeklyActivityData } from '@/lib/data';

export default function DashboardPage() {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95, rotate: -2 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">
          Welcome back, {user.name.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Here's your daily health summary.
        </p>
      </div>

      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {healthMetrics.map((metric) => (
          <motion.div
            key={metric.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5, transition: { type: 'spring', stiffness: 300 } }}
          >
            <HealthMetricCard metric={metric} />
          </motion.div>
        ))}
      </motion.div>

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
        <WeeklySummary />
      </div>
    </div>
  );
}
