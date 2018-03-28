<template>
  <div class="container">
    <navbar></navbar>
    <div class="row vertical-offset-100">
      <div class="col-md-4 offset-md-4 my-auto">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Upload Image</h3><br>
          </div>
          <div class="panel-body">
          <div class="form-group">
             <label for="fileselect">Files to upload:</label>
          <input @change="fileSelectHandler" type="file" name='post' id="fileselect">
          </div>
            <div class="form-group">
            Caption:
              <input class="form-control" placeholder="Title" type="text" v-model="newPost.title">
            </div>
            <input class="btn btn-lg btn-success btn-block" type="submit" value="Upload" @click="upload">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import swal from 'sweetalert'

export default {
  name: 'Upload',
  components: {
    Navbar
  },
  data () {
    return {
      newPost: {
        title: ''
      },
      formData: new FormData(),
      file: null
    }
  },
  methods: {
    fileSelectHandler: function (event) {
      // console.log(`ini file: ${event.target.files[0]}`);
      this.file = event.target.files[0]
    },
    upload: function () {
      if (this.file) {
        swal({
          title: 'Upload Succes!',
          icon: 'success'
        })
        this.formData.set('post', this.file)
        this.formData.set('title', this.newPost.title)
        this.$store.dispatch('emitUpload', this.formData)
      }
    }
  }
}
</script>

<style scoped>
  .vertical-offset-100 {
    padding-top: 100px;
  }

  .help {
    color: red;
    font-size:12px;
  }

</style>
