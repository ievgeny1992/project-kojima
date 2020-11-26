<template>
	<div class="app" id="app">
		<aside class="sidebar pt-md-5 pt-4">
			<div class="sidebar__avatar"></div>
			<nav class="sidebar__nav">
				<div class="row">
					<div class="col">
						<div id="nav">
							<router-link to="/" class="sidebar__button">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" fill-rule="evenodd" stroke="#fdfcff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" d="M9.157 20.771v-3.066c0-.78.636-1.414 1.424-1.42h2.886c.792 0 1.434.636 1.434 1.42h0v3.076c0 .662.533 1.203 1.202 1.219h1.924c1.918 0 3.473-1.54 3.473-3.438h0V9.838a2.44 2.44 0 00-.962-1.905l-6.58-5.248a3.18 3.18 0 00-3.945 0L3.462 7.943A2.42 2.42 0 002.5 9.847v8.715C2.5 20.46 4.055 22 5.973 22h1.924c.685 0 1.241-.55 1.241-1.229h0"/></svg>
							</router-link>

							<router-link to="/add" class="sidebar__button">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd" stroke="#fdfcff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="M12 8.327v7.327M15.667 11.99H8.333M16.686 2H7.314C4.048 2 2 4.312 2 7.585v8.83C2 19.688 4.038 22 7.314 22h9.372C19.962 22 22 19.688 22 16.415v-8.83C22 4.312 19.962 2 16.686 2z"/></g></svg>
							</router-link>

							<router-link to="/info" class="sidebar__button">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd" stroke="#fdfcff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"><path d="M7.371 10.202v6.86M12.038 6.919v10.143M16.629 13.827v3.235M16.686 2H7.314C4.048 2 2 4.312 2 7.585v8.83C2 19.688 4.038 22 7.314 22h9.372C19.962 22 22 19.688 22 16.415v-8.83C22 4.312 19.962 2 16.686 2z"/></g></svg>
							</router-link>
						</div>
					</div>
				</div>
			</nav>
		</aside>

		<main class="page__content">
			<router-view/>
		</main>
	</div>

</template>

<script>
	export default {
		name: 'App',
		data: function () {
			return {

			}
		}
	}
</script>

<style lang="scss">
	@import "./assets/scss/main.scss";
</style>
