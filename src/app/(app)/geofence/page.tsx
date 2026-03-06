'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { collection, doc } from 'firebase/firestore';
import {
  useUser,
  useFirestore,
  useCollection,
  useMemoFirebase,
  addDocumentNonBlocking,
  deleteDocumentNonBlocking,
} from '@/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import type { GeoFenceZone } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const geoFenceSchema = z.object({
  name: z.string().min(1, { message: 'Area name is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  radius: z.coerce.number().min(10, { message: 'Radius must be at least 10 meters' }),
});

type GeoFenceFormValues = z.infer<typeof geoFenceSchema>;

export default function GeoFencePage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const geoFencesRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'geoFences');
  }, [user, firestore]);

  const { data: geoFences, isLoading } = useCollection<GeoFenceZone>(geoFencesRef);
  
  const form = useForm<GeoFenceFormValues>({
    resolver: zodResolver(geoFenceSchema),
    defaultValues: { name: '', address: '', radius: 100 },
  });

  const onSubmit = (values: GeoFenceFormValues) => {
    if (!geoFencesRef || !user) return;
    // In a real app, you'd convert address to lat/lng here
    const mockLatLng = { latitude: 19.9975, longitude: 73.7898 };
    addDocumentNonBlocking(geoFencesRef, { ...values, ...mockLatLng, userId: user.uid });
    form.reset();
  };
  
  const deleteFence = (id: string) => {
    if (!user || !firestore) return;
    const docRef = doc(firestore, 'users', user.uid, 'geoFences', id);
    deleteDocumentNonBlocking(docRef);
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
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
            <CardDescription>Manage the geo-fenced areas for alerts.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Radius</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {geoFences && geoFences.map((zone) => (
                  <TableRow key={zone.id}>
                    <TableCell className="font-medium">{zone.name}</TableCell>
                    <TableCell>{zone.address}</TableCell>
                    <TableCell>{zone.radius}m</TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => deleteFence(zone.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
                 {(!geoFences || geoFences.length === 0) && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground">No safe areas defined.</TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
            )}
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Home, Park" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address or Landmark</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="123 Main St, Nashik" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="radius"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Radius (meters)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="100" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  Add Area
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
