$(function(){
	$('button').click(function(){
		var user = $('#txtUsername').val();
		var pass = $('#txtPassword').val();
		document.getElementById("#txtUsername").value = "My value";	
		document.getElementById("demo").innerHTML = "Hello from button";			
		console.log("hello world");
		$.ajax({
			url: '/signUpUser',
			data: $('form').serialize(),
			type: 'POST',
			success: function(response){
				console.log(response);
				$('#txtUsername').val() = response;
			},
			error: function(error){
				console.log(error);
			}
		});
	});
});
