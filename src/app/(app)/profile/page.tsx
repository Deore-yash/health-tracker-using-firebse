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
import { tourist } from '@/lib/data';

export default function ProfilePage() {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={tourist.avatar} />
              <AvatarFallback>
                {tourist.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-headline">{tourist.name}</CardTitle>
            <CardDescription>{tourist.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm p-4">
              <div className="font-medium text-muted-foreground">Age</div>
              <div>{tourist.age}</div>
              <div className="font-medium text-muted-foreground">Nationality</div>
              <div>{tourist.nationality}</div>
              <div className="font-medium text-muted-foreground">Language</div>
              <div>{tourist.language}</div>
              <div className="font-medium text-muted-foreground">Emergency Contact</div>
              <div>{tourist.emergencyContact}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Edit Profile</CardTitle>
            <CardDescription>
              Update your personal and tour information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={tourist.name} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={tourist.email} />
                </div>
              </div>
              <Separator />
               <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" defaultValue={tourist.age} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input id="nationality" defaultValue={tourist.nationality} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Input id="language" defaultValue={tourist.language} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency-contact">Emergency Contact</Label>
                  <Input id="emergency-contact" defaultValue={tourist.emergencyContact} />
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
