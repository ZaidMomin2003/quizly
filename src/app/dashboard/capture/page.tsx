
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, Upload, Wand2, Loader2, AlertTriangle, X } from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { solveWithImage } from '@/ai/flows/solve-with-image-flow';

type SolverState = 'idle' | 'loading' | 'success' | 'error';

export default function CapturePage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [solution, setSolution] = useState<string | null>(null);
  const [solverState, setSolverState] = useState<SolverState>('idle');
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings.',
        });
      }
    };

    getCameraPermission();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/png');
        setImageSrc(dataUrl);
      }
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSolve = async () => {
    if (!imageSrc) return;
    setSolverState('loading');
    setSolution(null);
    setError(null);
    try {
        const result = await solveWithImage({ photoDataUri: imageSrc });
        setSolution(result.solution);
        setSolverState('success');
    } catch (err: any) {
        setError(err.message || 'An unknown error occurred.');
        setSolverState('error');
        toast({
            variant: 'destructive',
            title: 'AI Solver Error',
            description: err.message,
        });
    }
  };

  const reset = () => {
      setImageSrc(null);
      setSolution(null);
      setSolverState('idle');
      setError(null);
      if(fileInputRef.current) {
          fileInputRef.current.value = '';
      }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Camera className="h-7 w-7" />
              Capture & Solve
            </h1>
            <p className="text-muted-foreground">
              Snap a photo of a problem or upload a screenshot, and let AI solve it for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Input</CardTitle>
                <CardDescription>Use your camera or upload an image.</CardDescription>
              </CardHeader>
              <CardContent>
                {imageSrc ? (
                  <div className="space-y-4">
                    <img src={imageSrc} alt="Captured problem" className="rounded-lg w-full" />
                    <Button onClick={reset} variant="outline" className="w-full">
                        <X className="mr-2" />
                        Clear Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {hasCameraPermission === null && (
                      <div className="aspect-video w-full flex items-center justify-center bg-muted rounded-lg">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                      </div>
                    )}
                    {hasCameraPermission === false && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Camera Access Denied</AlertTitle>
                        <AlertDescription>
                          Enable camera permissions in your browser to use this feature. You can still upload an image.
                        </AlertDescription>
                      </Alert>
                    )}
                    {hasCameraPermission === true && (
                      <div className="relative">
                        <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted playsInline />
                        <canvas ref={canvasRef} className="hidden" />
                      </div>
                    )}
                    <div className="flex gap-4">
                        <Button onClick={captureImage} disabled={!hasCameraPermission} className="flex-1">
                            <Camera className="mr-2" />
                            Capture
                        </Button>
                        <Button onClick={() => fileInputRef.current?.click()} variant="secondary" className="flex-1">
                            <Upload className="mr-2" />
                            Upload
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex flex-col gap-8">
                <Button onClick={handleSolve} disabled={!imageSrc || solverState === 'loading'} size="lg" className="w-full h-16 text-lg">
                    {solverState === 'loading' ? (
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    ) : (
                        <Wand2 className="mr-2 h-6 w-6" />
                    )}
                    Solve with AI
                </Button>

                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Solution</CardTitle>
                        <CardDescription>The AI-generated step-by-step solution will appear here.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {solverState === 'loading' && (
                            <div className="flex items-center justify-center h-full">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                        )}
                        {solverState === 'error' && (
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Solver Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        {solverState === 'success' && solution && (
                            <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: solution.replace(/\n/g, '<br />') }} />
                        )}
                         {solverState === 'idle' && !solution && (
                             <div className="text-center text-muted-foreground py-8">
                                Waiting for a problem to solve...
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
