
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { monitoredUsers } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MapPin, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export function UserTable() {
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
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monitored Users</CardTitle>
        <CardDescription>
          Track the status and location of your assigned users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {monitoredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: 'hsl(var(--muted))' }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.status === 'Safe' ? 'secondary' : 'destructive'}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.currentActivity}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <motion.div className="inline-block" whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" size="sm">
                        <Activity className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </motion.div>
                     <motion.div className="inline-block" whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" size="sm">
                        <MapPin className="mr-2 h-4 w-4" />
                        Live Location
                      </Button>
                    </motion.div>
                  </TableCell>
                </motion.tr>
              ))}
            </motion.tbody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
