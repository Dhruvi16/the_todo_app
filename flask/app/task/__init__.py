class Task(object):
 def __init__(self, adapter=None):
   self.client = adapter()

 def find_all(self, selector):
   return self.client.find_all(selector)
 
 def find(self, selector):
   return self.client.find(selector)
 
 def create(self, Task):
   return self.client.create(Task)
  
 def update(self, selector, Task):
   return self.client.update(selector, Task)
  
 def delete(self, selector):
   return self.client.delete(selector)