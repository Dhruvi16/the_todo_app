from marshmallow import Schema, fields

class TaskSchema(Schema):
  id = fields.Int(required=True)
  task_name = fields.Str(required=True)
  location = fields.Str()
  time = fields.DateTime(required=True)
  canvas = fields.Str()

class UserSchema(TaskSchema):
  user_id = fields.Email(required=True)