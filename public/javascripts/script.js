function hideButton(){
	$('.switch').hide();
}

function showButton(){
	$('.switch').fadeIn(1000);
}

function clickButton(){
	$('#button').click(function(){
    	var teste = $('#button').is(":checked");
    	alert(teste);
	});
}

$(document).ready(function(){
    hideButton();
    showButton();
    clickButton();
});