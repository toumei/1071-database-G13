$(document).ready(function () {

    $("#Form").submit(function (event) {
        event.preventDefault();
        var option = {
            type: "POST",
            url: window.location
        }
        ajax(option);
    });

    $("#add").click(function (event) {
        event.preventDefault();
        var option = {
            type: "POST",
            url: window.location + "/add",
            data: {}
        }
        ajax(option);
    });

    $("#edit").click(function (event) {
        event.preventDefault();
        ajax(option);
    });

    $("#delete").click(function (event) {
        event.preventDefault();
        ajax(option);
    });

    function ajax(option) {
        $.ajax({
            type: option.type,
            url: option.url,
            cache: false,
            async: true,
            data: JSON.stringify(option.data),
            contentType: "application/json",
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Accept", "application/json;charset=UTF-8");
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.setRequestHeader(
                    "Authorization", localStorage.getItem('token', data.token)
                );
            }
        });
    }
})
