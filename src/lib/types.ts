export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  bloodType?: string;
  allergies?: string;
  medicalConditions?: string;
};

export type MonitoredUser = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  age: number;
  nationality: string;
  language: string;
  emergencyContact: string;
};

export type HealthMetric = {
  id: string;
  label: string;
  value: string;
  unit: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type ActivityData = {
  activityLevel: number;
  steps: number;
  timestamp: string;
};

export type DailyActivityData = {
  day: string;
} & ActivityData;

export type Alert = {
  id: string;
  userId: string;
  type: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
};

export type GeoFenceZone = {
  id: string;
  name: string;
  address: string;
  radius: number; // in meters
};

export type Itinerary = {
  id: string;
  userId: string;
  time: string;
  title: string;
  description: string;
  location: string;
  status: 'completed' | 'upcoming' | 'ongoing';
};

export type AiHealthState = {
  id: string;
  userId: string;
  state: string;
  lastUpdated: string;
};

export type EmergencyContact = {
  id: string;
  userId: string;
  name: string;
  phoneNumber: string;
  relationship: string;
}
