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

export default function CaregiverPage() {
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
            These people have access to your health data and alerts.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caregivers.map((caregiver) => (
            <div key={caregiver.id} className="flex items-center justify-between space-x-4 rounded-md border p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={caregiver.avatar} />
                  <AvatarFallback>{caregiver.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {caregiver.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {caregiver.email}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">Remove</Button>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <UserTable />

    </div>
  );
}
