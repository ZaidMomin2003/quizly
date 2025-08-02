
'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Progress } from "../ui/progress";
import { PenSquare, Lightbulb, TimerIcon, BarChart, Bookmark, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn(
    "rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg",
    "transform-gpu transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-2xl",
    className
  )}>
    {children}
  </div>
);

const QuizDemo = () => (
    <GlassCard className="p-6 h-full">
        <div className="flex items-center gap-2 mb-2">
            <PenSquare className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">AI Quiz Generation</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Generate custom quizzes on any topic.</p>
        <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-md">
                <span>Thermodynamics</span>
                <Badge variant="outline">Physics</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-md">
                <span>Organic Chemistry</span>
                 <Badge variant="outline">Chemistry</Badge>
            </div>
        </div>
        <Button size="sm" className="w-full mt-4">Generate Quiz</Button>
    </GlassCard>
);

const PomodoroDemo = () => (
    <GlassCard className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-2">
            <TimerIcon className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Pomodoro Timer</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Stay focused with integrated study timers.</p>
        <div className="flex-1 flex flex-col items-center justify-center bg-white/5 rounded-lg p-4">
             <div className="text-5xl font-bold font-mono text-white">24:17</div>
             <p className="text-sm text-muted-foreground mt-1">Solve Kinematics Problems</p>
        </div>
    </GlassCard>
);

const TrackingDemo = () => (
    <GlassCard className="p-6 h-full">
        <div className="flex items-center gap-2 mb-2">
            <BarChart className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Progress Tracking</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Visualize your strengths and weaknesses.</p>
        <div className="space-y-4">
            <div>
                <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium">Physics</span>
                    <span className="text-muted-foreground">78%</span>
                </div>
                <Progress value={78} />
            </div>
            <div>
                 <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-medium">Chemistry</span>
                    <span className="text-muted-foreground">62%</span>
                </div>
                <Progress value={62} />
            </div>
        </div>
    </GlassCard>
);

const BookmarkDemo = () => (
    <GlassCard className="p-6 h-full">
         <div className="flex items-center gap-2 mb-2">
            <Bookmark className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Bookmark Questions</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Save tough questions for later review.</p>
        <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 p-3 bg-white/5 rounded-md">
                <Checkbox id="q1" checked className="mt-1" />
                <label htmlFor="q1" className="flex-1 text-white">What is the Doppler effect and how does it apply to light waves?</label>
            </div>
             <div className="flex items-start gap-3 p-3 bg-white/5 rounded-md">
                <Checkbox id="q2" className="mt-1" />
                <label htmlFor="q2" className="flex-1 text-white">Explain the concept of electrophilic substitution in benzene.</label>
            </div>
        </div>
    </GlassCard>
);


const features = [
    {
        icon: <PenSquare className="h-8 w-8 text-primary" />,
        title: "AI-Powered Quiz Generation",
        description: "Generate limitless multiple-choice questions on any topic, at any difficulty level. Our AI crafts unique questions every time to ensure you never run out of practice material.",
        demo: <QuizDemo />
    },
    {
        icon: <Lightbulb className="h-8 w-8 text-primary" />,
        title: "Identify Weak Concepts",
        description: "Our platform analyzes your performance to identify the specific topics and concepts where you need the most improvement, helping you focus your study time effectively.",
        demo: <TrackingDemo />
    },
     {
        icon: <TimerIcon className="h-8 w-8 text-primary" />,
        title: "Integrated Pomodoro Timer",
        description: "Boost your productivity and avoid burnout with the built-in Pomodoro timer. Break down your study sessions into focused intervals with short breaks.",
        demo: <PomodoroDemo />
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
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
            The Ultimate Toolkit for NEET/JEE Success
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl">
            QuizlyAI provides everything you need to conquer competitive exams, from infinite practice questions to intelligent performance tracking.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {features.map((feature, index) => (
                <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center even:lg:flex-row-reverse">
                    <div className="lg:col-span-1 even:lg:order-2">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                               {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                        </div>
                        <p className="mt-4 text-muted-foreground">{feature.description}</p>
                    </div>
                    <div className="lg:col-span-1 even:lg:order-1">
                        {feature.demo}
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
