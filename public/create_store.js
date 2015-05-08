/**
 * Created by kting_000 on 5/8/2015.
 */
$(document).ready(function () {
    $('#createStoreBtn').click( function(event){
        event.preventDefault();
        var payload = {
            Store_Number: $('#Store_Number').val(),
            Address: $('#Address').val()

        };

        $.ajax({
            url: $("#create_store_form").attr("action"),
            type: "POST",
            contentType: "application/json",
            processData: false,
            data: JSON.stringify(payload),
            complete: function(data) {
                console.log(data.responseText);
                $('#output').html(data.responseText);
                $('#output').show();
            }
        });
    });
});