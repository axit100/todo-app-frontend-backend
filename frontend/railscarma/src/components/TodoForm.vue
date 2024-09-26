<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-semibold mb-4">{{ 'Add Todo' }}</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Title Input -->
      <div>
        <input
            v-model="todo.title"
            placeholder="Title"
            required
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <!-- Description Input -->
      <div>
        <textarea
            v-model="todo.description"
            placeholder="Description"
            required
            class="w-full p-2 border border-gray-300 rounded h-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <!-- Submit Button -->
      <div>
        <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {{ 'Add' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    todoData: {
      type: Object,
      default: () => ({ title: '', description: '', is_completed: false }),
    },
  },
  data() {
    return {
      todo: { ...this.todoData },
    };
  },
  methods: {
    ...mapActions(['addTodo']),
    async handleSubmit() {
      await this.addTodo(this.todo);
      this.$emit('saved');
      this.resetForm();  // Reset the form after adding a todo
    },
    resetForm() {
      this.todo = { title: '', description: '', is_completed: false };  // Reset form fields
    },
  },
};
</script>
