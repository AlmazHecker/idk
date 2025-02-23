import React, { useState } from "react";
import { Label } from "@ui/label";
import { Button } from "@ui/button";
import { Separator } from "@ui/separator";
import { CheckCircle, CircleX } from "lucide-react";
import { cn } from "@shared/lib/utils";

interface QuizQuestionProps {
  data: {
    text: string;
    options: string[];
    answer: string;
  };
  save: (isCorrect: boolean) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = (props) => {
  const [answer, setAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const submitAnswer = () => {
    if (!answer) {
      alert("Please select an answer before submitting!");
      return;
    }
    setSubmitted(true);
  };

  const nextQuestion = () => {
    props.save(answer === props.data.answer);
    setAnswer("");
    setSubmitted(false);
  };

  const isCorrectAnswer = (option: string): boolean =>
    option === props.data.answer;
  const isSelectedAnswer = (option: string): boolean => option === answer;

  const getOptionClassName = (option: string): string => {
    if (submitted && isSelectedAnswer(option)) {
      return isCorrectAnswer(option) ? "bg-green-500" : "bg-red-500";
    }
    return isSelectedAnswer(option) ? "border-[#aaa] bg-slate-800" : "";
  };
  return (
    <div className="flex flex-col">
      <Label className="text-3xl mb-4">{props.data.text}</Label>
      {props.data.options.map((option, index) => (
        <Button
          key={index}
          variant="outline"
          className={cn(
            getOptionClassName(option),
            "border px-2 py-2 mt-1 mb-1 rounded-sm flex justify-between items-center cursor-pointer",
          )}
          onClick={() => !submitted && setAnswer(option)} // Allow selection only if not submitted
        >
          <span>{option}</span>
          {submitted && isCorrectAnswer(option) && (
            <CheckCircle size={20} color="#0cde0c" />
          )}
          {submitted &&
            isSelectedAnswer(option) &&
            !isCorrectAnswer(option) && <CircleX size={20} color="#de3c3c" />}
        </Button>
      ))}
      <Separator className="my-2" />
      {submitted ? (
        <Button className="mt-1" onClick={nextQuestion}>
          Next
        </Button>
      ) : (
        <Button className="mt-1" onClick={submitAnswer}>
          Submit
        </Button>
      )}
    </div>
  );
};

export default QuizQuestion;
