<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>

    <div class="post" v-if="post && author">
      <article>
        <div class="image">
          <img :alt="post.fields.title" :src="`${post.fields.image[0].fields.file.url}?w=1680&h=750&fit=crop`">
        </div>
        <div class="content-wrapper">
          <h2>{{ post.fields.title }}</h2>
          <div class="content" v-html="post.fields.content.html"></div>
          <div class="author">
            <img :src="`${author.fields.avatar[0].fields.file.url}?w=30&h=30&fit=crop`" alt="author.fields.name"> Écrit par {{ author.fields.name }}
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import Comfortable from 'comfortable-javascript'
import { comfortable } from '@/comfortable.js'
import _ from 'lodash'

export default {
  name: 'PageBlog',
  data () {
    return {
      post: null,
      author: null
    }
  },
  methods: {
    getPost () {
      const options = {
        embedAssets: true,
        includes: 1,
        filters: new Comfortable.Filter()
          .addAnd('slug', 'equal', this.$route.params.slug)
      }

      comfortable.getDocuments(options)
        .then(result => {
          this.post = result.data[0]
          this.author = _.find(result.includes.author, { meta: { id: this.post.fields.author[0].meta.id } })
        })
        .catch(err => {
          throw err
        })
    }
  },
  created () {
    this.getPost()
  }
}
</script>
