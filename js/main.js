
$('#callbackFormConsult, #callbackForm, #callbackForm1, #callbackForm2, #callbackForm3, #callbackForm4, #callbackForm5, #callbackForm6, #callbackForm7, #callbackForm8').submit(function() {
  form_id = this['id'];  
    $.ajax({
      type: "POST",
      url: "send.php",
      data: $(this).serialize()
    }).done(function(ans) {
      if (ans.success===false){
        $(".popup-"+form_id+"").hide();
        $("#popup-rezult").show();
        $(".false-rezult").show();
      }else{
        $("#popup-"+form_id+"").hide();
        $("#popup-rezult").show();
        $("#"+form_id+" input").val("");
        $('.modal').show();$(".true-rezult1").show();

        yaCounter89971711.reachGoal('Zayavka');

      }
    });
    return false;  
});

////////////////////////////////////////
$(document).ready(function() {
//////////////////////////////////////////////////////
	var phones = [{ "mask": "+7 (*99) 999 - 99 - 99"}, { "mask": "+7 (*99) 999 - 99 - 99"}];
  	  $('._phone').inputmask({ 
        mask: phones, 
        greedy: false, 
    	definitions: {'*': {validator: "[9]"}}
	  });

   

//////////////////////////////////////////////////////
    $( ".faq-item" ).click(function() {
		$(this).children( ".faq-text" ).toggle( "slow", function() {});
		if($(this).hasClass("open-faq")){
			$(this).removeClass("open-faq");
			$(this).children(".faq-arrow").css({"transform": "none"});
		}else{
			$(this).addClass("open-faq");
			$(this).children(".faq-arrow").css({"transform": "scale(1, -1)"});

		}
	});
//////////////////////////////////////////////////////
	$( "input.check-personal" ).on("change", function() {
		var btn_name="."+$(this).val();
		if($(this).is(':checked')){
			$(btn_name).removeAttr('disabled');
		}else{
			$(btn_name).attr('disabled','disabled');
		}
        
    });


//////////////////////////////////////////////////////
	$('.btn-popup').click(function() {
		$(".modal-content").hide();
		$("#popup-rezult").hide();$(".true-rezult1").hide();$(".false-rezult").hide();
	    window.popup_id = $('#' + $(this).attr("rel"));


	    $(popup_id).show();
	    $('.modal').show();
	});
//////////////////////////////////////////////////////
	$('.close').click(function() {
	    $('.modal').hide();
	    $(popup_id).hide();
	    $("#popup-rezult").hide();$(".true-rezult1").hide();$(".false-rezult").hide();

	    
	});
//////////////////////////////////////////////////////
	$(".modal").click( function(e){
		if ( $(e.target).closest('.modal-content').length ) {return;}
	    $('.modal').hide(); 
	    $(popup_id).hide();
	    $("#popup-rezult").hide(); $(".true-rezult1").hide();$(".false-rezult").hide();
		
	});

	$( ".form-input input" ).focus(function() {
		var el=$(this).parent();
		el.children(".input-this").show();
	});
	$( ".form-input input" ).blur(function() {
		var el=$(this).parent();
		el.children(".input-this").hide();
	});

	$('.flowing-scroll').on( 'click', function(){ 
	    var el = $(this);
	    var dest = el.attr('href'); // получаем направление
	    if(dest !== undefined && dest !== '') { // проверяем существование
	        $('html').animate({ 
	    	    scrollTop: $(dest).offset().top // прокручиваем страницу к требуемому элементу
	        }, 500 // скорость прокрутки
	        );
	    }
	    return false;
	});


});


