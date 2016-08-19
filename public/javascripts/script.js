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

function onSignIn(response) {
    console.log('Logou');
    var ashusauhhsausuha = $.ajax({
        type: "GET",
        url: "https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&state=%2Fprofile&redirect_uri=http://localhost:3000&response_type=token&client_id=489399558653-enu1g23uf2gt1algid9pvfhn8n57tmqt.apps.googleusercontent.com",
        success: function(){
            console.log(ashusauhhsausuha);
        }
        error: function(){
            console.log(ashusauhhsausuha);
        }
    });
    //window.location.assign("https://accounts.google.com/o/oauth2/v2/auth?scope=email%20profile&state=%2Fprofile&redirect_uri=http://localhost:3000&response_type=token&client_id=489399558653-enu1g23uf2gt1algid9pvfhn8n57tmqt.apps.googleusercontent.com");
};

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

