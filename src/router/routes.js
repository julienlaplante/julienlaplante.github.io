
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Index.vue')
  },
  {
    path: '/blog/:slug',
    name: 'blog-post',
    component: () => import('@/pages/Blog.vue')
  },
  {
    path: '/:slug',
    name: 'page',
    component: () => import('@/pages/Page.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
