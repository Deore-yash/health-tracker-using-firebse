
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { doc } from 'firebase/firestore';
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { useEffect } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Icons } from '@/components/icons';
import { ArrowRight, Star } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignupFormValues = z.infer<typeof formSchema>;

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image-1');

  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const onSubmit = async (values: SignupFormValues) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      if (user) {
        await updateProfile(user, { displayName: values.fullName });

        if (firestore) {
          const [firstName, ...lastNameParts] = values.fullName.split(' ');
          const lastName = lastNameParts.join(' ');

          const userProfile = {
            id: user.uid,
            firstName: firstName || '',
            lastName: lastName || '',
            email: values.email,
            phoneNumber: '',
          };

          const userDocRef = doc(firestore, 'users', user.uid, 'profile', 'data');
          setDocumentNonBlocking(userDocRef, userProfile, { merge: true });

          const aiHealthStateRef = doc(
            firestore,
            'users',
            user.uid,
            'aiHealthState',
            'data'
          );
          setDocumentNonBlocking(
            aiHealthStateRef,
            {
              id: user.uid,
              userId: user.uid,
              state: 'Initial state',
              lastUpdated: new Date().toISOString(),
            },
            { merge: true }
          );
        }
      }
    } catch (error) {
      console.error('Error signing up:', error);
      toast({
        variant: 'destructive',
        title: 'Sign-up Failed',
        description: 'Could not create your account. Please try again.',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-8 w-auto text-primary" />
          <span className="font-headline text-2xl font-bold text-foreground">
            Health Tracker
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
                <motion.div 
                  className="space-y-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  <motion.h1 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                    className="text-4xl font-headline font-extrabold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl/none text-foreground"
                  >
                    Your Health,
                    <br />
                    <span className="text-primary">Monitored.</span>
                  </motion.h1>
                  <motion.p 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }
                    }}
                    className="max-w-[600px] text-muted-foreground md:text-xl"
                  >
                    Health Tracker is the all-in-one platform for personal and caregiver health monitoring. Ensure well-being with real-time tracking,
                    AI assistance, and instant alerts.
                  </motion.p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center gap-4"
                >
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
                    <motion.div
                      className="flex items-center gap-0.5"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
                      }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0 },
                          }}
                        >
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        </motion.div>
                      ))}
                    </motion.div>
                    <p className="text-sm text-muted-foreground">
                      Trusted by 1,000+ families.
                    </p>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                >
                  <Button
                    size="lg"
                    asChild
                    className="shadow-lg shadow-primary/20"
                  >
                    <Link href="#register">Start Your Free Trial</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#">Book a Demo</Link>
                  </Button>
                </motion.div>
              </div>
              {heroImage && (
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                    className="relative group"
                  >
                  <Image
                    src={heroImage.imageUrl}
                    width={600}
                    height={600}
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                  />
                  <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
                    className="absolute -bottom-4 -right-4 w-48 rounded-lg bg-card p-4 shadow-lg border transition-all duration-300 group-hover:scale-105"
                  >
                    <h4 className="font-semibold text-sm">Real-time Alerts</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      High heart rate detected for 'Sameer'.
                    </p>
                    <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                      <div className="bg-destructive h-1.5 rounded-full w-3/4"></div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
        <section id="register" className="w-full py-20 md:py-32 lg:py-40 bg-muted/40">
          <div className="container px-4 md:px-6">
            <motion.div
              className="max-w-xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Card>
                <CardHeader className="space-y-2 text-center">
                  <Icons.logo className="w-12 h-12 mx-auto text-primary" />
                  <CardTitle className="text-3xl font-headline">
                    Get Started with Health Tracker
                  </CardTitle>
                  <CardDescription>
                    Create your account in seconds and start monitoring your health.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="grid gap-4"
                    >
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Yash Deore" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="yash.deore@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? 'Creating Account...'
                          : 'Create a Free Account'}
                      </Button>
                    </form>
                  </Form>
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="underline">
                      Login
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="container mx-auto flex items-center justify-center py-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Health Tracker. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
