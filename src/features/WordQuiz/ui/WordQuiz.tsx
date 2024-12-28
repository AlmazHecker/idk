"use client";
import React, { FC, useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@ui/card";
import { Progress } from "@ui/progress";
import QuizQuestion from "@/src/features/WordQuiz/ui/QuizQuestion";
import QuizResults from "@/src/features/WordQuiz/ui/QuizResults";
import { Word } from "@prisma/client";

export const shuffleArray = <T,>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

type WordQuizProps = {
  words: Word[];
  difficulty?: string;
};
const WordQuiz: FC<WordQuizProps> = ({ words, difficulty }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const currentQuestion = words[currentQuestionIndex];

  const getOptions = (correctAnswer: string): string[] => {
    const otherOptions = words
      .filter((word) => word.translation !== correctAnswer)
      .map((word) => word.translation);

    const randomIncorrect = shuffleArray(otherOptions).slice(0, 2);

    const options = [correctAnswer, ...randomIncorrect];

    return shuffleArray(options);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (!currentQuestion) return;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    if (currentQuestionIndex <= words.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const renderContent = () => {
    return (
      <Card>
        <CardHeader>
          <div>
            Question {currentQuestionIndex} / {words.length}
          </div>
          <Progress value={(currentQuestionIndex / words.length) * 100} />
        </CardHeader>

        <CardContent>
          {currentQuestionIndex > words.length - 1 && (
            <QuizResults
              score={score}
              resetQuiz={resetQuiz}
              questionsCount={currentQuestionIndex}
            />
          )}
          {currentQuestion && (
            <QuizQuestion
              data={{
                text: `What is the translation of "${currentQuestion.word}"?`,
                options: getOptions(currentQuestion.translation),
                answer: currentQuestion.translation,
              }}
              save={handleAnswer}
            />
          )}
        </CardContent>
      </Card>
    );
  };

  return renderContent();
};

export default WordQuiz;
