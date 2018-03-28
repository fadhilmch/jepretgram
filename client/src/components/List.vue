<template>
  <div>
    <div class='container'>
      <div class='row'>
        <div class='col-md-8 mx-auto'>
          <div class="card" v-for='(post, i) in postsList' :key='i'>
            <div class="card-image">
              <figure>
                <img  class=" fit-image image-post" :src="post.imageUrl" alt="Placeholder image" >
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <h4>{{post.title}}</h4>
              </div>
              <button class="btn" @click="emitLike(post._id)">
                      <i v-if="getLike(post.likes)" class="far fa-heart fa-2x"></i>
                      <i v-if="!getLike(post.likes)" class="fas fa-heart fa-2x"></i>
              </button>
              <button @click='emitDelete(post._id)' v-if="post.user._id===userId" class='btn btn-danger'>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'List',
  computed: {
    ...mapState([
      'postsList',
      'userId'
    ])
  },
  data () {
    return {}
  },
  methods: {
    emitLike: function (postId) {
      this.$store.dispatch('emitLike', postId)
    },
    getLike: function (arrLike) {
      // console.log(arrLike)
      return arrLike.indexOf(this.userId) === -1
    },
    emitDelete: function (postid) {
      this.$store.dispatch('emitDelete', postid)
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;
}

.fa-heart {
  color:#d84790;
}
</style>
