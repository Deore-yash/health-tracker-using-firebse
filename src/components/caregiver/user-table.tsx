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
import { registeredUsers } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MapPin, Activity } from 'lucide-react';

export function UserTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registered Users</CardTitle>
        <CardDescription>
          Monitor the health and location of your assigned users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Heart Rate</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registeredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">Normal</Badge>
                </TableCell>
                <TableCell>72 bpm</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm">
                    <Activity className="mr-2 h-4 w-4"/>
                    Health Summary
                  </Button>
                  <Button variant="outline" size="sm">
                    <MapPin className="mr-2 h-4 w-4"/>
                    Live Location
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
