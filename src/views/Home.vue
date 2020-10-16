<template>
  <div id="page-container">
    <main id="main-container">
      <div class="bg-image overflow-hidden" style="background-image: url('media/photos/photo3@2x.jpg');">
        <div class="bg-primary-dark-op">
          <div class="content content-narrow content-full">
            <div class="d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center mt-5 mb-2 text-center text-sm-left">
              <div class="flex-sm-fill">
                <h1 class="font-w600 text-white mb-0" data-toggle="appear">To-Do</h1>
                <h2 class="h4 font-w400 text-white-75 mb-0" data-toggle="appear" data-timeout="250">What should you do today</h2>
              </div>
              <div class="flex-sm-00-auto mt-3 mt-sm-0 ml-sm-3">
                  <span class="d-inline-block" data-toggle="appear" data-timeout="350">
                    <a class="btn btn-success px-4 py-2 ml-2" data-toggle="click-ripple" href="javascript:void(0)" @click="createCategory">
                      <i class="fa fa-fw fa-plus mr-1"></i> New Category
                    </a>
                    <a class="btn btn-success px-4 py-2 ml-2" data-toggle="click-ripple" href="javascript:void(0)" @click="createTask">
                      <i class="fa fa-plus mr-1"></i> New Task
                    </a>
                  </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="content content-narrow">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-8 offset-lg-2 offset-md-2">
              <div class="row">
                <div class="col-lg-5 col-md-5">
                  <div class="form-group">
                      <label for="filter-category">Filter by Category</label>
                      <select class="form-control" id="filter-category" name="filter-category" v-model="filterCategory">
                        <option value="">-- Please select --</option>
                        <option v-for="(item, index) in showCategories" :key="index" :value="item">{{item}}</option>
                      </select>
                  </div>
                </div>

                <div class="col-lg-7 col-md-7">
                  <div class="form-group">
                    <div class="input-group" style="margin-top:1.9rem">
                      <input type="text" class="form-control" id="search-task" name="search-task" placeholder="Find your task..." v-model="searchTask">
                      <div class="input-group-append">
                        <button type="button" class="btn btn-primary">
                          <i class="fa fa-search mr-1"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="keyword != ''">
                <div v-if="filtered.length > 0">
                  <div class="block" v-for="(item, index) in filtered" :key="index">
                    <div class="block-header">
                      <h3 class="block-title" v-if="!item.done">{{item.name}} <small>#{{item.category}}</small></h3>
                      <del class="block-title" v-else>{{item.name}} <small>#{{item.category}}</small></del>

                      <div class="block-options">
                        <a class="btn-block-option" v-bind:class="{'text-success':item.done}" @click="doneTask(index)">
                            <i class="far fa-check-circle"></i>
                        </a>
                        <a class="btn-block-option" @click="editTask(index)">
                            <i class="far fa-edit"></i>
                        </a>
                        <a class="btn-block-option" @click="removeTask(index)">
                            <i class="far fa-times-circle"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="block block-transparent mt-3 text-center" v-else>
                    <div class="block-content">
                      <h2 class="font-w700">No task founded</h2>
                    </div>
                  </div>
              </div>

              <div v-else>
                <!-- Show if list not empty -->
                  <div v-if="showTodos.length > 0">
                    <div class="block" v-for="(item, index) in showTodos" :key="index">
                      <div class="block-header">
                        <h3 class="block-title" v-if="!item.done">{{item.name}} <small>#{{item.category}}</small></h3>
                        <del class="block-title" v-else>{{item.name}} <small>#{{item.category}}</small></del>

                        <div class="block-options">
                          <a class="btn-block-option" v-bind:class="{'text-success':item.done}" @click="doneTask(index)">
                              <i class="far fa-check-circle"></i>
                          </a>
                          <a class="btn-block-option" @click="editTask(index)">
                              <i class="far fa-edit"></i>
                          </a>
                          <a class="btn-block-option" @click="removeTask(index)">
                              <i class="far fa-times-circle"></i>
                          </a>
                        </div>
                      </div>
                  </div>
                  </div>

                  <!-- Show empty text -->
                  <div class="block block-transparent mt-3 text-center" v-else>
                    <div class="block-content">
                      <h2 class="font-w700">No task available. Create your first task~!</h2>

                      <button class="btn btn-success btn-lg mr-1 mb-3" @click="createTask">
                        <i class="fa fa-fw fa-plus mr-1"></i> New Task
                      </button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'home',
  data() {
    return {
      isLoading: false,
      keyword: '',
      tag: '',
      filtered: []
    }
  },
  computed: {
    searchTask: {
      get() {
        return this.keyword
      },
      set(val) {
        this.keyword = val

        const filteredTodos = this.showTodos.filter((item) => item.name.toLowerCase().includes(val.toLowerCase()))

        this.filtered = filteredTodos
      }
    },
    filterCategory: {
      get() {
        return this.tag
      },
      set(val) {
        if (val == '') {
          this.keyword = ''
          this.tag = ''
        } else {
          this.keyword = ' '
          this.tag = val

          const filteredTodos = this.showTodos.filter((item) => item.category == val)

          this.filtered = filteredTodos
        }
      }
    },
    ...mapGetters([
      'showTodos',
      'showCategories'
    ])
  },
  methods: {
    createTask() {
      this.$router.push({ path: 'create' })
    },
    createCategory(){
      this.$router.push({ path: 'create-category' })
    },
    removeTask(index) {
      this.$store.commit('removeTask', index)
    },
    editTask(index) {
      this.$router.push({path:`/edit/${index}`})
    },
    doneTask(taskIndex) {
      let dataToSave = []

      this.showTodos.map((item, index) => {
        if (index == taskIndex) {
          item.done ? dataToSave.push({
            ...item,
            done: false
          }) : dataToSave.push({
            ...item,
            done: true
          })
        } else {
          dataToSave.push(item)
        }
      })

      this.$store.commit('updateTask', dataToSave)
    }
  }
}
</script>
