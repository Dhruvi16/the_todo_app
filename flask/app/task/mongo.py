import os
from pymongo import MongoClient

COLLECTION_NAME = 'tasks'

class MongoRepository(object):
 def __init__(self):
   mongo_url = os.environ.get('MONGO_URL')
   self.db = MongoClient(mongo_url).tasks

 def find_all(self, selector):
   return self.db.tasks.find(selector)
 
 def find(self, selector):
   return self.db.tasks.find_one(selector)
 
 def create(self, task):
   return self.db.tasks.insert_one(task)

 def update(self, selector, task):
   return self.db.tasks.replace_one(selector, task).modified_count
 
 def delete(self, selector):
   return self.db.tasks.delete_one(selector).deleted_count
