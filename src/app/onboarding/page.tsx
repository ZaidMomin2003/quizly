
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, GraduationCap, Dna, Atom, Rocket, Calendar, Users, Newspaper, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useOnboardingStore, OnboardingData } from '@/stores/onboarding-store';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const onboardingSchema = z.object({
  yearOfStudy: z.enum(['first_year', 'second_year', 'repeater']),
  source: z.string().min(1, 'Please select an option.'),
  mobileNumber: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit mobile number.'),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

const examOptions = [
    { id: 'neet', name: 'NEET', icon: Dna },
    { id: 'jee_main', name: 'JEE Main', icon: Atom },
    { id: 'jee_advanced', name: 'JEE Advanced', icon: Rocket },
];

const yearOptions = [
    { id: 'first_year', name: 'First Year', icon: Calendar },
    { id: 'second_year', name: 'Second Year', icon: Users },
    { id: 'repeater', name: 'Repeater', icon: Newspaper },
];

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const { formData, setFormData, saveOnboardingData } = useOnboardingStore();

    const form = useForm<OnboardingFormValues>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            yearOfStudy: formData.yearOfStudy || 'first_year',
            source: formData.source || '',
            mobileNumber: formData.mobileNumber || '',
        },
    });

    const handleExamSelect = (exam: 'NEET' | 'JEE Main' | 'JEE Advanced') => {
        setFormData({ exam });
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    }

    const onSubmit = async (data: OnboardingFormValues) => {
        setIsLoading(true);
        if (user) {
            await saveOnboardingData(user.uid, data);
            router.push('/dashboard');
        } else {
            // Handle case where user is not authenticated somehow
            router.push('/login');
        }
        setIsLoading(false);
    };
    
    if (authLoading || !user) {
        return (
            <div className="flex h-screen w-screen items-center justify-center bg-background">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }
    
    const containerVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
            <div className="w-full max-w-lg">
                <div className="flex justify-center items-center gap-2 mb-8">
                    <Bot className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold font-headline text-foreground">WisdomIsFun</span>
                </div>
                <Card className="shadow-2xl">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                            >
                                <CardHeader>
                                    <CardTitle className="text-center text-2xl font-semibold">Welcome to WisdomIsFun!</CardTitle>
                                    <CardDescription className="text-center">Let's get you set up. Which exam are you preparing for?</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {examOptions.map((option) => (
                                        <Card 
                                            key={option.id}
                                            onClick={() => handleExamSelect(option.name as any)}
                                            className="cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                                        >
                                            <CardContent className="p-4 flex items-center gap-4">
                                                <div className="p-3 bg-primary/10 rounded-lg">
                                                    <option.icon className="h-6 w-6 text-primary" />
                                                </div>
                                                <span className="text-lg font-medium">{option.name}</span>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </CardContent>
                            </motion.div>
                        )}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.3 }}
                            >
                                <CardHeader>
                                    <button onClick={handleBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
                                        <ArrowLeft className="h-4 w-4" />
                                        Back
                                    </button>
                                    <CardTitle className="text-2xl font-semibold">Tell us a bit more</CardTitle>
                                    <CardDescription>This will help us personalize your experience.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                            <FormField
                                                control={form.control}
                                                name="yearOfStudy"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-3">
                                                        <FormLabel className="font-semibold">What year are you in?</FormLabel>
                                                        <FormControl>
                                                            <RadioGroup
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                                                            >
                                                                {yearOptions.map(option => (
                                                                     <FormItem key={option.id}>
                                                                        <FormControl>
                                                                            <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                                                                        </FormControl>
                                                                        <Label htmlFor={option.id} className={cn(
                                                                            "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                                                                            field.value === option.id && "border-primary"
                                                                        )}>
                                                                            <option.icon className="h-6 w-6 mb-2" />
                                                                            {option.name}
                                                                        </Label>
                                                                    </FormItem>
                                                                ))}
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <FormField
                                                  control={form.control}
                                                  name="source"
                                                  render={({ field }) => (
                                                    <FormItem>
                                                      <FormLabel>How did you hear about us?</FormLabel>
                                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                          <SelectTrigger>
                                                            <SelectValue placeholder="Select a source" />
                                                          </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                          <SelectItem value="instagram">Instagram</SelectItem>
                                                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                                          <SelectItem value="youtube">YouTube</SelectItem>
                                                          <SelectItem value="facebook">Facebook</SelectItem>
                                                          <SelectItem value="telegram">Telegram</SelectItem>
                                                          <SelectItem value="friend">Friend/Colleague</SelectItem>
                                                          <SelectItem value="other">Other</SelectItem>
                                                        </SelectContent>
                                                      </Select>
                                                      <FormMessage />
                                                    </FormItem>
                                                  )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="mobileNumber"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Mobile Number</FormLabel>
                                                            <FormControl>
                                                                <Input type="tel" placeholder="9876543210" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <Button type="submit" disabled={isLoading} className="w-full">
                                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                Finish Setup & Go to Dashboard
                                            </Button>
                                        </form>
                                    </Form>
                                </CardContent>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Card>
            </div>
        </div>
    );
}
