<template lang="html">
	<div id="color">
		<p>{{label}}</p>
		<input type="color" v-model='value'>
	</div>
</template>

<script>

import * as Data from '../assets/js/data.js'

export default {
	props: {
		color: {
			required: true
		},
		label: {
			type: String
		},
	},
	data () {
		return {
			value: this.color
		}
	}
}
</script>

<style scoped lang="sass">
	#color
		padding: 4px
		margin: 2px
	p
		color: rgba(#fff, 0.85)
		display: inline-block
	input
		display: inline-block
		background: transparent
		border: none
		color: rgba(#fff, 0.85)
		padding: 2px
		cursor: pointer
</style>
