<template>
  <div class="container">
    <navbar></navbar>
    <div class="row vertical-offset-100">
      <div class="col-md-4 offset-md-4 my-auto">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Please Signup</h3><br>
          </div>
          <div class="panel-body">
            <div class="form-group">
              <input v-validate="'required|email'" data-vv-delay="500" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" class="form-control" placeholder="E-mail" type="text" v-model="signUpData.email">
              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </div>
            <div class="form-group">
              <input v-validate="'required|min:6'" data-vv-delay="500" :class="{'input': true, 'is-danger': errors.has('username') }" name="username" class="form-control" placeholder="Username" type="text" v-model="signUpData.username">
              <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
            </div>
            <div class="form-group">
              <input v-validate="'required|alpha'" data-vv-delay="500" :class="{'input': true, 'is-danger': errors.has('name') }" name="name" class="form-control" placeholder="Name" type="text" v-model="signUpData.name">
              <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
            </div>
            <div class="form-group">
              <input  v-validate="'required|min:6'" data-vv-delay="500" :class="{'input': true, 'is-danger': errors.has('password-signup') }" class="form-control" placeholder="Password" name="password-signup" type="password-signup" v-model="signUpData.password">
              <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password-signup') }}</span>
            </div>
            <input class="btn btn-lg btn-success btn-block" type="submit" value="Daftar" @click="emitSignup">
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
  name: 'SignUp',
  components: {
    Navbar
  },
  data () {
    return {
      signUpData: {
        email: '',
        password: '',
        username: '',
        name: ''
      }
    }
  },
  methods: {
    emitSignup: function () {
      this.$validator.validateAll().then((result) => {
        console.log(result)
        if (result) {
          console.log(this.signUpData)
          this.$store.dispatch('emitSignup', this.signUpData)
          this.signUpData.email = ''
          this.signUpData.password = ''
          this.signUpData.name = ''
          this.signUpData.username = ''
          this.$router.push({path: '/'})
        } else {
          swal('Wrong email / password!', 'Signup if you dont have account', 'error')
        }
      })
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
