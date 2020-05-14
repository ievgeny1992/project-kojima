<template>
	<div class="app" id="app">
		<aside class="sidebar pt-md-5 pt-4">
			<nav class="sidebar__nav">
				<div class="row">
					<div class="col">
						<div id="nav">
							<router-link to="/" class="sidebar__button">
								<svg width="35px" height="35px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
									<g id="Iconly/Light/Home" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
										<g id="Home" transform="translate(2.500000, 2.000000)" stroke="#fdfcff" stroke-width="1.5">
											<path d="M6.65721519,18.7714023 L6.65721519,15.70467 C6.65719744,14.9246392 7.29311743,14.2908272 8.08101266,14.2855921 L10.9670886,14.2855921 C11.7587434,14.2855921 12.4005063,14.9209349 12.4005063,15.70467 L12.4005063,15.70467 L12.4005063,18.7809263 C12.4003226,19.4432001 12.9342557,19.984478 13.603038,20 L15.5270886,20 C17.4451246,20 19,18.4606794 19,16.5618312 L19,16.5618312 L19,7.8378351 C18.9897577,7.09082692 18.6354747,6.38934919 18.0379747,5.93303245 L11.4577215,0.685301154 C10.3049347,-0.228433718 8.66620456,-0.228433718 7.51341772,0.685301154 L0.962025316,5.94255646 C0.362258604,6.39702249 0.00738668938,7.09966612 0,7.84735911 L0,16.5618312 C0,18.4606794 1.55487539,20 3.47291139,20 L5.39696203,20 C6.08235439,20 6.63797468,19.4499381 6.63797468,18.7714023 L6.63797468,18.7714023"></path>
										</g>
									</g>
								</svg>
							</router-link>

							<router-link to="/add" class="sidebar__button">
								<svg width="35px" height="35px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
									<g id="Iconly/Light/Plus" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
										<g id="Plus" transform="translate(2.000000, 2.000000)" stroke="#fdfcff" stroke-width="1.5">
											<line x1="10" y1="6.32730733" x2="10" y2="13.6536632" id="Line_185"></line>
											<line x1="13.6666667" y1="9.99048525" x2="6.33333333" y2="9.99048525" id="Line_186"></line>
											<path d="M14.6857143,0 L5.31428571,0 C2.04761905,0 0,2.31208373 0,5.58515699 L0,14.414843 C0,17.6879163 2.03809524,20 5.31428571,20 L14.6857143,20 C17.9619048,20 20,17.6879163 20,14.414843 L20,5.58515699 C20,2.31208373 17.9619048,0 14.6857143,0 Z" id="Path"></path>
										</g>
									</g>
								</svg>
							</router-link>

							<router-link to="/info" class="sidebar__button">
								<svg width="35px" height="35px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
									<g id="Iconly/Light/Chart" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
										<g id="Chart" transform="translate(2.000000, 2.000000)" stroke="#fdfcff" stroke-width="1.5">
											<line x1="5.37142857" y1="8.20171265" x2="5.37142857" y2="15.0618459" id="Line_182"></line>
											<line x1="10.0380952" y1="4.91912464" x2="10.0380952" y2="15.0618459" id="Line_183"></line>
											<line x1="14.6285714" y1="11.8268316" x2="14.6285714" y2="15.0618459" id="Line_184"></line>
											<path d="M14.6857143,0 L5.31428571,0 C2.04761905,0 0,2.31208373 0,5.58515699 L0,14.414843 C0,17.6879163 2.03809524,20 5.31428571,20 L14.6857143,20 C17.9619048,20 20,17.6879163 20,14.414843 L20,5.58515699 C20,2.31208373 17.9619048,0 14.6857143,0 Z" id="Path"></path>
										</g>
									</g>
								</svg>
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
