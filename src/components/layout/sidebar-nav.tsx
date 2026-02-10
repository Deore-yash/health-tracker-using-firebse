'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MapPin,
  MessageCircle,
  Users,
  LogOut,
  ListChecks,
} from 'lucide-react';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Icons } from '@/components/icons';
import { tourist } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const links = [
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    href: '/itinerary',
    icon: ListChecks,
    label: 'Itinerary',
  },
  {
    href: '/geofence',
    icon: MapPin,
    label: 'Safe Zones',
  },
  {
    href: '/chatbot',
    icon: MessageCircle,
    label: 'AI Assistant',
  },
  {
    href: '/caregiver',
    icon: Users,
    label: 'Tour Guides',
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Icons.logo className="h-8 w-auto text-primary" />
          <span className="font-headline text-2xl font-semibold text-foreground">
            TourSecure
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(link.href)}
                tooltip={link.label}
              >
                <Link href={link.href}>
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <div className="flex flex-col gap-2 p-2">
          <Link href="/profile">
            <div
              className={cn(
                'flex items-center gap-3 rounded-md p-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                'group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0'
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={tourist.avatar} alt={tourist.name} />
                <AvatarFallback>
                  {tourist.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="font-semibold">{tourist.name}</span>
                <span className="text-xs text-muted-foreground">
                  {tourist.email}
                </span>
              </div>
            </div>
          </Link>
          <Button variant="ghost">
            <LogOut className="mr-2" />
            <span className="group-data-[collapsible=icon]:hidden">
              Logout
            </span>
          </Button>
        </div>
      </SidebarFooter>
    </>
  );
}
