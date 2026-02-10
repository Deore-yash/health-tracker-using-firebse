import {
  Activity,
  Footprints,
  Navigation,
  Cloudy,
} from 'lucide-react';
import type { DailyActivityData, GeoFenceZone, TouristStat, Notification, Tourist, ItineraryItem } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const touristAvatar1 = PlaceHolderImages.find((img) => img.id === 'tourist-avatar-1');

export const tourist: Tourist = {
  id: '1',
  name: 'Alex Smith',
  email: 'alex.smith@example.com',
  avatar: touristAvatar1?.imageUrl ?? 'https://picsum.photos/seed/alexsmith/100/100',
  age: 34,
  nationality: 'Canadian',
  language: 'English',
  emergencyContact: '+1-555-123-4567',
};

export const touristStats: TouristStat[] = [
  {
    id: '1',
    label: 'Activity Level',
    value: '82',
    unit: '%',
    change: '+5%',
    icon: Activity,
  },
  {
    id: '2',
    label: 'Steps Today',
    value: '12,540',
    unit: '',
    change: '+22%',
    icon: Footprints,
  },
  {
    id: '3',
    label: 'Distance Covered',
    value: '8.2',
    unit: 'km',
    change: '+18%',
    icon: Navigation,
  },
  {
    id: '4',
    label: 'Current Weather',
    value: '24',
    unit: '°C',
    change: 'Cloudy',
    icon: Cloudy,
  },
];

export const weeklyActivityData: DailyActivityData[] = [
    { day: 'Mon', activityLevel: 75, steps: 11000 },
    { day: 'Tue', activityLevel: 78, steps: 14200 },
    { day: 'Wed', activityLevel: 72, steps: 9100 },
    { day: 'Thu', activityLevel: 85, steps: 15500 },
    { day: 'Fri', activityLevel: 80, steps: 12500 },
    { day: 'Sat', activityLevel: 90, steps: 18000 },
    { day: 'Sun', activityLevel: 82, steps: 12540 },
];


export const notifications: Notification[] = [
  {
    id: '1',
    title: 'Geo-fence Alert',
    description: 'Alex Smith left the "Hotel" safe zone.',
    timestamp: '5m ago',
  },
  {
    id: '2',
    title: 'Itinerary Update',
    description: 'Your museum tour has been confirmed for 3 PM.',
    timestamp: '1h ago',
  },
  {
    id: '3',
    title: 'Weather Warning',
    description: 'Heavy rain expected this afternoon. Pack an umbrella!',
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
    { id: '1', name: 'Hotel Roma', address: 'Via del Corso, 1, 00187 Roma RM, Italy', radius: 200 },
    { id: '2', name: 'Colosseum Area', address: 'Piazza del Colosseo, 1, 00184 Roma RM, Italy', radius: 500 },
];

export const tourGuides: Partial<Tourist>[] = [
  { id: '2', name: 'Maria Rossi', email: 'maria.r@toursecure.com', avatar: PlaceHolderImages.find((img) => img.id === 'tour-guide-avatar-1')?.imageUrl },
  { id: '3', name: 'Marco Bianchi', email: 'marco.b@toursecure.com', avatar: PlaceHolderImages.find((img) => img.id === 'tour-guide-avatar-2')?.imageUrl },
]

export const monitoredTourists: (Tourist & { status: string; currentActivity: string; })[] = [
  {...tourist, status: 'Safe', currentActivity: 'Exploring the Roman Forum'},
  {
    id: '2',
    name: 'Robert Johnson',
    email: 'robert.j@example.com',
    avatar: 'https://picsum.photos/seed/robertj/100/100',
    age: 72,
    nationality: 'American',
    language: 'English',
    emergencyContact: '+1-555-987-6543',
    status: 'Alert',
    currentActivity: 'Left safe zone',
  }
]

export const itinerary: ItineraryItem[] = [
  {
    id: '1',
    time: '9:00 AM',
    title: 'Visit the Colosseum',
    description: 'Guided tour of the ancient amphitheater.',
    location: 'Rome, Italy',
    status: 'completed',
  },
  {
    id: '2',
    time: '11:00 AM',
    title: 'Explore the Roman Forum',
    description: 'Walk through the ruins of the ancient city center.',
    location: 'Rome, Italy',
    status: 'ongoing',
  },
  {
    id: '3',
    time: '1:00 PM',
    title: 'Lunch at Trattoria da Enzo',
    description: 'Enjoy traditional Roman cuisine.',
    location: 'Trastevere, Rome',
    status: 'upcoming',
  },
  {
    id: '4',
    time: '3:00 PM',
    title: 'Vatican City Tour',
    description: "Visit St. Peter's Basilica and the Vatican Museums.",
    location: 'Vatican City',
    status: 'upcoming',
  },
  {
    id: '5',
    time: '7:00 PM',
    title: 'Dinner and Trevi Fountain',
    description: 'Evening stroll and dinner near the famous fountain.',
    location: 'Rome, Italy',
    status: 'upcoming',
  },
];
