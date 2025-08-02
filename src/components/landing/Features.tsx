
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
    <section id="features" className="w-full py-12 lg:py-24 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Everything You Need to Succeed
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform is packed with powerful, AI-driven tools designed to make your study sessions more effective and efficient.
            </p>
          </div>
        </div>
        <div className="space-y-16">
            {features.map((feature, index) => (
                <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className={cn("space-y-4", index % 2 === 1 && "lg:order-2")}>
                        <div className="p-3 bg-primary/10 rounded-full w-fit">{feature.icon}</div>
                        <h3 className="text-2xl font-bold">{feature.title}</h3>
                        <p className="text-muted-foreground text-lg">{feature.description}</p>
                    </div>
                    <div className={cn("flex items-center justify-center", index % 2 === 1 && "lg:order-1")}>
                        <BrowserMockup>{feature.demo}</BrowserMockup>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}

function BrowserMockup({ children }: { children: React.ReactNode }) {
    return (
        <div className="border bg-background/50 rounded-xl shadow-2xl w-full max-w-lg">
            <div className="p-2 border-b flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="p-6 bg-background rounded-b-xl">
                {children}
            </div>
        </div>
    )
}


function QuizDemo() {
    return (
        <div className="w-full space-y-4">
            <h4 className="font-semibold text-lg flex items-center gap-2"><Sparkles className="h-5 w-5 text-yellow-400" />Create a Quiz</h4>
            <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input id="topic" defaultValue="Thermodynamics" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="questions">Number of Questions</Label>
                <Input id="questions" type="number" defaultValue={5} />
            </div>
            <Button className="w-full">Generate Quiz</Button>
        </div>
    )
}

function PomodoroDemo() {
    return (
        <div className="text-center space-y-4 p-4">
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
                    <h2 className="text-4xl font-bold">20:00</h2>
                    <p className="text-muted-foreground uppercase tracking-widest text-xs">WORK</p>
                </div>
            </div>
            <p className="font-semibold text-lg">Solving Kinematics Problems</p>
            <div className="flex gap-4 justify-center">
                <Button>Pause</Button>
                <Button variant="outline">Reset</Button>
            </div>
        </div>
    )
}


function AnalyticsDemo() {
    return (
        <div className="w-full space-y-4">
            <h4 className="font-semibold text-lg">Subject Mastery</h4>
            <p className="text-sm text-muted-foreground">Your accuracy by subject</p>
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

function BookmarkDemo() {
    return (
        <div className="w-full space-y-3">
             <h4 className="font-semibold text-lg mb-4">Bookmarked Questions</h4>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium truncate pr-4">What is the powerhouse of the cell?</p>
                <Bookmark className="h-5 w-5 text-primary fill-primary" />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium truncate pr-4">Explain Newton's Second Law.</p>
                <Bookmark className="h-5 w-5 text-primary" />
            </div>
             <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium truncate pr-4">What is the formula for Benzene?</p>
                 <Bookmark className="h-5 w-5 text-primary" />
            </div>
        </div>
    )
}
