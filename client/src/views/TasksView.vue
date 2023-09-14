<template>
  <section class="gradient-custom-2">
    <div class="container py-5 ">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-12 col-xl-10">

          <div class="card mask-custom">
            <div class="card-body p-4 text-white">

              <div class="filter-container">
                <div class="dropdown-container">
                  <!-- Nested Dropdown -->
                  <div class="nested-filter-dropdown" v-show="showStatusDropdown">
                    <ul>
                      <li><a href="#" @click="filterByStatus('Assigned')">Assigned</a></li>
                      <li><a href="#" @click="filterByStatus('In progress')">In progress</a></li>
                      <li><a href="#" @click="filterByStatus('Done')">Done</a></li>
                    </ul>
                  </div>
                  <div class="nested-filter-dropdown" v-show="showPriorityDropdown">
                    <ul>
                      <li><a href="#" @click="filterByPriority('High')">High</a></li>
                      <li><a href="#" @click="filterByPriority('Medium')">Medium</a></li>
                      <li><a href="#" @click="filterByPriority('Low')">Low</a></li>
                    </ul>
                  </div>
                  <div class="nested-filter-dropdown" v-show="showCategoryDropdown">
                    <ul>
                      <li><a href="#" @click="filterByCategory('Frontend')">Frontend</a></li>
                      <li><a href="#" @click="filterByCategory('Backend')">Backend</a></li>
                      <li><a href="#" @click="filterByCategory('Testing')">Testing</a></li>
                    </ul>
                  </div>
                  <div class="nested-filter-dropdown" v-show="showDueDateInput">
                    <input type="date" v-model="dueDateFilter" @input="filterByDueDate" />
                  </div>
                  <!-- Main Dropdown -->
                  <div class="filter-dropdown" v-show="showFilterDropdown">
                    <ul>
                      <li><a href="#" @click="filterByStatus('Status')">Status</a></li>
                      <li><a href="#" @click="filterByPriority('Priority')">Priority</a></li>
                      <li><a href="#" @click="filterByCategory('Category')">Category</a></li>
                      <li><a href="#" @click="filterByDueDate('DueDate')">DueDate</a></li>
                    </ul>
                  </div>
                </div>


                <div class="filter-content" @click="toggleDropdown">
                  <div class=" btn btn-outline-light filter-text"><i class="fas fa-filter fa-lg text-white"></i>Filter</div>
                </div>
              </div>

              <div class="text-center pt-3 pb-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp" alt="Check"
                  width="60">
                <h2 class="my-4">Task List</h2>
              </div>

              <!-- ADD TASK FORM - ONLY IF USER IS AMDIN -->
              <template v-if="store.state.user.isAdmin">
                <div class="d-block mb-3" id="addBtn">
                  <button type="button" class="btn btn-outline-light" @click="addForm()">
                    <i class="fas fa-plus fa-lg text-light"></i> Add new task
                  </button>
                </div>

                <div class="mb-3 d-none bg-form p-3 rounded" id="addForm">
                  <!-- add task form -->
                  <form id="newTaskForm" class="d-block justify-content-center align-items-center mb-4 mt-2">
                    <div class="form-outline w-100">
                      <label for="text">Task</label>
                      <input type="text" v-model="text" id="text" required
                        class="form-control bg-transparent border-2 text-white placeholder-white" placeholder="New task.."
                        maxlength="100" />
                    </div>
                    <div class="d-flex mt-2 me-2">
                      <div class="d-block me-2">
                        <label for="user">User</label>
                        <select class="form-select w-100 border-info me-4" style="cursor: pointer;" v-model="userId"
                          id="user" required>
                          <option value="">Select user</option>
                          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.firstName }} {{
                            user.lastName }}</option>
                        </select>
                      </div>
                      <div class="d-block me-2">
                        <label for="priority">Priority</label>
                        <select class="form-select w-100 border-info me-4" style="cursor: pointer;" v-model="priority"
                          id="priority" required>
                          <option value="">Select priority</option>
                          <option value="High">High </option>
                          <option value="Medium">Medium </option>
                          <option value="Low">Low </option>
                        </select>
                      </div>
                      <div class="d-block me-2">
                        <label for="category">category</label>
                        <select class="form-select w-100 border-info me-4" style="cursor: pointer;" v-model="category"
                          id="category" required>
                          <option value="">Select category</option>
                          <option value="Frontend">Frontend</option>
                          <option value="Backend">Backend</option>
                          <option value="Testing">Testing</option>
                        </select>
                      </div>
                      <div>
                        <label for="dueDate">Due Date</label>
                        <input ref="dueDateInput" type="date" v-model="dueDate" id="dueDate" required
                          class="form-control w-100 border-info me-4" style="cursor: pointer;" />
                      </div>
                      &nbsp;&nbsp;

                      <button type="submit" class="btn btn-success px-5 h-75 mt-4 border margin-left"
                        @click.prevent="addTask">Add</button>
                      &nbsp;&nbsp;
                      <button type="button" class="btn btn-danger px-5 h-75 mt-4 border"
                        @click.prevent="cancel()">Cancel</button>


                    </div>
                  </form>
                </div>
              </template>
              <!-- ALL TASKS -->
              <table class="table text-white mb-0">

                <thead v-if="tasks.length > 0">
                  <tr>
                    <th scope="col">Team Member</th>
                    <th scope="col">Task</th>
                    <th scope="col">Status</th>
                    <th scope="col">Priority</th>
                    <th scope="col">category</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="task in tasks" v-bind:key="task.id" :id="task.id" class="fw-normal">
                    <th style="width: 15vw;">
                      <template v-for="user in users" v-bind:key="user.id">
                        <template v-if="user.id === task.userId">
                          <img v-bind:src="user.image" alt="avatar" style="width: 45px; height: auto;">
                          <span class="ms-2" style="font-size: small;">{{ user.firstName }} {{ user.lastName }}</span>
                        </template>
                      </template>
                    </th>
                    <td class="align-middle" style="width: 30vw;">
                      <span>{{ task.text }}</span>
                    </td>
                    <td class="align-middle" style="width: 8vw;">
                      <h6 class="mb-0"><span class="badge"
                          :class="{ 'bg-info': task.status === 'In progress', 'bg-secondary': task.status === 'Done', 'bg-dark': task.status === 'Assigned' }">{{
                            task.status }}</span>
                      </h6>
                    </td>
                    <td class="align-middle" style="width: 8vw;">
                      <h6 class="mb-0"><span class="badge"
                          :class="{ 'bg-danger': task.priority === 'High', 'bg-success': task.priority === 'Low', 'bg-warning': task.priority === 'Medium' }">{{
                            task.priority }}</span>
                      </h6>
                    </td>
                    <td class="align-middle" style="width: 8vw;">
                      <h6 class="mb-0">
                        <span>{{ task.category }}</span>
                      </h6>
                    </td>
                    <td class="align-middle" style="width: 12vw;">
                      <h6 class="mb-0">{{ formattedDueDate(task.dueDate) }}</h6>
                    </td>
                    <td class="align-middle" style="width: 8vw;">
                      <router-link :to="{ name: 'edit', params: { id: task.id } }"
                        v-if="store.state.user.id === task.userId || store.state.user.isAdmin" title="Edit">
                        <i class="fas fa-pen fa-lg text-light me-3"></i></router-link>
                      <!-- only if user is admin -->
                      <a v-if="store.state.user.isAdmin" @click.prevent="confirmDeleteTask(task)" href="#" title="Remove">
                        <i class="fas fa-trash-alt fa-lg text-danger"></i></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import http from "../http-common";
