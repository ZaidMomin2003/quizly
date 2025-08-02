
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Timer, BarChart3, Bookmark } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";


const features = [
    {
        icon: <Sparkles className="h-8 w-8 text-primary" />,
        title: "AI Quiz Generation",
        description: "Instantly generate custom quizzes on any topic, at any difficulty level. Never run out of practice material.",
        demo: <QuizDemo />
    },
    {
        icon: <Timer className="h-8 w-8 text-primary" />,
        title: "Pomodoro Focus Timer",
        description: "Integrate the proven Pomodoro technique into your study sessions to enhance focus and prevent burnout.",
        demo: <PomodoroDemo />
    },
    {
        icon: <BarChart3 className="h-8 w-8 text-primary" />,
        title: "Performance Analytics",
        description: "Track your progress with detailed analytics. Identify your weak areas and turn them into strengths.",
        demo: <AnalyticsDemo />
    },
     {
        icon: <Bookmark className="h-8 w-8 text-primary" />,
        title: "Bookmark Questions",
        description: "Save challenging questions for later review. Build a personalized library of important concepts to master.",
        demo: <BookmarkDemo />
    },
]

export function Features() {
  return (
    <section id="features" className="w-full py-12 lg:py-24 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
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
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-2 mt-12">
            {features.map((feature, index) => (
                <Card key={index} className="h-full flex flex-col">
                    <CardHeader className="flex flex-row items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">{feature.icon}</div>
                        <div className="flex-1">
                            <CardTitle>{feature.title}</CardTitle>
                            <CardDescription>{feature.description}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex items-center justify-center p-6 bg-background rounded-b-lg">
                        {feature.demo}
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}


function QuizDemo() {
    return (
        <Card className="w-full max-w-sm shadow-md">
            <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2"><Sparkles className="h-5 w-5 text-yellow-400" />Create a Quiz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-1">
                    <Label htmlFor="topic">Topic</Label>
                    <Input id="topic" defaultValue="Thermodynamics" />
                </div>
                 <div className="space-y-1">
                    <Label htmlFor="questions">Number of Questions</Label>
                    <Input id="questions" type="number" defaultValue={5} />
                </div>
                <Button className="w-full">Generate Quiz</Button>
            </CardContent>
        </Card>
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
        <Card className="w-full max-w-sm shadow-md">
            <CardHeader>
                <CardTitle>Subject Mastery</CardTitle>
                <CardDescription>Your accuracy by subject</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
        </Card>
    )
}

function BookmarkDemo() {
    return (
        <div className="w-full max-w-sm space-y-3">
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

