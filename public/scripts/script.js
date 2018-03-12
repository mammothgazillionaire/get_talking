/*
	Signup and Login START
*/

// Login
$(function(){
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        var data =  $(this).serialize();
        document.getElementById("login-btn").disabled = true;
        document.getElementById("login-btn").style.background = "#ccc";
        $.post('/login', data, function(result) {
            if(result.valid == true) {
                window.location.href = '/redirecting';
            }
            else {
                document.getElementById("login-btn").disabled = false;
                document.getElementById("login-btn").style.background = "#0076cb";
                $('#loginPopup').html(result);
            }
        });
    });
});

// Signup
$(function(){
    $('#registrationForm').on('submit', function(e) {
        console.log("here");
        e.preventDefault();

        var data =  $(this).serialize();
        $.post('/signup', data, function(result) {
            if(result.valid && result.valid === true)
            {
                console.log(result);
            }
            else
            {
                if(result == "You have successfully registered, please login."){
                    $('.login-form').show();
                    $('.signup-form').hide();
                    $('.login-swap').addClass('active-swap');
                    $('.signup-swap').removeClass('active-swap');
                    $('.login-signup-form-wrapper').fadeIn(300);
                    var message = "<div id=\"signupSuccesMsg\" style=\"text-align: center;color: green;font-size: small;margin-bottom: 10px;\">" + result + "</div>";
                    $('#signupMessage').html(message);
                }else{
                    var message = "<div id=\"signupErrorMsg\" style=\"text-align: center;color: red;font-size: small;margin-bottom: 10px;\">" + result + "</div>";
                    $('#signupMessage').html(message);
                }
            }
        });
    });
});

/** Login & Signup END **/