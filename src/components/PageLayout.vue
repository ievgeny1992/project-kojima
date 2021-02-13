<template>
    <div class="container-fluid pt-md-5 pt-3">
        <div class="row align-items-center">
			<div class="col">
				<h2>
					{{ title }}
				</h2>
			</div>
            <slot name="header"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'PageLayout',
    props: [ "title" ]
}
</script>