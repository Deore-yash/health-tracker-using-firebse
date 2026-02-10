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

export default function GeoFencePage() {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Safe Zones</CardTitle>
            <CardDescription>
              Manage the geo-fenced areas for tour alerts.
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
      </div>
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Add New Zone</CardTitle>
            <CardDescription>Define a new safe area for your tour group.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="zone-name">Zone Name</Label>
                <Input id="zone-name" placeholder="e.g., Hotel, Museum District" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zone-address">Address or Landmark</Label>
                <Input id="zone-address" placeholder="123 Main St, Anytown" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zone-radius">Radius (meters)</Label>
                <Input id="zone-radius" type="number" placeholder="200" />
              </div>
              <Button type="submit" className="w-full">
                Add Zone
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
