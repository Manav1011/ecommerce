$(document).ready(function() {
    var ContactForm=$('.contact_form')
    var actionEndPoint=ContactForm.attr('action');
    var method=ContactForm.attr('method');
    ContactForm.submit(function(event){
        event.preventDefault();
        var data=ContactForm.serialize();
        $.ajax({
            method:method,
            url:actionEndPoint,
            data:data,
            success:function(response) {
                ContactForm[0].reset();
                $.alert({
                    title: 'Success!',
                    content:"Thank you for submission",
                    theme:'modern'
                })
                console.log(response);
            },
            error:function(errorData){
                $.alert({
                    title: 'Error!',
                    content:"Oops Some Eror Occured",
                    theme:'modern'
                })
            }
        })
    })

});