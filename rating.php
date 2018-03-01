<?php

   	include('../config/config.inc.php');
	include('../init.php');

	$theme = $_POST['post_theme'];

	if (isset($_POST['post_likes']) && isset($_POST['post_theme'])) {	

		$sql = "SELECT likes FROM ratings WHERE theme='$theme'";
		$totalLikes = Db::getInstance()->getValue($sql);

		echo $totalLikes;
	}

	if (isset($_POST['post_dislikes']) && isset($_POST['post_theme'])) {

		$sql = "SELECT dislike FROM ratings WHERE theme='$theme'";
		$totalDislike = Db::getInstance()->getValue($sql);

		echo $totalDislike;
	}


	if (isset($_POST['post_like']) && !isset($_COOKIE['rating-mirjan']) && isset($_POST['post_theme'])) {

		Db::getInstance()->ExecuteS("UPDATE ratings SET likes=likes+1,total_votes=total_votes+1 WHERE theme='$theme'");

		$cookie_name = "rating-mirjan";
		$cookie_value = "Like";

		setcookie($cookie_name, $cookie_value, time() + (365 * 24 * 60 * 60), "/");

	}


	if (isset($_POST['post_dislike']) && !isset($_COOKIE['rating-mirjan']) && isset($_POST['post_theme'])) {

		Db::getInstance()->ExecuteS("UPDATE ratings SET dislike=dislike+1,total_votes=total_votes+1 WHERE theme='$theme'");

		$cookie_name = "rating-mirjan";
		$cookie_value = "Dislike";
		
		setcookie($cookie_name, $cookie_value, time() + (365 * 24 * 60 * 60), "/");

	}


	if(isset($_POST['post_message'])) {

		$to      = 'milosz.sulkowski@meblemirjan.pl';
		$subject = $_POST['post_theme'].' - dislike';
		$message = $_POST['post_message'];

		mail($to, $subject, $message);
	}