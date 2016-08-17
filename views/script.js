function onSignIn(response) {
	var perfil = response.getBasicProfile();
	var userID = perfil.getId();
	var userName = perfil.getName();
	var userEmail = perfil.getEmail();
	var userPicture = perfil.getImageUrl();
	var dominio = userEmail.indexOf("@");
	var email = userEmail.substring(0, dominio);
	var espaco = userName.indexOf(" ");   
	userName = userName.replace(/[ìíî]/,"i");
	var nome = userName.substring(0, espaco);
	pesquisar(email);
	var LoR = response.getAuthResponse().id_token;

	$("#btnEntrar").click(function(){
		loginSucess(userEmail);
	});
	$("#btnSair").click(function(){
		deslogar();
	});

	$("#btnRequisicao").click(function(){
		popularSelect();
	});
};