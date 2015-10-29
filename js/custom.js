$(document).ready(function() {

	$('select').select2();

	// on document ready, grab all characters and load their ids/names into the #character dropdown
	var initUrl = 'http://gateway.marvel.com/v1/public/characters?limit=100&ts=2&apikey=5898aa83993cf6a2cc4eaf88ce11d37f&hash=fe1d30dce8ed1f80b477af204355c234';

	$.getJSON(initUrl, function(json){
		var characters = json.data.results;

		$.each(characters, function(key,value){
			var charactersArr = [];
			charactersArr.push(value);

			for (var i = charactersArr.length - 1; i >= 0; i--) {
				var characterSelect = '';
				characterSelect += '<option value="' + charactersArr[i].id + '">' + charactersArr[i].name + '</option>';
			};

			$('.character-select select').append(characterSelect);
		});		
	});

	// call getCharacterInfo() when an option is selected 
	$('.character-select select').change(function(){
		var characterSelect = $('.character-select select').val();
		getCharacterInfo(characterSelect);
	});

	// capture selected character and print details to the table
	function getCharacterInfo(characterId) {
		var characterUrl = 'http://gateway.marvel.com/v1/public/characters/' + characterId + '?ts=2&apikey=5898aa83993cf6a2cc4eaf88ce11d37f&hash=fe1d30dce8ed1f80b477af204355c234';

		$.getJSON(characterUrl, function(json) {

			var characterInfo = json.data.results;
			
			$('.character-name').html(characterInfo[0].name);
			$('.character-image').attr('src', characterInfo[0].thumbnail.path + '/portrait_incredible.' + characterInfo[0].thumbnail.extension);
			$('.character-description').html(characterInfo[0].description);
			$('.character-comic-num').html(characterInfo[0].comics.available);
		});
	}
});