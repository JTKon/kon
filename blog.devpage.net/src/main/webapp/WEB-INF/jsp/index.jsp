<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="blog for Devpage.net">
    <meta name="author" content="kon">
    <link rel="icon" href="http://static.devpage.net/favicon.ico">

    <title>Blog for Devpage.net</title>

    <!-- Bootstrap core CSS -->
    <link href="http://static.devpage.net/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="http://static.devpage.net/blog.devpage.net/css/blog.css" rel="stylesheet">
	
  </head>

  <body>

    <div class="blog-masthead">
      <div class="container">
        <nav class="blog-nav">
          <a class="blog-nav-item active" id="goHome" href="#">Home</a>
		  <a class="blog-nav-item" id="btnSignin" target="_blank" href="http://static.devpage.net/auth.devpage.net/html/signin.html">SignIn</a>
        </nav>
      </div>
    </div>

    <div class="container">

      <div class="blog-header">
        <h1 id="blog-title" class="blog-title">Devpage.Net Blog</h1>
        <p id="blog-description" class="lead blog-description">안녕하신가! 힘세고 강한 아침, 만일 내게 물어보면 나는 kon.</p>
      </div>

      <div class="row" id="blog-middle">

        <div id="blog-main" class="col-sm-8 blog-main">
			
	      <div id="blogContents"></div>
          
          <!--
          <nav>
            <ul class="pager">
              <li><a href="#">Previous</a></li>
              <li><a href="#">Next</a></li>
            </ul>
          </nav>
          -->

        </div><!-- /.blog-main -->

        <div id="blog-sidebar" class="col-sm-3 col-sm-offset-1 blog-sidebar">
          <div class="sidebar-module sidebar-module-inset">
			<p align="center"><img src="http://static.devpage.net/blog.devpage.net/img/work_in_progress.png" alt="work in progress" /></p>
            <h4>About</h4>
			<p>Blog.Devpage.Net은<br> kon씨가 이것저것 하기 위해서<br> 만든 블로그 입니다.</p>
			<p>보시다시피 공사중입니다.</p>
          </div>
          <div class="sidebar-module">
            <h4>Archives</h4>
			<ol id="archive-list" class="list-unstyled">
              <li><a href="#">Gossip</a></li>
              <li><a href="#">DevpageNet</a></li>
              <li><a href="#">unclassified</a></li>
            </ol>
          </div>
          <div class="sidebar-module">
            <h4>Elsewhere</h4>
            <ol class="list-unstyled">
			  <li><a href="https://github.com/JTKon/kon">GitHub</a></li>
              <li><a href="https://www.facebook.com/devpage.net">Facebook</a></li>
            </ol>
          </div>
        </div><!-- /.blog-sidebar -->

      </div><!-- /.row -->

    </div><!-- /.container -->

    <footer class="blog-footer">
      <p>Blog for <a href="http://blog.devpage.net">Devpage.net</a></p>
	  <p>You can contect by email : <a href="mailto:kon@devpage.net">kon@devpage.net</a></p>
      <p>
        <a href="#">Back to top</a>
      </p>
    </footer>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <!-- If you need to support older browsers like Internet Explorer 6-8, Opera 12.1x or Safari 5.1+, use jQuery 1.12. -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="http://static.devpage.net/bootstrap/js/bootstrap.min.js"></script>
	<script src="http://static.devpage.net/blog.devpage.net/js/common.js"></script>
	<script src="http://static.devpage.net/blog.devpage.net/js/index.js"></script>
  </body>
</html>