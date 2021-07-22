

/*nav*/
$(document).ready(function(){
        
    });
$(document).ready(function(){
    $('#menu').slicknav();
    
    $('#menu > li > a').mouseenter(function(){
        $(this).addClass('active');
        $(this).next().slideDown(300);
        
    });
    $('#menu > li').mouseleave(function(){
        $(this).find('a.active').removeClass('active');
        $(this).find('ul').hide();
    });
});


/*popup*/
$(function() {

    $('a[href="#popup2"],a[href="#popup3"]').click(function(event) {
      event.preventDefault();
      $(this).modal({
        closeExisting: false
      });
    });

});