import store from "@/store/store";
import Swal from 'sweetalert2';

export default {
  name: 'TasksView',
  data() {
    return {
      tasks: [],
      users: [],
      store: store,
      priority: '',
      userId: '',
      text: '',
      category: '',
      dueDate: '',
      showFilterDropdown: false,
      showStatusDropdown: false,
      showPriorityDropdown: false,
      showCategoryDropdown: false,
      dueDateFilter: '',
      showDueDateInput: false,
    }
  },
  async created() {
    try {
      const getTasks = await http.get('/tasks');
      const tasks = getTasks.data;
      this.tasks = tasks;
      this.allTasks = tasks;
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }

    try {
      const getUsers = await http.get('/users');
      const users = getUsers.data;
      this.users = users;
    } catch (err) {
      console.error('Error fetching users:', err);
    }

    if (this.$refs.dueDateInput) {
      this.setMinDate();
    }
  },

  methods: {
    addForm() {
      const addForm = document.querySelector('#addForm');
      const addBtn = document.querySelector('#addBtn');
      addForm.classList.remove('d-none');
      addForm.classList.add('d-block');
      addBtn.classList.remove('d-block');
      addBtn.classList.add('d-none');
    },
    cancel() {
      const addForm = document.querySelector('#addForm');
      const addBtn = document.querySelector('#addBtn');
      addForm.classList.remove('d-block');
      addForm.classList.add('d-none');
      addBtn.classList.remove('d-none');
      addBtn.classList.add('d-block');
      this.dueDate = '';
      this.clearForm();
    },
    clearForm() {
      this.text = '',
        this.priority = '',
        this.userId = '',
        this.dueDate = ''
    },
    async addTask() {
      if (!this.text || !this.priority || !this.userId || !this.dueDate || !this.category) {
        this.$toast.open({
        message: `Input missing, All feilds are required`,
        type: 'error',
        position: 'top-right',
      });
      return;
      }
      
      const result = await http.post('/tasks', {
        text: this.text || '',
        priority: this.priority || 'High',
        status: 'Assigned',
        userId: this.userId || 31,
        dueDate: this.dueDate,
        category: this.category,
      })
      this.tasks.push(result.data);
      this.clearForm();
      this.cancel();

      this.category = '';
      this.$toast.open({
        message: `Task added successfully`,
        position: 'top-right',
        type: 'success',
      });
    },
    async confirmDeleteTask(task) {
      const { value: confirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this task!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
      });

      if (confirmed) {
        await this.deleteTask(task);
        this.$toast.open({
          message: 'The task has been deleted.',
          position: 'top-right',
          type: 'default',
        });
      }
    },
    async deleteTask(task) {
      const taskId = task.id;
      const result = await http.delete(`/tasks/${taskId}`)
      console.log(result.data);
      const index = this.tasks.indexOf(task);
      this.tasks.splice(index, 1);
    },
    setMinDate() {
      const today = new Date().toISOString().split('T')[0];
      if (this.$refs.dueDateInput) {
        this.$refs.dueDateInput.min = today;
      }
    },
    formattedDueDate(dueDate) {
      if (dueDate) {
        const date = new Date(dueDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      } else {
        return '';
      }
    },
    toggleDropdown() {
      this.showFilterDropdown = !this.showFilterDropdown;
    },
    filterByStatus(status) {
      console.log(`Filtering by Status: ${status}`);
      this.showStatusDropdown = !this.showStatusDropdown;
      this.hidePriorityDropdown();
      this.hideCategoryDropdown();
      this.hideDueDateInput();
      this.filterTasksByStatus(status);
    },
    hideStatusDropdown() {
      this.showStatusDropdown = false;
    },
    filterByPriority(priority) {
      console.log(`Filtering by Priority: ${priority}`);
      this.showPriorityDropdown = !this.showPriorityDropdown;
      this.hideStatusDropdown();
      this.hideDueDateInput();
      this.hideCategoryDropdown();
      this.filterTasksByPriority(priority);
    },
    hidePriorityDropdown() {
      this.showPriorityDropdown = false;
    },
    filterByCategory(category) {
      console.log(`Filtering by Category: ${category}`);
      this.showCategoryDropdown = !this.showCategoryDropdown;
      this.hideStatusDropdown();
      this.hideDueDateInput();
      this.hidePriorityDropdown();
      this.filterTasksByCategory(category);
    },
    hideCategoryDropdown() {
      this.showCategoryDropdown = false;
    },
    filterByDueDate() {
      console.log(`Filtering by Due Date: ${this.dueDateFilter}`);
      this.showDueDateInput = !this.showDueDateInput;
      this.hideStatusDropdown();
      this.hidePriorityDropdown();
      this.hideCategoryDropdown();
      this.filterTasksByDueDate(this.dueDateFilter);
    },
    hideDueDateInput() {
      this.showDueDateInput = false;
    },
    filterTasksByStatus(status) {
      if (status === 'Status') {
        this.tasks = this.allTasks;
      } else {
        this.tasks = this.allTasks.filter(task => task.status === status);
      }
    },
    filterTasksByPriority(priority) {
      if (priority === 'Priority') {
        this.tasks = this.allTasks;
      } else {
        this.tasks = this.allTasks.filter((task) => task.priority === priority);
      }
    },
    filterTasksByCategory(category) {
      if (category === 'Category') {
        this.tasks = this.allTasks;
      } else {
        this.tasks = this.allTasks.filter((task) => task.category === category);
      }
    },
    filterTasksByDueDate(selectedDueDate) {
      if (!selectedDueDate) {
        this.tasks = this.allTasks;
      } else {
        this.tasks = this.allTasks.filter((task) => {
          const taskDueDate = new Date(task.dueDate).toISOString().split('T')[0];
          return taskDueDate === selectedDueDate;
        });
      }
    },
  },
}

