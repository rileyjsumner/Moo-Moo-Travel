<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</head>
<div class="hh_drop_down">
<ul class="hh_main">

   <li class="hh_main_menu">
    <a href="javascript:void(0);" class="hh_sf">Chemicals</a>
     <ul class="hh_inner">
        <li><a href="#">Additives / Boosters</a></li>
        <li><a href="#">Anti-Allergen</a></li>
        <li><a href="#">Concrete</a></li>
    </ul>
  </li>

  <li  class="hh_main_menu" >
    <a class="hh_sf" href="#">Equipment</a>
      <ul class="hh_inner">
        <li><a href="#">Deodorization</a></li>
        <li><a href="#">Duct Cleaning Equipment</a></li>
        <li><a href="#">Hard Surface</a></li>
     </ul>

  </li>

   <li  class="hh_main_menu" >
     <a class="hh_sf" href="#">Accessories</a>
      <ul class="hh_inner">
          <li><a href="#">Bonnets/Pads</a></li>
          <li><a href="#">Brush/Rake/Sponge</a></li>
        <li><a href="#">Carpet Rakes</a></li>
      </ul>
   </li>

</ul>
</div>
<script>
$(".hh_sf").next().addClass("collapsed").slideUp();

$(".hh_main").on('click', '.hh_sf', function (event) {
            event.preventDefault();
            var currentClass = $(this).next().prop('class');
            if (currentClass == "hh_inner expanded") {
                $(this).next().removeClass("expanded");
                $(this).next().addClass("collapsed");
                $(this).next().slideUp();
            } else {
                $(".expanded").slideUp().addClass("collapsed").removeClass("expanded");

                $(this).next().removeClass("collapsed");
                $(this).next().addClass("expanded");
                $(this).next().slideDown();
            }

        });
</script>
</body>
</html>