from pydantic import BaseModel, Field, model_validator
from pydantic_core import PydanticCustomError
from typing import List, Optional, Union, Literal, Dict
from datetime import datetime

QuestionType = Literal["mcq", "boolean"]  # extend as required
OptionType = List[str]
AnswerType = Union[str, bool]


class QuestionSchema(BaseModel):
    type: QuestionType = Field(..., description="Type of question")
    question: str = Field(
        ..., min_length=1, max_length=1000, description="Question text"
    )
    options: Optional[OptionType] = Field(
        default_factory=list, description="Available options for the question"
    )
    answer: AnswerType = Field(
        ...,
        description="Correct answer(s) - can be single string or boolean",
    )
    points: int = Field(
        default=1, ge=1, le=100, description="Points awarded for correct answer"
    )

    @model_validator(mode="after")
    def validate_by_type(self):
        if self.type == "mcq":
            if not self.options or len(self.options) < 2:
                raise PydanticCustomError(
                    "invalid_mcq_options", "MCQ must have atleast 2 options"
                )
            if not isinstance(self.answer, str):
                raise PydanticCustomError(
                    "invalid_mcq_answer", "MCQ answer must be a string"
                )
            if self.answer not in self.options:
                raise PydanticCustomError(
                    "invalid_mcq_answer", "MCQ answer must be one of the options"
                )
        elif self.type == "boolean":
            if self.options is not None:
                raise PydanticCustomError(
                    "invalid_boolean_options", "Boolean question must not have options"
                )
            if not isinstance(self.answer, bool):
                raise PydanticCustomError(
                    "invalid_boolean_answer", "Boolean answer must be true or false"
                )
        return self


class QuizSchema(BaseModel):
    title: str = Field(
        ..., min_length=1, max_length=200, description="Title of the quiz"
    )
    questions: List[QuestionSchema] = Field(
        ..., min_items=1, description="List of questions in the quiz"
    )
    created_by: str
    is_deleted: bool
    created_at: datetime
    updated_at: datetime


class QuizCreateSchema(BaseModel):
    title: str = Field(
        ..., min_length=1, max_length=200, description="Title of the quiz"
    )
    questions: List[QuestionSchema] = Field(
        ..., min_items=1, description="List of questions in the quiz"
    )


class QuizSubmissionSchema(BaseModel):
    answers: Dict[str, AnswerType]
