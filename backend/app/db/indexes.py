from pymongo import ASCENDING


def ensure_indexes(db):
    db.quizzes.create_index(
        [
            ("title", ASCENDING),
        ],
        unique=True,
        name="uniq_quiz_title",
    )
