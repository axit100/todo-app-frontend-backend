<script setup></script>

<template class="block">
  <main class="flex flex-col md:flex-row w-full">
    <div class="w-full md:w-1/3 p-4 min-w-[300px]"> <!-- Left side for TodoForm -->
      <TodoForm @saved="fetchTodos"/>
    </div>
    <div class="w-full md:w-2/3 p-4 min-w-[600px]"> <!-- Right side for TodoList -->
      <TodoList/>
    </div>
  </main>
</template>



<script>
import TodoList from '../components/TodoList.vue';
import TodoForm from '../components/TodoForm.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    TodoList,
    TodoForm,
  },
  methods: {
    ...mapActions(['fetchTodos']),
  },
  mounted() {
    this.fetchTodos();
  }
};
</script>
<style>
#app {
 display: block !important;
}
</style>
