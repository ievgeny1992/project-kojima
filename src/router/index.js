import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import("@/views/Home")
	},
	{
		path: '/add',
		name: 'AddGame',
		component: () => import("@/views/Add")
	},
	{
		path: '/info',
		name: 'Info',
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
