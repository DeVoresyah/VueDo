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
                    <a href="javascript:void(0)" class="mr-2" @click="goBack"><i class="fa fa-chevron-left" /></a> Create New Category
                  </h2>
                </div>
                <div class="block-content">
                  <form @submit.prevent="onSubmit">
                    <div class="form-group">
                      <label>Existing Category</label>
											<ul>
												<li v-for="(item, index) in showCategories" :key="index">{{item}}</li>
											</ul>
                    </div>
                    <div class="form-group">
                      <label>New Category</label>
                      <input type="text" class="form-control" name="categoryName" placeholder="Input task name" v-model="categoryName">
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
    categoryName: {
        get() {
            return this.$store.getters.categoryName
        },
        set(val) {
            this.$store.commit('categoryName', val)
        }
    },
    ...mapGetters([
        'showCategories',
        'showCategoryName'
    ])
  },
  methods: {
    goBack() {
			this.$router.push({path:`/`})
    },
    onSubmit() {

      if (this.showCategoryName == "") {
        Swal.fire({
          title: 'Please enter category name',
          type: 'error',
          confirmButtonText: 'Ok'
        })
      } else {
        this.$store.commit('createCategory', this.showCategoryName)

        Swal.fire({
            title: null,
            html: "<img class='tuna_loading' src='/img/loading.svg'/> <h3>Saving...</h3>",
            showConfirmButton: false
        });

        setTimeout(() => {
          Swal.fire({
            title: "New category has been added!",
            type: "success",
            confirmButtonText: 'Close',
            onClose: () => {
              this.$store.commit('resetCreateForm')
            }
          });
        }, 1500)
      }
    }
  }
}
</script>