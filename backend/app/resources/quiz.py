from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity
from pymongo.errors import DuplicateKeyError
from pydantic import ValidationError
from app.services.quiz import list_quizzes, create_quiz, get_quiz, evaluate_quiz
from app.schema.quiz import (
    QuizSchema,
    QuizCreateSchema,
    QuizSubmissionSchema,
)


class QuizResource(Resource):
    def get(self):
        quizzes = list_quizzes()
        return {"data": quizzes}, 200

    @jwt_required()
    def post(self):
        try:
            claims = get_jwt()
            if claims.get("role") != "admin":
                return {"error": "Admin privileges required"}, 403
            payload = QuizCreateSchema(**request.get_json())
            inserted_id = create_quiz(payload, get_jwt_identity())
            return {"id": inserted_id}, 201
        except ValidationError as error:
            return error.errors(), 400
        except DuplicateKeyError:
            return {"error": "Quiz with the same title already exists"}, 409


class QuizDetailsResource(Resource):
    def get(self, quiz_id):
        quiz = get_quiz(quiz_id)

        if not quiz:
            return {"error": "Quiz not found"}, 404

        return {
            "id": str(quiz["_id"]),
            "title": quiz["title"],
            "questions": [
                {
                    "id": question["id"],
                    "type": question["type"],
                    "question": question["question"],
                    "options": question.get("options", []),
                    "points": question.get("points", 1),
                }
                for question in quiz["questions"]
            ],
            "created_by": quiz["created_by"],
            "created_at": quiz["created_at"].isoformat(),
            "updated_at": quiz["updated_at"].isoformat(),
            "is_deleted": quiz["is_deleted"],
        }, 200


class QuizSubmissionResource(Resource):
    def post(self, quiz_id):
        try:
            payload = QuizSubmissionSchema(**request.get_json())
        except ValidationError as error:
            return error.errors(), 400

        quiz = get_quiz(quiz_id)

        if not quiz:
            return {"error": "Quiz not found"}, 404

        result = evaluate_quiz(quiz, answers=payload.answers)
        return result, 200
