import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Icons } from '@/components/icons';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image-1');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center">
        <Icons.logo className="h-8 w-auto text-primary" />
        <span className="font-headline text-2xl font-semibold ml-2 text-foreground">
          GuardianLife
        </span>
        <nav className="ml-auto flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-grow">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                    Your Personal Health and Safety Companion
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    GuardianLife provides real-time health tracking, emergency
                    SOS alerts, and AI-powered health advice to keep you and
                    your loved ones safe and sound.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/signup">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="secondary">
                    Learn More
                  </Button>
                </div>
              </div>
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  width={600}
                  height={400}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                />
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center py-6 border-t">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} GuardianLife. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
