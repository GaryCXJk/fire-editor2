<template lang="html">
  <div id="welcome">
  	<h1>Fire Editor</h1>
		<h2>To start just drag and drop your file into the browser</h2>
		<p>Currently the editor can only modify decompressed files. To decompress a file use <a href="https://github.com/SciresM/FEAST">FEAST</a></p>
		<input type="file" id="fileInput" title=''>
		<div id="bg">

		</div>
		<button id="input">Choose File</button>
	</div>
</template>

<script>
import * as Data from '../assets/js/data.js'
import {EventBus} from '../assets/js/eventBus.js'

$(document).ready(function(){
	if(window.File && window.FileList && window.FileReader) {
		$('#fileInput').on('change', function(){
			fileHandler();
		});
		$('#fileInput').on('dragover', function(){
			$('#bg').addClass('uploading');
		});
		$('#fileInput').on('dragleave', function(){
			$('#bg').removeClass('uploading');
		});
		$('#fileInput').on('drop', function(e){
			$('#bg').removeClass('uploading');
		});
		$('#input').on('click', function(){
			$('#fileInput').click();
		});
	}
});

function fileHandler() {
	var reader = new FileReader();
	var file = $('#fileInput')[0].files[0];
	reader.readAsArrayBuffer(file);
	reader.addEventListener('loadend', function(e) {
		var u = new Uint8Array(this.result);
		var a = new Array(u.length);
		var i = u.length;
		while (i--){
			a[i] = Data.Util.dectohex(u[i]);
		}
		u = null;


		Data.file.str = a.join('');
		EventBus.$emit('HideWelcome');
		EventBus.$emit('readBlocks');
		EventBus.$emit('readItems');
	});

}

export default {
	methods: {
		hideMe: function() {

		}
	}
}
</script>

<style scoped lang="sass">
	#welcome
		display: flex
		align-items: center
		justify-content: center
		flex-direction: column
		height: 100%
		position: relative
		h1, h2, p, button
			text-align: center
			padding: 16px
			z-index: 3
			color: rgba(white, 0.85)
			a
				color: rgba(white,0.85)
		input
			padding: 32px 64px
			border-radius: 2px
			position: absolute
			top: 0
			left: 0
			height: 100%
			width: 100%
			opacity: 0
			z-index: 2
		#bg
			display: block
			position: absolute
			height: 100%
			width: 100%
			top: 0
			left: 0
			z-index: 1
			background-color: rgba(#fff, 0)
			&.uploading
				background-color: rgba(#fff, 0.2)
				transition: all 0.3s cubic-bezier(.25,.8,.25,1)

		#input
			padding: 16px
			background: transparent
			border: 1px solid rgba(#fff, 0.85)
			cursor: pointer
			z-index: 2
			transition: all 0.3s cubic-bezier(.25,.8,.25,1)
			&:hover
				background-color: rgba(#fff,0.2)
</style>
