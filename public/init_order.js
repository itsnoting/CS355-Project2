/**
 * Created by kting_000 on 5/7/2015.
 */
$(document).ready(function () {
    $('#orderCreateBtn').click( function(event){
        event.preventDefault();
        var payload = {
            EmployeeID: $('#EmployeeID').val(),
            StoreID: $('#StoreID').val()
        };

        $.ajax({
            url: $("#create_order_form").attr("action"),
            type: "POST",
            contentType: "application/json",
            processData: false,
            data: JSON.stringify(payload),
            complete: function(data) {
                console.log(data.responseText);
                if(data){
                    window.location.replace('/product/all')
                }
            }
        });
    });
});