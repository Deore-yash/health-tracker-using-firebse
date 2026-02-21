import {
  Activity,
  Footprints,
  HeartPulse,
  Navigation,
  Cloudy,
  Waypoints,
} from 'lucide-react';
import type { DailyActivityData, GeoFenceZone, TouristStat, Notification, MonitoredUser, ItineraryItem } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const userAvatar1 = PlaceHolderImages.find((img) => img.id === 'tourist-avatar-1');

export const user: MonitoredUser = {
  id: '1',
  name: 'Priya Kulkarni',
  email: 'priya.kulkarni@example.com',
  avatar: userAvatar1?.imageUrl ?? 'https://picsum.photos/seed/priyak/100/100',
  age: 45,
  nationality: 'Indian',
  language: 'Marathi',
  emergencyContact: '+91-9876543210',
};

export const touristStats: TouristStat[] = [
  {
    id: '1',
    label: 'Activity Level',
    value: '76',
    unit: '%',
    change: '-2%',
    icon: Activity,
  },
  {
    id: '2',
    label: 'Steps Today',
    value: '8,230',
    unit: '',
    change: '+15%',
    icon: Footprints,
  },
  {
    id: '3',
    label: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    change: 'Normal',
    icon: HeartPulse,
  },
  {
    id: '4',
    label: 'Distance',
    value: '5.4',
    unit: 'km',
    change: '+10%',
    icon: Waypoints,
  },
];

export const weeklyActivityData: DailyActivityData[] = [
    { day: 'Mon', activityLevel: 75, steps: 11000 },
    { day: 'Tue', activityLevel: 78, steps: 14200 },
    { day: 'Wed', activityLevel: 72, steps: 9100 },
    { day: 'Thu', activityLevel: 85, steps: 15500 },
    { day: 'Fri', activityLevel: 80, steps: 12500 },
    { day: 'Sat', activityLevel: 90, steps: 18000 },
    { day: 'Sun', activityLevel: 76, steps: 8230 },
];


export const notifications: Notification[] = [
  {
    id: '1',
    title: 'Medication Reminder',
    description: 'Time to take your afternoon medication.',
    timestamp: '5m ago',
  },
  {
    id: '2',
    title: 'Appointment Reminder',
    description: 'Your appointment with Dr. Sharma is tomorrow at 10 AM.',
    timestamp: '1h ago',
  },
  {
    id: '3',
    title: 'Activity Goal Met',
    description: 'Congratulations! You\'ve reached your daily step goal.',
    timestamp: 'Yesterday',
  },
  {
    id: '4',
    title: 'Low Battery',
    description: 'Your device battery is at 15%.',
    timestamp: '2 days ago',
  },
];

export const geoFences: GeoFenceZone[] = [
    { id: '1', name: 'Home', address: 'Gangapur Road, Nashik, Maharashtra', radius: 100 },
    { id: '2', name: 'Godavari Park', address: 'Godavari Ghat, Panchavati, Nashik', radius: 300 },
];

export const caregivers: Partial<MonitoredUser>[] = [
  { id: '2', name: 'Rohan Mehta', email: 'rohan.m@healthtracker.com', avatar: PlaceHolderImages.find((img) => img.id === 'tour-guide-avatar-2')?.imageUrl },
  { id: '3', name: 'Anjali Desai', email: 'anjali.d@healthtracker.com', avatar: PlaceHolderImages.find((img) => img.id === 'tour-guide-avatar-1')?.imageUrl },
]

export const monitoredUsers: (MonitoredUser & { status: string; currentActivity: string; })[] = [
  {...user, status: 'Safe', currentActivity: 'At Home'},
  {
    id: '2',
    name: 'Sameer Joshi',
    email: 'sameer.j@example.com',
    avatar: 'https://picsum.photos/seed/sameerj/100/100',
    age: 68,
    nationality: 'Indian',
    language: 'Hindi',
    emergencyContact: '+91-9988776655',
    status: 'Alert',
    currentActivity: 'High Heart Rate Detected',
  }
]

export const itinerary: ItineraryItem[] = [
  {
    id: '1',
    time: '7:00 AM',
    title: 'Morning Walk',
    description: 'Walk at Godavari Park.',
    location: 'Nashik, Maharashtra',
    status: 'completed',
  },
  {
    id: '2',
    time: '9:00 AM',
    title: 'Breakfast & Medication',
    description: 'Healthy breakfast followed by morning pills.',
    location: 'Home',
    status: 'ongoing',
  },
  {
    id: '3',
    time: '11:00 AM',
    title: 'Doctor\'s Appointment',
    description: 'Check-up with Dr. Sharma.',
    location: 'Wockhardt Hospital, Nashik',
    status: 'upcoming',
  },
  {
    id: '4',
    time: '1:00 PM',
    title: 'Lunch',
    description: "Healthy lunch at home.",
    location: 'Home',
    status: 'upcoming',
  },
  {
    id: '5',
    time: '5:00 PM',
    title: 'Evening Stroll',
    description: 'Light walk around the neighborhood.',
    location: 'Home vicinity',
    status: 'upcoming',
  },
];