</script>

<style scoped>
.gradient-custom-2 {
  background: #6391e7;

  background: -webkit-linear-gradient(to right,
      rgba(126, 64, 246, 1),
      rgba(80, 139, 252, 1));

  background: linear-gradient(to right,
      rgba(126, 64, 246, 1),
      rgba(80, 139, 252, 1));
}

.mask-custom {
  background: rgba(24, 24, 16, 0.2);
  border-radius: 2em;
  backdrop-filter: blur(25px);
  border: 2px solid rgba(255, 255, 255, 0.05);
  background-clip: padding-box;
  box-shadow: 10px 10px 10px rgba(46, 54, 68, 0.03);
}

.btn-outline-light {
  transition: 0.3s ease-in-out;
}

.btn-outline-light:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
}

.bg-form {
  background-color: rgba(56, 24, 128, 0.3);
  border: 1px solid white;
}

.placeholder-white::placeholder {
  color: rgb(202, 201, 201);
}

.input-box {
  width: 100%;
}

.filter-container {
  position: absolute;
  top: 30px;
  right: 100px;
  cursor: pointer;
  display: inline;
  align-items: center;
}

.filter-text {
  position: absolute;
  top: 23px;
  right: -44px;
}

.filter-dropdown,
.nested-filter-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgb(0, 0, 0);
  border-radius: 2px;
  display: none;
}

.filter-dropdown ul,
.nested-filter-dropdown ul {
  list-style-type: none;
  padding: 0;
}

.filter-dropdown ul li,
.nested-filter-dropdown ul li {
  padding: 5px 25px;
}

.filter-dropdown ul li a,
.nested-filter-dropdown ul li a {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.filter-container:hover .filter-dropdown {
  display: block;
}

.dropdown-container {
  position: relative;
  display: inline-block;
  margin-right: 20px;
}

.dropdown-container:hover .filter-dropdown {
  display: block;
}

.dropdown-container:hover .nested-filter-dropdown {
  display: block;
  left: -285px;
}

</style>