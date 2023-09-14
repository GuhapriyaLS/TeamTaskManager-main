<template>
    <main class="row container-fluid mt-5">
        <div class="col-2"></div>
        <div class="col-8 card p-5">
            <form @submit.prevent="editTask(task)" id="newTaskForm"
                class="d-block justify-content-center align-items-center mb-4">
                <div class="form-outline w-100">
                    <input v-if="store.state.user.isAdmin" type="text" v-model="text" required
                        class="form-control bg-transparent border-2 text-white" maxlength="100" />
                    <input v-else type="text" v-model="text" disabled
                        class="form-control bg-transparent border-2 text-white" maxlength="100" />
                </div>
                <div class="d-flex mt-2 me-2">
                    <select v-if="store.state.user.isAdmin" class="form-select w-25 border-info me-2" v-model="priority"
                        required>
                        <option value="High">High</option>
                        <option value="Medium">Medium </option>
                        <option value="Low">Low </option>
                    </select>
                    
                    <select v-if="store.state.user.isAdmin" class="form-select w-25 border-info me-2" v-model="category"
                        required>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>    
                        <option value="Testing">Testing</option>
                    </select>
                    <select
                        v-if="!store.state.user.isAdmin || (store.state.user.isAdmin && task.userId === store.state.user.id)"
                        v-model="status" required class="form-select w-25 border-info me-2">
                        <option value="Assigned">Assigned</option>
                        <option value="In progress">In progress</option>
                        <option value="Done">Done</option>
                    </select>
                    <input v-if="store.state.user.isAdmin" type="date" v-model="dueDate"
                        class="form-control bg-white border-2 text-black" />
                    <button type="submit" class="btn btn-success ms-2 border">Update</button>
                    <button @click.prevent="cancelEdit" class="btn btn-danger ms-2 border">Cancel</button>
                </div>
            </form>
        </div>
        <div class="col-2"></div>
    </main>
</template>
  
<script>

import router from '@/router';
import http from '../http-common';
import store from '@/store/store';

export default {
    name: 'EditView',
    data() {
        return {
            task: {},
            text: '',
            priority: '',
            status: '',
            category: '',
            dueDate: '',
            store: store,
        };
    },
    async created() {
        const result = await http.get(`/tasks/${this.$route.params.id}`);
        this.task = result.data;       
        this.text = this.task.text;
        this.priority = this.task.priority;
        this.status = this.task.status;
        this.category = this.task.category;
        this.dueDate = this.task.dueDate ? this.formattedDueDate(this.task.dueDate) : null;
    },
    methods: {
        async editTask(task) {
            const result = await http.patch(`/tasks/${task.id}`, {
                text: this.text,
                priority: this.priority,
                status: this.status,
                category: this.category,
                dueDate: this.dueDate,
            });
            console.log(result);
            if (result) {
                this.$toast.warning('Updated Successfully!', { 
                    position: 'top-right',
                    duration: 3000 });

                setTimeout(() => {
                    router.push('/tasks');
                });
            } else {
                this.$toast.error('Ups! Something went wrong!',  { 
                    position: 'top-right',
                    duration: 3000 });
            }
        },
        cancelEdit() {
            this.text = '';
            this.priority = '';
            this.status = '';
            this.dueDate = '';
            this.category = '';
            router.push('/tasks');
        },
        formattedDueDate(dueDate) {
            if (dueDate) {
                const date = new Date(dueDate);
                const day = date.getDate().toString().padStart(2, "0");
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear();
                return `${year}-${month}-${day}`;
            } else {
                return '';
            }
        },
    },
}
</script>
  
<style scoped>
.card {
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
    border: 2px solid rgba(255, 255, 255, 0.05);
    border-radius: 2em;
    background-clip: padding-box;
    box-shadow: 10px 10px 10px rgba(40, 50, 70, 0.03);
    color: white;
    padding-left: 10px;
    padding-right: 10px;
}
</style>
  