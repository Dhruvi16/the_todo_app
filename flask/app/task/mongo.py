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
 
 def create(self, kudo):
   return self.db.tasks.insert_one(kudo)

 def update(self, selector, kudo):
   return self.db.tasks.replace_one(selector, kudo).modified_count
 
 def delete(self, selector):
   return self.db.tasks.delete_one(selector).deleted_count
