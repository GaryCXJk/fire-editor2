<template lang="html">
  <div :id="'skillWrapper' + this.pos" class='skillWrapper'>
		<div id='skill'><input id="godBox" type="checkbox"><p>change all</p></div>
		<div id="skill" v-for='(skill, i) in skills'>
			<p>{{skill}}</p>
			<input type="checkbox" name='skill' v-bind:checked='(string.substr(i,1) == "1")'>
		</div>
  </div>
</template>

<script>

$(document).on("click", "#godBox", function() {
	var checkboxes = $(this).parent().parent().find('input[name="skill"]');
	checkboxes.prop('checked', $(this).is(':checked'));
});

import * as Data from '../assets/js/data.js'
import {EventBus} from '../assets/js/eventBus.js';

export default {
	props: {
		bin: {
			type: String,
			required: true
		},
		pos: {
			required: true
		}
	},
	data () {
		return {
			string: this.bin,
			skills: Data.Hex.skills
		}
	},
	mounted () {
		EventBus.$on('SaveAllUnits', n => {
			var checkboxes = $('#skillWrapper'+this.pos).find('input[name="skill"]');
			var temp = ''
			for(var i = 0; i < checkboxes.length; i++) {
				if(checkboxes[i].checked == true) {
					temp += '1';
				} else {
					temp += '0';
				}
			}
			if(temp != this.bin){
				EventBus.$emit('learnedSkill' + this.pos, temp)
			}
		})
	},
}
</script>

<style scoped lang="sass">
	.skillWrapper
		#skill
			padding: 8px 0
			width: 200px
			display: inline-block
		p
			display: inline-block
			color: rgba(#fff, 0.85)
		input
			display: inline-block
</style>
