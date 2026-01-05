import { useCallback, useState } from "react";
import type { QuizCreatePayload, QuizQuestion, QuizType } from "../quiz.types";
import { useCreateQuizMutation } from "../store/quiz.api";
import { toast } from "react-toastify";

export function useQuizCreator() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [createQuizMutation] = useCreateQuizMutation();
  const [errors, setErrors] = useState<string[]>([]);

  const _resolveOptions = useCallback(
    (type: QuizType): QuizQuestion["options"] => {
      // This can grow as we add more question types
      switch (type) {
        case "mcq":
          return ["", ""];
        default:
          return [];
      }
    },
    []
  );

  const _resolveAnswer = useCallback(
    (type: QuizType): QuizQuestion["answer"] => {
      // This can grow as we add more question types
      switch (type) {
        case "mcq":
          return "";
        case "boolean":
          return false;
        default:
          return "";
      }
    },
    []
  );

  const addQuestion = useCallback((type: QuizType) => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      type,
      question: "",
      options: _resolveOptions(type),
      answer: _resolveAnswer(type),
      points: 1,
    };
    setQuestions((prev) => [...prev, newQuestion]);
  }, []);

  const updateQuestion = useCallback(
    (id: string, field: keyof QuizQuestion, value: unknown) => {
      setQuestions((prev) => {
        return prev.map((question) =>
          question.id === id ? { ...question, [field]: value } : question
        );
      });
    },
    []
  );

  const removeQuestion = useCallback((id: string) => {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
  }, []);

  const updateOptions = useCallback(
    (questionId: string, optionIndex: number, value: string) => {
      setQuestions((prev) => {
        return prev.map((question) => {
          if (question.id === questionId) {
            const updatedOptions = [...question.options];
            updatedOptions[optionIndex] = value;
            return { ...question, options: updatedOptions };
          }
          return question;
        });
      });
    },
    []
  );

  const addOption = useCallback((questionId: string) => {
    setQuestions((prev) => {
      return prev.map((question) => {
        if (question.id === questionId) {
          const updatedOptions = [...question.options, ""];
          return { ...question, options: updatedOptions };
        }
        return question;
      });
    });
  }, []);

  const removeOption = useCallback(
    (questionId: string, optionIndex: number) => {
      setQuestions((prev) => {
        return prev.map((question) => {
          if (question.id === questionId) {
            const updatedOptions = question.options.filter(
              (_, index) => index !== optionIndex
            );
            return { ...question, options: updatedOptions };
          }
          return question;
        });
      });
    },
    []
  );

  const validateQuiz = useCallback(() => {
    const errors: string[] = [];
    if (title.trim() === "") {
      errors.push("Quiz title cannot be empty.");
    }
    if (questions.length === 0) {
      errors.push("At least one question is required.");
    }
    questions.forEach((question, qIndex) => {
      if (question.question.trim() === "") {
        errors.push(`Question ${qIndex + 1} text cannot be empty.`);
      }
      if (question.points <= 0) {
        errors.push(`Question ${qIndex + 1} must have positive points.`);
      }
      if (question.type === "mcq") {
        const options = question.options || [];
        if (options.length < 2) {
          errors.push(`Question ${qIndex + 1} must have at least two options.`);
        }
        options.forEach((option, oIndex) => {
          if (option.trim() === "") {
            errors.push(
              `Option ${oIndex + 1} of Question ${qIndex + 1} cannot be empty.`
            );
          }
        });
        if (!options.includes(question.answer as string)) {
          errors.push(
            `Correct answer of Question ${
              qIndex + 1
            } must be one of the options.`
          );
        }
      }
      if (question.type === "boolean") {
        if (typeof question.answer !== "boolean") {
          errors.push(
            `Correct answer of Question ${qIndex + 1} must be True or False.`
          );
        }
      }
    });
    return errors;
  }, [title, questions]);

  const createQuiz = useCallback(async () => {
    const errors = validateQuiz();
    setErrors(errors);
    if (errors.length > 0) {
      toast.error("Please fix the errors before creating the quiz.");
      return;
    }

    const payload: QuizCreatePayload = {
      title,
      questions,
    };

    try {
      const result = await createQuizMutation(payload).unwrap();
      if (result && result.id) {
        toast.success("Quiz created successfully!");
        // Optionally, reset the form or navigate
        setTitle("");
        setQuestions([]);
      }
    } catch (error) {
      toast.error("Failed to create quiz. Please try again.");
    }
  }, [title, questions, createQuizMutation, validateQuiz]);

  return {
    title,
    setTitle,
    questions,
    setQuestions,
    addQuestion,
    createQuiz,
    updateQuestion,
    removeQuestion,
    addOption,
    removeOption,
    updateOptions,
    errors,
    setErrors,
  };
}
