
'use client';

import { UserTable } from '@/components/caregiver/user-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { caregivers } from '@/lib/data';
import { motion } from 'framer-motion';

export default function CaregiverPage() {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Caregiver Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor users and manage your caregiver team.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Caregiver Team</CardTitle>
          <CardDescription>
            These people are assigned to your monitored users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {caregivers.map((guide) => (
              <motion.div
                key={guide.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex items-center justify-between space-x-4 rounded-md border p-4 transition-shadow hover:shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={guide.avatar} />
                    <AvatarFallback>{guide.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {guide.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {guide.email}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Remove</Button>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
      
      <UserTable />

    </div>
  );
}
