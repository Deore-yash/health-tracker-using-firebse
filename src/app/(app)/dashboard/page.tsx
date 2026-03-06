'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { format } from 'date-fns';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';

import { HealthMetricCard } from '@/components/dashboard/health-metric-card';
import { HealthChart } from '@/components/dashboard/health-chart';
import { WeeklySummary } from '@/components/dashboard/weekly-summary';
import { healthMetrics as defaultHealthMetrics } from '@/lib/data';
import type { ActivityData, DailyActivityData, HealthMetric } from '@/lib/types';

export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>(defaultHealthMetrics);
  const [weeklyActivity, setWeeklyActivity] = useState<DailyActivityData[]>([]);

  const activityRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'activityData'),
      orderBy('timestamp', 'desc'),
      limit(7)
    );
  }, [user, firestore]);

  const { data: activityData, isLoading } = useCollection<ActivityData>(activityRef);

  useEffect(() => {
    if (activityData) {
      if (activityData.length > 0) {
        const latestActivity = activityData[0];
        setHealthMetrics(prevMetrics => 
          prevMetrics.map(metric => {
            if (metric.label === "Steps Today") {
              return { ...metric, value: latestActivity.steps.toLocaleString() };
            }
            if (metric.label === "Activity Level") {
              return { ...metric, value: latestActivity.activityLevel.toString() };
            }
            return metric;
          })
        );
      }
      
      const formattedWeeklyData = activityData.map(activity => ({
        ...activity,
        day: format(new Date(activity.timestamp), 'EEE'),
      })).reverse();
      setWeeklyActivity(formattedWeeklyData);
    }
  }, [activityData]);

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
    hidden: { y: 20, opacity: 0, scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">
          Welcome back, {user?.displayName?.split(' ')[0] ?? 'User'}!
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
          data={weeklyActivity}
          title="Weekly Activity Level"
          description="Your average activity over the past week."
          dataKey="activityLevel"
          unit="%"
          chartType="line"
        />
        <HealthChart
          data={weeklyActivity}
          title="Weekly Steps"
          description="Your total steps over the past week."
          dataKey="steps"
          unit=""
          chartType="bar"
        />
        <WeeklySummary weeklyActivityData={weeklyActivity} />
      </div>
    </div>
  );
}
