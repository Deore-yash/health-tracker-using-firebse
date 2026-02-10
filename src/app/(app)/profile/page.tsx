import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Separator } from '@/components/ui/separator';
import { user } from '@/lib/data';

export default function ProfilePage() {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-headline">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm p-4">
              <div className="font-medium text-muted-foreground">Age</div>
              <div>{user.age}</div>
              <div className="font-medium text-muted-foreground">Weight</div>
              <div>{user.weight}</div>
              <div className="font-medium text-muted-foreground">Height</div>
              <div>{user.height}</div>
              <div className="font-medium text-muted-foreground">Blood Type</div>
              <div>{user.bloodType}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Edit Profile</CardTitle>
            <CardDescription>
              Update your personal and health information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user.email} />
                </div>
              </div>
              <Separator />
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                 <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" defaultValue={user.age} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input id="weight" defaultValue={user.weight.split(' ')[0]} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input id="height" defaultValue={user.height} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blood-type">Blood Type</Label>
                  <Input id="blood-type" defaultValue={user.bloodType} />
                </div>
               </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
