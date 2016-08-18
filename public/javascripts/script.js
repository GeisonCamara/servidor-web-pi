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

function onSignIn(response) {
    var perfil = response.getBasicProfile();
    var userID = perfil.getId();
    console.log("ID: " + userID);
    console.log('');
    var userName = perfil.getName();
    var userEmail = perfil.getEmail();
    var userPicture = perfil.getImageUrl();
    /*var dominio = userEmail.indexOf("@");
    var email = userEmail.substring(0, dominio);
    var espaco = userName.indexOf(" ");   
    userName = userName.replace(/[ìíî]/,"i");*/
    var nome = userName.substring(0, espaco);
    var LoR = response.getAuthResponse().id_token;
    console.log("Token: " + LoR);
};

$(document).ready(function(){
    hideButton();
    showButton();
    clickButton();
});