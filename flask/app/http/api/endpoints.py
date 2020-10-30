from .middlewares import login_required
from flask import Flask, json, g, request
from app.todo.service import Service as Task
from app.todo.schema import TaskSchema
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/tasks", methods=["GET"])
@login_required
def index():
 return json_response(Task(g.user).find_all_tasks())


@app.route("/tasks", methods=["POST"])
@login_required
def create():
   new_task = TaskSchema().load(json.loads(request.data))
  
   if new_task.errors:
     return json_response({'error': new_task.errors}, 422)

   task = Task(g.user).create_task_for(new_task)
   return json_response(task)


@app.route("/task/<int:task_id>", methods=["GET"])
@login_required
def show(task_id):
 task = Task(g.user).find_task(task_id)

 if task:
   return json_response(task)
 else:
   return json_response({'error': 'task not found'}, 404)


@app.route("/task/<int:task_id>", methods=["PUT"])
@login_required
def update(task_id):
   new_task = TaskSchema().load(json.loads(request.data))
  
   if new_task.errors:
     return json_response({'error': new_task.errors}, 422)

   task_service = Task(g.user)
   if task_service.update_task_with(task_id, new_task):
     return json_response(new_task.data)
   else:
     return json_response({'error': 'task not found'}, 404)

  
@app.route("/task/<int:task_id>", methods=["DELETE"])
@login_required
def delete(task_id):
 task_service = Task(g.user)
 if task_service.delete_task_for(task_id):
   return json_response({})
 else:
   return json_response({'error': 'task not found'}, 404)


def json_response(payload, status=200):
 return (json.dumps(payload), status, {'content-type': 'application/json'})
