import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        todos: [],
    },
    mutations: {
        setTodos(state, todos) {
            state.todos = todos;
        },
        addTodo(state, todo) {
            state.todos.push(todo);
        },
        updateTodo(state, updatedTodo) {
            const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
            if (index !== -1) {
                state.todos.splice(index, 1, updatedTodo);
            }
        },
        deleteTodo(state, id) {
            state.todos = state.todos.filter(todo => todo.id !== id);
        }
    },
    actions: {
        async fetchTodos({ commit }) {
            const response = await axios.get('/api/tasks');
            commit('setTodos', response.data);
        },
        async addTodo({ commit }, todo) {
            const response = await axios.post('/api/tasks', todo);
            commit('addTodo', response.data);
        },
        async updateTodo({ commit }, todo) {
            const response = await axios.put(`/api/tasks/${todo.id}`, todo);
            commit('updateTodo', response.data);
        },
        async deleteTodo({ commit }, id) {
            await axios.delete(`/api/tasks/${id}`);
            commit('deleteTodo', id);
        }
    },
    getters: {
        completedTodos: state => state.todos.filter(todo => todo.is_completed),
        incompleteTodos: state => state.todos.filter(todo => !todo.is_completed),
    }
});
