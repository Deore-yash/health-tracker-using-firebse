'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { geoFences } from '@/lib/data';
import { motion } from 'framer-motion';

export default function GeoFencePage() {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <motion.div
      className="grid gap-6 lg:grid-cols-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="lg:col-span-3" variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Safe Areas</CardTitle>
            <CardDescription>
              Manage the geo-fenced areas for alerts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-right">Radius</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {geoFences.map((zone) => (
                  <TableRow key={zone.id}>
                    <TableCell className="font-medium">{zone.name}</TableCell>
                    <TableCell>{zone.address}</TableCell>
                    <TableCell className="text-right">{zone.radius}m</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div className="lg:col-span-2" variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Add New Area</CardTitle>
            <CardDescription>Define a new safe area.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="zone-name">Area Name</Label>
                <Input id="zone-name" placeholder="e.g., Home, Park" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zone-address">Address or Landmark</Label>
                <Input id="zone-address" placeholder="123 Main St, Nashik" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zone-radius">Radius (meters)</Label>
                <Input id="zone-radius" type="number" placeholder="100" />
              </div>
              <Button type="submit" className="w-full">
                Add Area
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
