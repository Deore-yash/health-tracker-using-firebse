import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Icons } from '@/components/icons';
import { ArrowRight, Star } from 'lucide-react';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image-1');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-8 w-auto text-primary" />
          <span className="font-headline text-2xl font-bold text-foreground">
            TourSecure
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-grow">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 to-transparent"></div>
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-headline font-extrabold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl/none text-foreground">
                    Your Adventure,
                    <br />
                    <span className="text-primary">Secured.</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    TourSecure is the all-in-one platform for modern tour operators. Ensure traveler safety with real-time tracking, AI assistance, and instant alerts.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center -space-x-2">
                    <Image
                      src="https://picsum.photos/seed/p1/40/40"
                      alt="User"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-background"
                    />
                    <Image
                      src="https://picsum.photos/seed/p2/40/40"
                      alt="User"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-background"
                    />
                    <Image
                      src="https://picsum.photos/seed/p3/40/40"
                      alt="User"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-background"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">Loved by 10,000+ tour guides.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild className="shadow-lg shadow-primary/20">
                    <Link href="/signup">Start Your Free Trial</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#">Book a Demo</Link>
                  </Button>
                </div>
              </div>
              {heroImage && (
                <div className="relative group">
                  <Image
                    src={heroImage.imageUrl}
                    width={600}
                    height={600}
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover transition-all duration-300 group-hover:scale-105"
                  />
                   <div className="absolute -bottom-4 -right-4 w-48 rounded-lg bg-card p-4 shadow-lg border">
                      <h4 className="font-semibold text-sm">Real-time Alerts</h4>
                      <p className="text-xs text-muted-foreground mt-1">Tourist 'Alex' has left the designated safe zone.</p>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                        <div className="bg-destructive h-1.5 rounded-full w-3/4"></div>
                      </div>
                    </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="container mx-auto flex items-center justify-center py-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} TourSecure. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
