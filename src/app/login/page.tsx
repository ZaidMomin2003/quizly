
'use client';

import { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Lightbulb,
  TrendingUp,
  Timer,
  BookOpenCheck,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Login successful with:', { email, password });
      setLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-secondary p-4">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-primary/30 absolute top-[-6rem] -z-10 right-[-8rem] h-[18rem] w-[18rem] rounded-full blur-[10rem] sm:w-[30rem] sm:h-[30rem]"></div>
        <div className="bg-primary/20 absolute top-[-1rem] -z-10 left-[-35rem] h-[18rem] w-[22rem] rounded-full blur-[10rem] sm:w-[30rem] sm:h-[30rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>
      </div>
      <div className="z-10 w-full max-w-6xl">
        <div className="bg-card/60 overflow-hidden rounded-2xl shadow-2xl backdrop-blur-lg border border-border/20">
          <div className="grid min-h-[700px] lg:grid-cols-2">
            {/* Left Side */}
            <div className="brand-side relative hidden lg:block m-4 rounded-xl bg-cover p-12 text-white" style={{backgroundImage: "url('https://placehold.co/800x1200.png')", backgroundPosition: 'center'}} data-ai-hint="education study">
              <div className="absolute inset-0 bg-primary/80 rounded-xl"></div>
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                    <div className="mb-12 text-2xl font-bold uppercase">
                    QuizlyAI
                    </div>
                    <h1 className="mb-4 text-5xl font-light leading-tight">
                    Master Your Exams, One Quiz at a Time.
                    </h1>
                    <p className="mb-12 text-lg opacity-80">
                    Join thousands of aspirants who trust QuizlyAI to sharpen their knowledge and ace their exams.
                    </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Lightbulb size={16} />,
                      title: 'AI Quiz Generation',
                      desc: 'Personalized quizzes on any topic.',
                    },
                    {
                      icon: <TrendingUp size={16} />,
                      title: 'Performance Analytics',
                      desc: 'Track progress and identify weak spots.',
                    },
                    {
                      icon: <Timer size={16} />,
                      title: 'Pomodoro Timer',
                      desc: 'Stay focused during study sessions.',
                    },
                    {
                      icon: <BookOpenCheck size={16} />,
                      title: 'Detailed Explanations',
                      desc: 'Understand the concepts behind answers.',
                    },
                  ].map(({ icon, title, desc }, i) => (
                    <div
                      key={i}
                      className="flex items-center"
                    >
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-sm">
                        {icon}
                      </div>
                      <div>
                        <div className="font-semibold">{title}</div>
                        <div className="text-sm opacity-80">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <div className="mx-auto w-full max-w-md">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-light uppercase text-foreground">
                    Welcome Back
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Sign in to continue your learning journey.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium uppercase text-muted-foreground"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full rounded-lg border border-input bg-input py-3 pr-3 pl-10 text-sm placeholder:text-muted-foreground"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium uppercase text-muted-foreground"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full rounded-lg border border-input bg-input py-3 pr-12 pl-10 text-sm placeholder:text-muted-foreground"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm text-muted-foreground">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                      />
                      <span className="ml-2">Remember me</span>
                    </label>
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="relative flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 disabled:opacity-70"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="ml-2">Signing in...</span>
                      </>
                    ) : (
                      'Sign in to your account'
                    )}
                  </button>

                  <div className="relative text-center text-sm text-muted-foreground">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <span className="relative bg-card px-2">Or continue with</span>
                  </div>

                  <div>
                     <button
                      type="button"
                      className="flex w-full items-center justify-center rounded-lg border border-input bg-secondary px-4 py-2.5 text-sm text-secondary-foreground shadow-sm hover:bg-accent"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden="true">
                        <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.38 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"></path>
                        <path fill="#34A853" d="M24 46c6.48 0 11.93-2.13 15.89-5.81l-7.11-5.52c-2.17 1.45-4.92 2.3-8.78 2.3-6.76 0-12.47-4.55-14.51-10.61H2.26v5.7C6.22 40.58 14.48 46 24 46z"></path>
                        <path fill="#FBBC05" d="M9.49 27.28c-.45-1.36-.7-2.8-.7-4.28s.25-2.92.7-4.28V12.98H2.26C.86 15.82 0 19.8 0 24c0 4.2.86 8.18 2.26 11.02l7.23-5.74z"></path>
                        <path fill="#EA4335" d="M24 9.4c3.54 0 6.63 1.22 9.12 3.56l6.3-6.3C35.91 2.85 30.48 0 24 0 14.48 0 6.22 5.42 2.26 12.98l7.23 5.74c2.04-6.06 7.75-10.61 14.51-10.61z"></path>
                      </svg>
                      <span className="ml-2">Google</span>
                    </button>
                  </div>
                </form>

                <div className="mt-8 text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" className="font-semibold text-primary hover:underline">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

