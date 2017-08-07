<?php function get_contact_us_correct_link() { ?>
<script type="text/javascript">
jQuery(document).ready(function($) {
	if($('#footer-check').hasClass('footer-small'))
		{
			// alert($("#footer-check").hasClass("footer-small"));
			$( "#mainctalink" )
			.html( "<a href='#' data-toggle='modal' data-target='#contactpopup' class='main-cta trn500ms'>Get In Touch</a>" );
		}
	else {
		// IF False
		$( "#mainctalink" )
			.html( "<a href='#footerForm' id='main-cta' class='main-cta trn500ms'>Get In Touch</a>" );
	}
});
</script>
<?php } ?>
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <title>Lock Down Protection - Home</title>
  <meta content="" name="description" />
  <meta content="" name="keywords" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta content="telephone=no" name="format-detection" />
  <meta name="HandheldFriendly" content="true" />
  <link rel="stylesheet" href="assets/css/master.css" />
  <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet">
  <link rel="icon" type="image/x-icon" href="favicon.ico" />
  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
  <script src="assets/js/jquery.js"></script>
</head>
<body class="body-offcanvas">
  <div id="page-preloader"><span class="spinner"></span></div>

  <div class="l-theme animated-css">
    <header class="header header_mod-a animated fadeIn">
    	<div class="visible-xs navbar-fixed-top mobile-header">
			<a class="navbar-brand logo space trn800ms" href="#">
				<img src="assets/media/general/logo-resized3.png" alt="Logo" class="logo__img2 img-responsive2 trn500ms" />
			</a>
    		<button type="button" class="navbar-toggle offcanvas-toggle" data-toggle="offcanvas" data-target="#js-bootstrap-offcanvas">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
		</div>
		<nav class="navbar navbar-offcanvas navbar-offcanvas-right navbar-offcanvas-touch navbar-fixed-top" id="js-bootstrap-offcanvas">
		  <div class="container-fluid no-left-padding">
			<div class="navbar-header">
			  <a class="navbar-brand logo space trn800ms hidden-xs" href="#">
			  	<img src="assets/media/general/logo/logo-resized3.png" alt="Logo" class="logo__img2 img-responsive2 trn500ms" />
			  </a>
			  <div class="clearfix"></div>
			</div>

			<div class="collapse2 navbar-collapse2">
			  <ul class="nav navbar-nav navbar-left">
                      <li class="dropdown"><a class="trn500ms" href="home.php">Home</a></li>
                      <li><a class="trn500ms" href="about.php">Who We Are</a></li>
                      <li class="dropdown"><a class="trn500ms" href="services.php">What We Offer</a> </li>
			  </ul>
			  <ul class="nav navbar-nav navbar-right">
                      <li class="dropdown"><a class="trn500ms" href="support.php">Software & Support</a>
                        <ul role="menu" class="dropdown-menu">
                          <li><a class="trn500ms" href="software.php">Software Downloads</a></li>
                          <li><a class="trn500ms" href="how-to-videos.php">How to Videos</a></li>
                        </ul>
                      </li>


                      <li class="social-net__item hidden-xs"><a href="https://www.facebook.com/lockdownprotectioninc/" class="social-net__link"><i class="icon fa fa-facebook"></i></a></li>

                      <li id="mainctalink" class="last-menu-item">
                      	<a href="#footerForm" id="main-cta" class="main-cta trn500ms">Get In Touch</a>
                      	<?php get_contact_us_correct_link(); ?>
                      </li>
			  </ul>
			</div><!-- /.navbar-collapse -->
		  </div><!-- /.container-fluid -->
		</nav>
    </header>
    <!-- end header-->
