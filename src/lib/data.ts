import {
  Flame,
  Footprints,
  HeartPulse,
  BedDouble,
  Users,
  User,
} from 'lucide-react';
import type { DailyHealthData, GeoFenceZone, HealthMetric, Notification, User as UserType } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const userAvatar1 = PlaceHolderImages.find((img) => img.id === 'user-avatar-1');

export const user: UserType = {
  id: '1',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  avatar: userAvatar1?.imageUrl ?? 'https://picsum.photos/seed/janedoe/100/100',
  age: 68,
  weight: '140 lbs',
  height: "5' 4\"",
  bloodType: 'O+',
};

export const healthMetrics: HealthMetric[] = [
  {
    id: '1',
    label: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    change: '+2%',
    icon: HeartPulse,
  },
  {
    id: '2',
    label: 'Steps',
    value: '8,450',
    unit: '',
    change: '+15%',
    icon: Footprints,
  },
  {
    id: '3',
    label: 'Calories Burned',
    value: '2,100',
    unit: 'kcal',
    change: '+5%',
    icon: Flame,
  },
  {
    id: '4',
    label: 'Sleep',
    value: '7.5',
    unit: 'hrs',
    change: '-3%',
    icon: BedDouble,
  },
];

export const weeklyHealthData: DailyHealthData[] = [
  { day: 'Mon', heartRate: 75, steps: 7500, calories: 1900, sleep: 7.0 },
  { day: 'Tue', heartRate: 78, steps: 9200, calories: 2200, sleep: 6.5 },
  { day: 'Wed', heartRate: 72, steps: 8100, calories: 2000, sleep: 8.0 },
  { day: 'Thu', heartRate: 76, steps: 10500, calories: 2400, sleep: 7.2 },
  { day: 'Fri', heartRate: 80, steps: 6500, calories: 1800, sleep: 6.8 },
  { day: 'Sat', heartRate: 74, steps: 12000, calories: 2800, sleep: 7.5 },
  { day: 'Sun', heartRate: 71, steps: 8450, calories: 2100, sleep: 8.5 },
];


export const notifications: Notification[] = [
  {
    id: '1',
    title: 'Geo-fence Alert',
    description: 'User left the "Home" safe zone.',
    timestamp: '5m ago',
  },
  {
    id: '2',
    title: 'Medication Reminder',
    description: 'Time to take your morning medication.',
    timestamp: '1h ago',
  },
  {
    id: '3',
    title: 'Health Summary Ready',
    description: 'Your weekly health summary is available.',
    timestamp: 'Yesterday',
  },
  {
    id: '4',
    title: 'Abnormal Heart Rate',
    description: 'Heart rate detected at 120 bpm while resting.',
    timestamp: '2 days ago',
  },
];

export const geoFences: GeoFenceZone[] = [
    { id: '1', name: 'Home', address: '123 Main St, Anytown, USA', radius: 100 },
    { id: '2', name: 'Community Center', address: '456 Oak Ave, Anytown, USA', radius: 200 },
];

export const caregivers: Partial<UserType>[] = [
  { id: '2', name: 'John Smith', email: 'john.s@example.com', avatar: PlaceHolderImages.find((img) => img.id === 'user-avatar-2')?.imageUrl },
  { id: '3', name: 'Dr. Emily Carter', email: 'emily.c@clinic.com' },
]

export const registeredUsers: UserType[] = [
  {...user},
  {
    id: '2',
    name: 'Robert Johnson',
    email: 'robert.j@example.com',
    avatar: 'https://picsum.photos/seed/robertj/100/100',
    age: 72,
    weight: '180 lbs',
    height: "6' 0\"",
    bloodType: 'A-',
  }
]
