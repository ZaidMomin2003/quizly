'use client';

import { useState } from 'react';
import { getRecommendation } from '@/app/actions';
import type { RecommendPracticeQuizOutput } from '@/ai/flows/recommend-practice-quiz';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Wand2, Lightbulb, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function AiRecommendationCard() {
  const [recommendation, setRecommendation] =
    useState<RecommendPracticeQuizOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendation = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendation(null);
    try {
      const result = await getRecommendation();
      setRecommendation(result);
    } catch (e) {
      setError(
        'An error occurred while fetching recommendations. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Wand2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>AI Quiz Recommendations</CardTitle>
            <CardDescription>
              Let our AI suggest what you should practice next based on your
              performance.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {recommendation && (
          <div className="space-y-4 rounded-lg border bg-background/50 p-4 shadow-inner">
            <div>
              <h4 className="font-semibold text-lg">Recommended Quizzes</h4>
              <p className="text-muted-foreground">
                {recommendation.recommendedQuizzes}
              </p>
            </div>
            <Separator />
            <div>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                <h4 className="font-semibold text-lg">Reasoning</h4>
              </div>
              <p className="text-muted-foreground italic">
                "{recommendation.reasoning}"
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGetRecommendation}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Generating...' : 'Get AI Recommendation'}
        </Button>
      </CardFooter>
    </Card>
  );
}
