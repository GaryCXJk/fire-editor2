<template lang="html">
  <header id="derp">
		<div>
			<h3>FireEditor</h3>
			<a id="download" v-on:click='download()'>Download File</a>

		</div>
		<nav>
  		<ul>
				<li v-on:click='showUnit()'><a href="#">Units</a></li>
  			<li v-on:click='showItem()'><a href="#">Items</a></li>
  		</ul>
  	</nav>
  </header>

</template>

<script>
import {EventBus} from '../assets/js/eventBus.js'

export default {
	methods: {
		download: function() {
			EventBus.$emit('download');
		},
		showUnit: function() {
			EventBus.$emit('showUnit');
		},
		showItem: function() {
			EventBus.$emit('showItem');
		}
	},
	data () {
		return {
			active: 0
		}

	}
}
</script>

<style scoped lang="sass">
	header
		width: 100%
		height: 42px
		background-color: #252830
		box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)
		display: flex
		justify-content: space-between
		align-items: center
		font-size: 14px

		h3
			font-weight: 300
			color: #abb2bf
			padding: 12px
			display: inline-block
		nav
			ul
				li
					display: inline-block
					width: 127px
					border-bottom: 2px solid transparent
					font-weight: 300
					&.active-tab
						border-bottom: 2px solid #b29dc7
						>a
							color: lighten(#abb2bf, .80)
					a
						display: block
						text-decoration: none
						padding: 9px
						color: #abb2bf
						border-bottom: 2px solid transparent
						transition: all 0.3s cubic-bezier(.25,.8,.25,1)
						font-size: 16px
						&:hover
							color: lighten(#abb2bf, .45)

	#download
		padding: 8px 16px
		background-color: #b29dc7
		border-radius: 2px
		color: #252830
		z-index: 1
		cursor: pointer
		text-decoration: none
		display: inline-block
		margin-left: 16px
</style>
