from app.resources.auth import LoginResource
from app.resources.quiz import QuizResource, QuizDetailsResource, QuizSubmissionResource


def register_routes(api):
    api.add_resource(LoginResource, "/api/auth/login")
    api.add_resource(QuizResource, "/api/quizzes")
    api.add_resource(QuizDetailsResource, "/api/quizzes/<string:quiz_id>")
    api.add_resource(QuizSubmissionResource, "/api/quizzes/<string:quiz_id>/submit")
