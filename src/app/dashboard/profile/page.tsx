
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useOnboardingStore } from '@/stores/onboarding-store';
import { Header } from '@/components/dashboard/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, User, Mail, Smartphone, Rocket, Target, Users, Newspaper } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const { formData, isLoaded, loadOnboardingData } = useOnboardingStore();
    const router = useRouter();

    useEffect(() => {
        if (user && !isLoaded) {
            loadOnboardingData(user.uid);
        }
    }, [user, isLoaded, loadOnboardingData]);
    
    const getAvatarFallback = (name: string | null | undefined) => {
        if (!name) return 'U';
        const parts = name.split(' ');
        if (parts.length > 1) {
            return parts[0][0] + parts[1][0];
        }
        return name[0];
    }
    
    if (authLoading || !isLoaded) {
        return (
            <div className="flex flex-col h-screen bg-background">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <h2 className="text-xl font-semibold">Loading Profile...</h2>
                </main>
            </div>
        );
    }
    
    const getYearOfStudyText = (year: string | undefined) => {
        switch(year) {
            case 'first_year': return 'First Year';
            case 'second_year': return 'Second Year';
            case 'repeater': return 'Repeater';
            default: return 'N/A';
        }
    }

    return (
        <div className="flex flex-col h-screen bg-background">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                            <User className='h-7 w-7' />
                            My Profile
                        </h1>
                        <p className="text-muted-foreground">View and manage your account information.</p>
                    </div>

                    <Card>
                        <CardHeader className="flex flex-col sm:flex-row items-center gap-6">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || 'User'} />
                                <AvatarFallback className="text-3xl">{getAvatarFallback(user?.displayName)}</AvatarFallback>
                            </Avatar>
                            <div className="text-center sm:text-left">
                                <CardTitle className="text-3xl">{user?.displayName}</CardTitle>
                                <CardDescription className="mt-1">{user?.email}</CardDescription>
                            </div>
                            <Button variant="outline" className="ml-auto mt-4 sm:mt-0" onClick={() => router.push('/onboarding')}>
                                Edit Profile
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg">Personal Information</h3>
                                    <div className="flex items-center gap-3">
                                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                                        <span>{formData.mobileNumber || 'Not Provided'}</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg">Exam Preparation</h3>
                                     <div className="flex items-center gap-3">
                                        <Target className="h-5 w-5 text-muted-foreground" />
                                        <Badge variant="secondary">{formData.exam || 'Not Set'}</Badge>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Users className="h-5 w-5 text-muted-foreground" />
                                        <span>{getYearOfStudyText(formData.yearOfStudy)}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Newspaper className="h-5 w-5 text-muted-foreground" />
                                        <span className='capitalize'>Heard about us from: {formData.source || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="mt-8 border-destructive">
                        <CardHeader>
                            <CardTitle className="text-destructive">Danger Zone</CardTitle>
                            <CardDescription>
                                These actions are permanent and cannot be undone.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="destructive">Delete Account</Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
