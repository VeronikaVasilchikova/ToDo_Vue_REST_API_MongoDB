import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

Vue.component("loader", {
  template: `
    <div style="display: flex; justify-content: center; align-items: center">
      <div class='spinner-border' role='status'>
        <span class='sr-only'>Loading...</span>
      </div>
    </div>
  `
});

new Vue({
  el: "#app",
  data: {
    loading: false,
    editValue: "",
    form: {
      text: ""
    },
    tasks: []
  },
  computed: {
    canAdd() {
      return this.form.text.trim();
    }
  },
  methods: {
    async addTask() {
      const {...task} = this.form;
      const newTask = await request("/api/tasks", "POST", {...task, isCompleted: false, isEditing: false});
      this.tasks.push(newTask);
      this.form.text = "";
    },
    async editTask(id) {
      const task = this.tasks.find(item => item._id === id);
      task.text = this.editValue;
      task.isEditing = !task.isEditing;
      await request(`/api/tasks/${id}`, "PUT", task);
    },
    async completeTask(id) {
      const task = this.tasks.find(item => item._id === id);
      task.isCompleted = !task.isCompleted;
      await request(`/api/tasks/${id}`, "PUT", task);
    },
    async removeTask(id) {
      await request(`/api/tasks/${id}`, "DELETE");
      this.tasks = this.tasks.filter(item => item._id !== id);
    },
    changeEditing(id) {
      const task = this.tasks.find(item => item._id === id);
      this.editValue = task.text;
      task.isEditing = !task.isEditing;
    }
  },
  async mounted() {
    this.loading = true;
    this.tasks = await request("/api/tasks");
    this.loading = false;
  }
});

async function request(url, method = "GET", data = null) {
  try {
    const headers = {};
    let body;
    if (data) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }
    const response = await fetch(url, {
      method,
      headers,
      body
    });
    return await response.json();
  }
  catch (e) {
    console.warn("Error:", e.message);
  }
}