from app.db.mongo import db
from datetime import datetime
from bson import ObjectId
from uuid import uuid4
from app.schema.quiz import QuizCreateSchema, QuizSchema, QuizSubmissionSchema

# TODO : Create a base to abstract common DB operations


def get_quiz_by_id(quiz_id):
    return db.quizzes.find_one(
        {
            "_id": ObjectId(quiz_id),
        }
    )


def normalize_answer(answer):
    return str(answer).strip().lower()


def evaluate_quiz(quiz, answers):
    score = 0
    total_points = 0
    correct_questions = []

    for question in quiz["questions"]:
        qid = question["id"]
        expected = question["answer"]
        actual = answers.get(qid)
        total_points += question.get("points", 1)

        if not actual:
            continue

        is_correct = normalize_answer(actual) == normalize_answer(expected)
        if is_correct:
            score += question.get("points", 1)
            correct_questions.append(qid)

    return {
        "score": score,
        "total": total_points,
        "correct_questions": correct_questions,
    }


def create_quiz(quiz: QuizCreateSchema, admin_id):
    now = datetime.utcnow()

    questions = []
    for question in quiz.questions:
        questions.append({"id": str(uuid4()), **question.dict()})

    doc = {
        "title": quiz.title,
        "questions": questions,
        "created_by": admin_id,
        "created_at": now,
        "updated_at": now,
        "is_deleted": False,
    }

    result = db.quizzes.insert_one(doc)
    return str(result.inserted_id)


def list_quizzes(filters=None, exclude_question=True):
    if not filters:
        filters = {}

    source = {"title": 1, "created_at": 1, "updated_at": 1, "created_by": 1}

    if not exclude_question:
        source["questions"] = 1

    quizzes = db.quizzes.find(
        {
            "is_deleted": False,
            **filters,
        },
        source,
    )

    quizzes_dict = []
    for quiz in quizzes:
        quizzes_dict.append(
            {
                "id": str(quiz["_id"]),
                "title": quiz["title"],
                "created_by": quiz["created_by"],
                "created_at": quiz["created_at"].isoformat(),
                "updated_at": quiz["updated_at"].isoformat(),
            }
        )

    return quizzes_dict
