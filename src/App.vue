<template lang="html">
	<div id="wrapper">
		<app-header></app-header>
		<div id="workspace">
			<app-welcome v-show='welcomeShow'></app-welcome>
			<app-units v-show='activePane == 0 && !welcomeShow'></app-units>
			<app-items v-show='activePane == 1 && !welcomeShow'></app-items>
		</div>
	</div>
</template>

<script>
import Welcome from './components/welcome.vue'
import Header from './components/header.vue'
import Units from './components/units.vue'
import Items from './components/items.vue'

import {EventBus} from './assets/js/eventBus.js'
import * as Download from  './assets/js/download.js'

export default {
	components: {
		'app-welcome': Welcome,
		'app-header': Header,
		'app-units': Units,
		'app-items': Items
	},
	data () {
		return {
			welcomeShow: true,
			activePane: 0
		}
	},
	mounted () {
		EventBus.$on('HideWelcome', n => {
			this.welcomeShow = false;
		}),
		EventBus.$on('download', n => {
			Download.buildFileStirngThenDownload();
		}),
		EventBus.$on('showUnit', n => {
			this.activePane = 0;
		}),
		EventBus.$on('showItem', n => {
			this.activePane = 1;
		})
	}
}
</script>

<style lang="sass">
	*
		margin: 0
		padding: 0
		border: none
		box-sizing: border-box
		font-family: 'Montserrat', sans-serif
		outline: none
	html, body
		background-color: #252830
		overflow: hidden
	#workspace
		height: calc(100vh - 42px)

	::selection
		background-color: rgba(#b29dc7, 0.2)
	*::-webkit-scrollbar-track
		background-color: rgba(white, 0.3)
	*::-webkit-scrollbar
		background-color: rgba(white, 0.3)
		width: 10px
	*::-webkit-scrollbar-thumb
		background-color: rgba(white, 0.8)
</style>
