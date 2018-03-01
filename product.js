$(document).ready(function() {
	var cmsList = getTipContent();

	$('.tip').each(function() {

		$(this).on( "click", function(){
			if ($('#podpowiedz').length < 1) {
				getTipContent();
				addTipContent();
				setTimeout(function() {
					getLikeVal();
					getDislikeVal();
					setupComment();
				},100);
			}
			else {
				$('#podpowiedz').fadeIn(400);
				$('.tip-overlay').fadeIn(400);
			}
			$(this).find('#podpowiedz').addClass('tip-open');
			$('.tip-overlay').addClass('active');
		});

		$('.tip-overlay').on('click', function() {
				$('#podpowiedz').fadeOut(400);
				$(this).fadeOut(400);
				$('.tip-overlay').removeClass('active');
		});

		$(document).keyup(function(e){

		    if(e.keyCode === 27) {
		        $("#podpowiedz").fadeOut(400);
		    	$(".tip-overlay").fadeOut(400);
		    }	$('.tip-overlay').removeClass('active');
		});	
	});

	$('.tip').after('<div class="tip-overlay"></div>');

	$('.tip-overlay').on('click', function() {
		$(this).fadeOut(400);
		$('#podpowiedz').fadeOut(400);
	});

});


function addTipContent() {

	getTipContent();

	$.each(cmsList, function(k, v) {
		if (v.link_rewrite == $('.tip').attr('data-tooltip') && $('#podpowiedz').length == 0) {
			$('.tip').append('<div id="podpowiedz">' + v.content + '<div class="vote"></div></div>');
		}
	});

	$('.vote').load("/rating/rating.html");
}

function getTipContent() {

	fetch('http://mirjan24.be/content/category/4-slownik-pojec', { 
	   method: 'post', 
	   headers: {
	     'Authorization': 'Basic '+btoa('admin:admin'), 
	     'Content-Type': 'application/x-www-form-urlencoded'
	   }, 
	   body: 'A=1&B=2'
	 }).then(function(resp) {
	 	return resp.text().then(function(text) {
	 		cmsList = text;
	 	}).then(function() {
		cmsList = $.parseHTML(cmsList);
	    }).then(function() {
		cmsList = $(cmsList).find('.json').text();
		}).then(function() {
			cmsList = JSON.parse(cmsList);
			return cmsList;
		});
	});

}

function insertLike()
    {

    var theme = $('.tip').attr('data-tooltip');
	  $.ajax({
	    type: 'post',
	    url: '/rating/rating.php',
	    data: {
	      post_like:"like",
	      post_theme: theme
	    },
	    success: function (response) {
 	      $('#totalvotes').slideDown();
	    }
	    });
    }

function insertDislike()
    {

    var theme = $('.tip').attr('data-tooltip');
	  $.ajax({
	    type: 'post',
	    url: '/rating/rating.php',
	    data: {
	      post_dislike:"dislike",
	      post_theme: theme
	    },
	    success: function (response) {
 	      $('#totalvotes').slideDown();
	    }
	    });
    }

function sendComment()
    {

    var message = $('input[name=message]').val();
    var theme = $('.tip').attr('data-tooltip');

	  $.ajax({
	    type: 'post',
	    url: '/rating/rating.php',
	    data: {
	      post_message: message,
	      post_theme: theme
	    },
	    success: function (response) {
 	      alert('Dziękujemy! Twój komentarz został wysłany.');
	    }
	    });
    }

function getLikeVal() {
	var likes = $('.like_value').html();
	var theme = $('.tip').attr('data-tooltip');

	$.ajax({
		type: 'post',
		url: '/rating/rating.php',
		data: {
			post_likes: likes,
			post_theme: theme
		},
		success: function (response) {
			$('.like_value').html(response);
		}
	});
}

function getDislikeVal() {
	var dislikes = $('.dislike_value').html();
	var theme = $('.tip').attr('data-tooltip');
	
	$.ajax({
		type: 'post',
		url: '/rating/rating.php',
		data: {
			post_dislikes: dislikes,
			post_theme: theme
		},
		success: function (response) {
			$('.dislike_value').html(response);
		}
	});
}

function setupComment() {
	$('#like_button').on('click', function() {
		insertLike();
		$('#totalvotes').html('Dziękujemy za twoją ocenę.');

		if ($.cookie('rating-mirjan') != null )
			$('#totalvotes').html('Oceniłeś już tą podpowiedź.');
	});

	$('#dislike_button').on('click', function() {
		insertDislike();
		$('#totalvotes').html('Dziękujemy za twoją ocenę.');

		if ($.cookie('rating-mirjan') == null )
			$('.comment-form').fadeIn();
		else
			$('#totalvotes').html('Oceniłeś już tą podpowiedź.');

	});

	$('#comment-btn').on('click', function() {
		if ($('.email-message').val() != '' && $('.email-message').val() != $('')) {
			sendComment();
		}
		else
			$('.email-message').css('border', '1px solid red').css('background', '#fff0f0').attr('placeholder', 'Wypełnij pole');
	});
}