<template>
  <div id="page-container">
    <main id="main-container">
      <div class="content content-narrow">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-8 offset-lg-2 offset-md-2">
              <div class="block block-fx-shadow">
                <div class="block-header">
                  <h2 class="block-title">
                    <a href="javascript:void(0)" class="mr-2" @click="goBack"><i class="fa fa-chevron-left" /></a> Create New Task
                  </h2>
                </div>
                <div class="block-content">
                  <form @submit.prevent="onSubmit">
                    <div class="form-group">
                      <label for="tasknName">Name</label>
                      <input type="text" class="form-control" id="taskName" name="taskName" placeholder="Input task name" v-model="taskName">
                    </div>
                    <div class="form-group">
                      <label for="taskCategory">Category</label>
                      <select class="form-control" id="taskCategory" name="taskCategory" v-model="taskCategory">
                        <option value="">-- Please select --</option>
                        <option v-for="(item, index) in showCategories" :key="index" :value="item">{{item}}</option>
                      </select>
                    </div>
                    <div class="form-group text-right">
                      <button type="submit" class="btn btn-success text-right">Save</button>
                    </div>
                  </form>
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
import Swal from 'sweetalert2'

export default {
  name: 'create',
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    taskName: {
        get() {
            return this.$store.getters.taskName
        },
        set(val) {
            this.$store.commit('taskName', val)
        }
    },
    taskCategory: {
        get() {
            return this.$store.getters.taskCategory
        },
        set(val) {
            this.$store.commit('taskCategory', val)
        }
    },
    ...mapGetters([
        'showCategories',
        'showTask'
    ])
  },
  methods: {
    goBack() {
        this.$router.back()
    },
    onSubmit() {
      const newTask = this.showTask

      if (newTask.name == "") {
        Swal.fire({
          title: 'Please enter task name',
          type: 'error',
          confirmButtonText: 'Ok'
        })
      } else if (newTask.category == "") {
        Swal.fire({
          title: 'Please select task category',
          type: 'error',
          confirmButtonText: 'Ok'
        })
      } else {
        const dataToSave = {
          name: newTask.name,
          category: newTask.category,
          done: false
        }

        this.$store.commit('createTask', dataToSave)

        Swal.fire({
            title: null,
            html: "<img class='tuna_loading' src='/img/loading.svg'/> <h3>Saving...</h3>",
            showConfirmButton: false
        });

        setTimeout(() => {
          Swal.fire({
            title: "New task has been added!",
            type: "success",
            confirmButtonText: 'Close',
            onClose: () => {
              this.$store.commit('resetCreateForm')
              this.$router.back()
            }
          });
        }, 1500)
      }
    }
  }
}
</script>