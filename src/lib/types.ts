export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  age: number;
  weight: string;
  height: string;
  bloodType: string;
};

export type HealthMetric = {
  id: string;
  label: string;
  value: string;
  unit: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type HealthData = {
  heartRate: number;
  steps: number;
  calories: number;
  sleep: number; // in hours
};

export type DailyHealthData = {
  day: string;
} & HealthData;

export type Notification = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
};

export type GeoFenceZone = {
  id: string;
  name: string;
  address: string;
  radius: number; // in meters
};
