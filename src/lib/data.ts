import {
  Activity,
  Footprints,
  HeartPulse,
  Waypoints,
} from 'lucide-react';
import type { HealthMetric } from '@/lib/types';

export const healthMetrics: HealthMetric[] = [
  {
    id: '1',
    label: 'Activity Level',
    value: '0',
    unit: '%',
    change: 'N/A',
    icon: Activity,
  },
  {
    id: '2',
    label: 'Steps Today',
    value: '0',
    unit: '',
    change: 'N/A',
    icon: Footprints,
  },
  {
    id: '3',
    label: 'Heart Rate',
    value: '0',
    unit: 'bpm',
    change: 'N/A',
    icon: HeartPulse,
  },
  {
    id: '4',
    label: 'Distance',
    value: '0',
    unit: 'km',
    change: 'N/A',
    icon: Waypoints,
  },
];
