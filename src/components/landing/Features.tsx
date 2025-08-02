
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Timer, BarChart3, Bookmark } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";


const features = [
    {
        icon: <Sparkles className="h-8 w-8 text-primary" />,
        title: "AI Quiz Generation",
        description: "Instantly generate custom quizzes on any topic, at any difficulty level. Never run out of practice material again. Our AI adapts to your learning style.",
        demo: <QuizDemo />
    },
    {
        icon: <Timer className="h-8 w-8 text-primary" />,
        title: "Pomodoro Focus Timer",
        description: "Integrate the proven Pomodoro technique into your study sessions to enhance focus, manage your time effectively, and prevent mental burnout.",
        demo: <PomodoroDemo />
    },
    {
        icon: <BarChart3 className="h-8 w-8 text-primary" />,
        title: "Performance Analytics",
        description: "Track your progress with detailed, easy-to-understand analytics. Pinpoint your weak areas with precision and receive recommendations to turn them into strengths.",
        demo: <AnalyticsDemo />
    },
     {
        icon: <Bookmark className="h-8 w-8 text-primary" />,
        title: "Bookmark Questions",
        description: "Save challenging or important questions for later review. Build a personalized library of key concepts to ensure you have them mastered for exam day.",
        demo: <BookmarkDemo />
    },
]

export function Features() {
  return (
    <section id="features" className="w-full py-12 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              AI Tool That Delivers Real Results
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our proven methods help you climb the ranks faster than ever, with no technical skills required.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GlassCard className="lg:col-span-2">
                <QuizDemo />
            </GlassCard>
            <GlassCard>
                <PomodoroDemo />
            </GlassCard>
            <GlassCard>
                <AnalyticsDemo />
            </GlassCard>
        </div>

        <div className="mt-16 text-center">
             <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm font-semibold">
              Proven Results
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline mt-2">
              You Can Trust
            </h2>
            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                From startups to industry leaders, we've helped students achieve remarkable results in record time.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
                <GlassCard>
                    <div className="p-6">
                        <p className="text-4xl font-bold text-primary">95%</p>
                        <p className="text-muted-foreground mt-2">Average Score Improvement</p>
                    </div>
                </GlassCard>
                <GlassCard>
                     <div className="p-6">
                        <p className="text-4xl font-bold text-primary">50K+</p>
                        <p className="text-muted-foreground mt-2">Questions Answered</p>
                    </div>
                </GlassCard>
                <GlassCard>
                     <div className="p-6">
                        <p className="text-4xl font-bold text-primary">10K+</p>
                        <p className="text-muted-foreground mt-2">Active Students</p>
                    </div>
                </GlassCard>
            </div>
        </div>
      </div>
    </section>
  );
}

function GlassCard({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn(
            "rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg shadow-lg",
            "bg-clip-padding backdrop-filter",
            className
        )}>
            {children}
        </div>
    )
}


function QuizDemo() {
    return (
        <div className="w-full p-6 space-y-4 flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1">
                <h4 className="font-semibold text-xl flex items-center gap-2 font-headline"><Sparkles className="h-5 w-5 text-yellow-400" />Create a Quiz</h4>
                <p className="text-muted-foreground mt-2">Generate a quiz on any topic in seconds. The more specific, the better.</p>
            </div>
            <div className="flex-1 w-full">
                <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Input id="topic" defaultValue="Thermodynamics" />
                </div>
                <div className="space-y-2 mt-4">
                    <Label htmlFor="questions">Number of Questions</Label>
                    <Input id="questions" type="number" defaultValue={5} />
                </div>
                <Button className="w-full mt-4">Generate Quiz</Button>
            </div>
        </div>
    )
}

function PomodoroDemo() {
    return (
        <div className="text-center space-y-4 p-4">
            <h4 className="font-semibold text-lg font-headline">Pomodoro Timer</h4>
            <div className="relative w-36 h-36 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle className="text-muted/20" strokeWidth="7" cx="50" cy="50" r="45" fill="transparent"></circle>
                    <circle
                        className="text-primary"
                        strokeWidth="7"
                        strokeDasharray="283"
                        strokeDashoffset={283 - (20*60) / (25 * 60) * 283}
                        cx="50"
                        cy="50"
                        r="45"
                        fill="transparent"
                        transform="rotate(-90 50 50)"
                    ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-bold font-mono">20:00</h2>
                    <p className="text-muted-foreground uppercase tracking-widest text-xs">WORK</p>
                </div>
            </div>
        </div>
    )
}


function AnalyticsDemo() {
    return (
        <div className="w-full space-y-4 p-4">
            <h4 className="font-semibold text-lg font-headline">Subject Mastery</h4>
            <div className="space-y-4 pt-2">
                 <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium"><span>Physics</span><span>85%</span></div>
                    <Progress value={85} indicatorClassName="bg-blue-500" />
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium"><span>Chemistry</span><span>62%</span></div>
                    <Progress value={62} indicatorClassName="bg-red-500" />
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium"><span>Biology</span><span>95%</span></div>
                    <Progress value={95} indicatorClassName="bg-green-500" />
                 </div>
            </div>
        </div>
    )
}
