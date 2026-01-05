from flask_restful import Resource

class QuizResource(Resource):
  def get(self):
    return {
      "data": []
    }, 200
  
  def post(self):
    return {
      "id": "quiz_id"
    }, 201
  

class QuizDetailsResource(Resource):
  def get(self, quiz_id):
    return {}, 200
  
class QuizSubmissionResource(Resource):
  def post(self, quiz_id):
    return {
      "score": 1,
      "total": 10,
      "correct_question": []
    }, 200