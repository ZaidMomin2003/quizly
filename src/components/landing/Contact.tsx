
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
    return (
        <section id="contact" className="w-full py-12 lg:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm mb-2">
                        Contact Us
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                        Get in Touch
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto text-muted-foreground md:text-xl/relaxed">
                        We'd love to hear from you. Send us a message and we'll get back to you shortly.
                    </p>
                </div>
                <div className="max-w-xl mx-auto">
                    <form className="grid gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Enter your name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Enter your email" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="Enter your message" className="min-h-[120px]" />
                        </div>
                        <Button type="submit" size="lg">Send Message</Button>
                    </form>
                </div>
            </div>
        </section>
    )
}
