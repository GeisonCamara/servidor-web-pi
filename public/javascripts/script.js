function hideButton(){
	$('.switch').hide();
}

function showButton(){
	$('.switch').fadeIn(1000);
}

function unlock(){
	$.ajax({
		url: "http://porta.digitaldesk.com.br/unlock?key=DD2016TRNEE&device=web",
	});
}

function clickButton(){
	$('#button').click(function(){
		var state = $('#button').is(":checked");
		$(this).prop('disabled', true);
		unlock();
		if(state===true){
			setTimeout(function(){
				$('#button').attr('checked', false);
				$('#button').prop('disabled', false);
			},3500);
		}
	});
}

$(document).ready(function(){
	hideButton();
	showButton();
	clickButton();
});

