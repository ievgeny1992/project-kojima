import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import("@/views/Home")
	},
	{
		path: '/search',
		name: 'search',
		component: () => import("@/views/Add")
	},
	{
		path: '/add',
		name: 'add',
		component: () => import("@/views/Add")
	},
	{
		path: '/info',
		name: 'info',
		component: () => import("@/views/Info")
	},
	{
		path: '/game/:slug',
		name: 'Game',
		component: () => import("@/views/Game"),
		props: true
	}
]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

export default router
