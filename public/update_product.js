/**
 * Created by kting_000 on 5/7/2015.
 */
$(document).ready(function () {
    $('#updateProductBtn').click( function(event){
        event.preventDefault();
        var payload = {
            Brand: $('#Brand').val(),
            Product_Name: $('#Product_Name').val(),
            VSN: $('#VSN').val(),
            Price: $('#Price').val(),
            UPC: $('#UPC').val()
        };

        $.ajax({
            url: $("#update_product_form").attr("action"),
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