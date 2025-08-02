
'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const testimonials = [
  {
    quote: "QuizlyAI has completely transformed my NEET preparation. The AI-generated quizzes target my weak spots perfectly. My scores have improved dramatically!",
    name: "Anjali Sharma",
    title: "NEET Aspirant",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    quote: "As a JEE aspirant, time is everything. This platform's quick quiz feature allows me to practice effectively, even in short bursts. It's a game-changer.",
    name: "Rohan Gupta",
    title: "JEE Aspirant",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    quote: "The Pomodoro timer integrated into the dashboard is pure genius. It helps me stay focused and manage my study sessions without burning out.",
    name: "Priya Singh",
    title: "Medical Student",
    avatar: "https://i.pravatar.cc/150?img=3"
  }
]

export function Testimonials() {
  return (
    <div className="relative h-full flex flex-col items-center justify-center p-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-lg"
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
                <div className="text-center">
                    <blockquote className="text-2xl font-semibold leading-9 text-foreground">
                        “{testimonial.quote}”
                    </blockquote>
                    <div className="mt-8 flex items-center justify-center gap-4">
                         <Avatar>
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                    </div>
                </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  )
}
