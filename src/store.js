import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    categories: [
      'developing',
      'design',
      'debugging'
    ],
    task: {
      name: '',
      category: ''
    },
    categoryName: ''
  },
  getters: {
    showTodos: (state, getters) => {
      return state.todos
    },
    showCategories: (state, getters) => {
      return state.categories
    },
    showTask: (state, getters) => {
      return state.task
    },
    taskName: (state, getters) => {
      return state.task.name
    },
    taskCategory: (state, getters) => {
      return state.task.category
    },
    showCategoryName: (state, getters) => {
      return state.categoryName
    }
  },
  actions: {

  },
  mutations: {
    taskName: (state, payload) => {
      state.task.name = payload
    },
    taskCategory: (state, payload) => {
      state.task.category = payload
    },
    resetCreateForm: (state) => {
      state.task = {
        name: '',
        category: ''
      }
      state.categoryName = ''
    },
    createTask: (state, payload) => {
      state.todos.push(payload)
    },
    removeTask: (state, payload) => {
      state.todos.splice(payload, 1)
    },
    updateTask: (state, payload) => {
      state.todos = payload
    },
    categoryName: (state, payload) => {
      state.categoryName = payload
    },
    createCategory: (state, payload) => {
      state.categories.push(payload)
    }
  },
})
