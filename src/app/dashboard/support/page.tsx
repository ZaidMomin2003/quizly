
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Header } from '@/components/dashboard/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { LifeBuoy, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const supportFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  contactNumber: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit mobile number.').optional().or(z.literal('')),
  topic: z.enum(['billing', 'technical', 'feedback', 'feature_request', 'other']),
  message: z.string().min(10, 'Message must be at least 10 characters.').max(2000, 'Message cannot exceed 2000 characters.'),
});

type SupportFormValues = z.infer<typeof supportFormSchema>;

export default function SupportPage() {
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<SupportFormValues>({
        resolver: zodResolver(supportFormSchema),
        defaultValues: {
            name: user?.displayName || '',
            email: user?.email || '',
            contactNumber: '',
            topic: 'technical',
            message: '',
        },
    });
    
    // This function will be called when the form is submitted
    const onSubmit = async (data: SupportFormValues) => {
        setIsSubmitting(true);
        // Here you would typically send the data to your support backend (e.g., using an API call)
        console.log('Support ticket submitted:', data);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after a delay
        setTimeout(() => {
            setIsSubmitted(false);
            form.reset();
        }, 5000);
    };

    return (
        <div className="flex flex-col h-screen bg-background">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="max-w-3xl mx-auto">
                     <div className="mb-8 text-center">
                        <LifeBuoy className="mx-auto h-12 w-12 text-primary" />
                        <h1 className="mt-4 text-3xl font-bold tracking-tight">
                            We're here to help
                        </h1>
                        <p className="mt-2 text-muted-foreground">
                            Our support team is dedicated to providing you with the best experience possible. Fill out the form below, and we'll get back to you as soon as we can.
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Submit a Support Ticket</CardTitle>
                            <CardDescription>Most inquiries receive a response within 24 hours.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             {isSubmitted ? (
                                <div className="text-center py-16 flex flex-col items-center gap-4">
                                    <CheckCircle className="h-16 w-16 text-green-500" />
                                    <h2 className="text-2xl font-semibold">Thank You!</h2>
                                    <p className="text-muted-foreground max-w-md">Your support ticket has been submitted successfully. Our team will review it and get back to you shortly.</p>
                                </div>
                            ) : (
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Full Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="e.g., Rohan Sharma" {...field} />
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
                                                        <FormLabel>Email Address</FormLabel>
                                                        <FormControl>
                                                            <Input type="email" placeholder="you@example.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                              <FormField
                                                control={form.control}
                                                name="contactNumber"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Contact Number (Optional)</FormLabel>
                                                        <FormControl>
                                                            <Input type="tel" placeholder="9876543210" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                             <FormField
                                                control={form.control}
                                                name="topic"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Topic</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a topic" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="technical">Technical Issue</SelectItem>
                                                                <SelectItem value="billing">Billing & Subscription</SelectItem>
                                                                <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                                                                <SelectItem value="feature_request">Feature Request</SelectItem>
                                                                <SelectItem value="other">Other</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                         </div>
                                         <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>How can we help?</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Please describe your issue or question in detail..."
                                                            className="min-h-[150px]"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="mr-2 h-5 w-5" />
                                                    Submit Ticket
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </Form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
