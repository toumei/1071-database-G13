$(document).ready(function () {

    $("#loginForm").submit(function (event) {
        event.preventDefault();
        ajaxPost();
    });


    function ajaxPost() {
        $.ajax({
            type: "POST",
            url: window.location,
            cache: false,
            async: true,
            data: JSON.stringify({
                "email": document.getElementsByName('email')[0].value,
                "pwd": document.getElementsByName('pwd')[0].value,
            }),
            contentType: "application/json",
            dataType: 'json',
            success: function (data) {
                localStorage.setItem('token', data.token);
                $("#email").val("");
                $("#pwd").val("");
                window.location = '/';
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
                console.log(XMLHttpRequest.responseText);
            }
        });
    }
})
