import React, { FC } from "react";
import { Button } from "@ui/button";

type QuizResultsProps = {
  score: number;
  questionsCount: number;
  resetQuiz: () => void;
};

const QuizResults: FC<QuizResultsProps> = ({
  score,
  resetQuiz,
  questionsCount,
}) => {
  return (
    <div>
      <h2 className="text-center text-xl md:text-3xl font-semibold tracking-tight">
        Quiz results
      </h2>
      <p className="text-3xl text-center mt-3 mb-6">
        {score}/{questionsCount} Questions are correct!
      </p>

      <Button onClick={resetQuiz}>Retry</Button>
    </div>
  );
};

export default QuizResults;
