from ..task import Task
from ..task.mongo import MongoTask
from .schema import TaskSchema

class Service(object):
 def __init__(self, user_id, task_client=Task(adapter=MongoTask)):
   self.task_client = task_client
   self.user_id = user_id

   if not user_id:
     raise Exception("user id not provided")

 def find_all_Tasks(self):
   Tasks  = self.task_client.find_all({'user_id': self.user_id})
   return [self.dump(task) for task in Tasks]

 def find_task(self, task_id):
   task = self.task_client.find({'user_id': self.user_id, 'task_id': task_id})
   return self.dump(task)

 def create_task_for(self, newTask):
   self.task_client.create(self.prepare_task(newTask))
   return self.dump(newTask.data)

 def update_task_with(self, task_id, newTask):
   records_affected = self.task_client.update({'user_id': self.user_id, 'task_id': task_id}, self.prepare_task(newTask))
   return records_affected > 0

 def delete_task_for(self, task_id):
   records_affected = self.task_client.delete({'user_id': self.user_id, 'task_id': task_id})
   return records_affected > 0

 def dump(self, data):
   return TaskSchema(exclude=['_id']).dump(data).data

 def prepare_task(self, newTask):
   data = newTask.data
   data['user_id'] = self.user_id
   return data 