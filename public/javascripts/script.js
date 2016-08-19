function hideButton(){
	$('.switch').hide();
}

function showButton(){
	$('.switch').fadeIn(1000);
}

function unlock(){
	$.ajax({
		url: "http://porta.digitaldesk.com.br/unlock?key=DD2016TRNEE&device=web",
		//url: "http://192.168.2.2:3000/unlock?key=DD2016TRNEE&device=web",
		/*
		success: function(result){
        	alert(result);
    	}
    	*/
    });
}

function logarGoogle(){
    console.log('oi');
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
    $('#login').click(function(){
        console.log('oi2');
    });
});

