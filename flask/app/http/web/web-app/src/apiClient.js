import axios from 'axios';

const BASE_URI = 'http://localhost:4433';

const client = axios.create({
 baseURL: BASE_URI,
 json: true
});

class APIClient {
 constructor(accessToken) {
   this.accessToken = accessToken;
 }

 createTask(task) {
   return this.perform('post', '/tasks', task);
 }

 deleteTask(task) {
   return this.perform('delete', `/tasks/${task.id}`);
 }

 getTasks() {
   return this.perform('get', '/tasks');
 }

 async perform (method, resource, data) {
   return client({
     method,
     url: resource,
     data,
     headers: {
       Authorization: `Bearer ${this.accessToken}`
     }
   }).then(resp => {
     return resp.data ? resp.data : [];
   })
 }
}

export default APIClient;
