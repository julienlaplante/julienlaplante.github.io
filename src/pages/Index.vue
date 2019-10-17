<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>

    <div class="home content-wrapper">
      <div v-for="post in posts" :key="post.meta.id">
        <router-link :to="`/blog/${post.fields.slug}`">
          <article>
            <!-- <div class="image">
              <img :alt="post.fields.title" :src="`${post.fields.image[0].fields.file.url}?w=840&h=400&fit=crop`">
            </div> -->
            <h2>{{ post.fields.title }}</h2>
          </article>
        </router-link>
      </div>
      <button v-if="totalPosts > posts.length" @click="getPosts">
        {{loading ? 'Loading...' : 'Load more posts'}}
      </button>
    </div>
  </div>
</template>

<script>
import { comfortable } from '@/comfortable.js'

export default {
  name: 'PageIndex',
  data () {
    return {
      posts: [],
      totalPosts: 0,
      loading: false
    }
  },
  methods: {
    getPosts () {
      this.loading = true

      const options = {
        embedAssets: true,
        offset: this.posts.length
      }

      comfortable.getCollection('blogpost', options)
        .then(result => {
          this.posts.push(...result.data)
          this.totalPosts = result.meta.total
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          throw err
        })
    }
  },
  created () {
    this.getPosts()
  }
}
</script>

<style lang="scss" scoped>
article {
  margin-bottom: 42px;
  text-align: left;
}

article .image {
  width: 100%;
}

article .image img {
  max-width: 100%;
  height: auto;
}

article h2 {
  color: #2d2d33;
}

.home article {
  border: 1px solid #ccc;
}

.home article h2 {
  margin-left: 21px;
}
</style>
