'use server';

import {
  recommendPracticeQuiz,
  type RecommendPracticeQuizOutput,
} from '@/ai/flows/recommend-practice-quiz';

export async function getRecommendation(): Promise<RecommendPracticeQuizOutput> {
  // In a real app, this data would be fetched from a database.
  // For now, we'll use mock data.
  const mockInput = {
    performanceAnalytics:
      'Average score is 78%. Weakest in Physics (65%). Strongest in Biology (95%).',
    recentActivity:
      'Last quizzes taken: Organic Chemistry, Kinematics, Cell Biology. Has not practiced Thermodynamics recently.',
    subjectProgress:
      'Physics: 75% complete. Chemistry: 60% complete. Biology: 85% complete.',
  };

  try {
    const recommendation = await recommendPracticeQuiz(mockInput);
    return recommendation;
  } catch (error) {
    console.error('Error getting recommendation:', error);
    throw new Error('Failed to get AI recommendation.');
  }
}
