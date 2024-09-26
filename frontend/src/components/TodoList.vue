<template>
  <div class="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
    <h2 class="text-2xl font-semibold mb-4">Todo List</h2>
    <ul class="space-y-4">
      <li
          v-for="todo in todos"
          :key="todo.id"
          class="flex items-center justify-between bg-white p-4 rounded shadow"
      >
        <div class="flex items-center">
       <span
           @click="toggleCompletion(todo)"
           class="cursor-pointer mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
       >
            <font-awesome-icon
                :icon="todo.is_completed ? 'check' : 'close'"
                :class="todo.is_completed ? 'text-green-500' : 'text-red-500'"
                class="h-4 w-4 mr-1"
            />
          </span>
          <span
              :class="{ 'line-through text-gray-400': todo.is_completed }"
              class="text-lg"
          >
          {{ todo.title }}
        </span>
        </div>

        <div class="flex space-x-2">
          <button @click="editTodo(todo)" class="flex items-center text-blue-500 py-1">
            <font-awesome-icon icon="edit" class="h-4 w-4 mr-1"/>
          </button>
          <button @click="deleteTodo(todo.id)" class="flex items-center text-red-500 py-1">
            <font-awesome-icon icon="trash" class="h-4 w-4 mr-1"/>
          </button>
        </div>
      </li>
    </ul>


    <!-- Modal for editing -->
    <Modal :isVisible="isModalVisible" title="Edit Todo" @close="closeModal">
      <div v-if="editTodoData" class="space-y-4">
        <input
            v-model="editTodoData.title"
            placeholder="Title"
            class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <textarea
            v-model="editTodoData.description"
            placeholder="Description"
            class="w-full p-2 border border-gray-300 rounded h-24 resize-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
            @click="saveTodo"
            class="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';
import {mapActions, mapState} from 'vuex';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      isModalVisible: false,  // Controls the visibility of the modal
      editTodoData: null,     // Holds the current todo being edited
    };
  },
  computed: {
    ...mapState(['todos']),
  },
  methods: {
    ...mapActions(['fetchTodos', 'deleteTodo', 'updateTodo']),
    async toggleCompletion(todo) {
      const updatedTodo = {...todo, is_completed: !todo.is_completed};
      await this.updateTodo(updatedTodo);
    },
    editTodo(todo) {
      this.editTodoData = {...todo};  // Copy the todo data to edit form
      this.isModalVisible = true;       // Show the modal
    },
    async saveTodo() {
      await this.updateTodo(this.editTodoData);  // Save the updated todo
      this.closeModal();
    },
    closeModal() {
      this.isModalVisible = false;  // Close the modal
      this.editTodoData = null;     // Reset the edit form
    },
  },
  mounted() {
    this.fetchTodos();
  },
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
