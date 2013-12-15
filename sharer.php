<?php
session_start();
if(!isset($_GET["session"]))die("Forbidden.");
if(md5(session_id())!=$_GET["session"])die("Forbidden.");
$seed=(isset($_GET["seed"])?$_GET["seed"]:"");
if(!$seed)die("Forbidden");
$url=(isset($_GET["url"])?$_GET["url"]:"");
if(!$url)
{
	if(!isset($_SESSION["social-monster-share-helper".$seed]))die("Forbidden.");
	$session=@unserialize($_SESSION["social-monster-share-helper".$seed]);
	if(!is_array($session) || !isset($session["url"]))die("Error.");
	$url=$session["url"];
	$type=$session["type"];
	$title=$session["title"];
	$excerpt=$session["excerpt"];
	unset($_SESSION["social-monster-share-helper".$seed]);
}
else
{
	$session=array();
	$session["url"]=(isset($_GET["url"])?$_GET["url"]:"");
	if(!$session["url"])die("Error.");
	$session["type"]=(isset($_GET["type"])?$_GET["type"]:"");
	$session["title"]=(isset($_GET["title"])?$_GET["title"]:"");
	$session["excerpt"]=(isset($_GET["excerpt"])?$_GET["excerpt"]:"");
	$_SESSION["social-monster-share-helper".$seed]=@serialize($session);
	header("Location: sharer.php?session=".$_GET["session"]."&seed=".$seed);
	die();
}
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
	<meta http-equiv="Expires" content="Fri, Jan 01 1900 00:00:00 GMT">
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Cache-Control" content="no-cache">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Social Monster Share Redirector</title>
</head>
<body>
<script type="text/javascript">
	var t = ""<?php echo (" + \"".$type."\"");?>;
	if (t) {
		var loc = "";
		switch (t) {
			case "delicious":
				loc = "https://delicious.com/save?noui&jump=close&url=" + encodeURIComponent("<?php echo $url;?>") + "&title=" + encodeURIComponent("<?php echo str_replace("\"","\\\"",$title);?>");
				break;
			case "facebook":
				loc = "http://www.facebook.com/sharer.php?s=100&p[title]=" + encodeURIComponent("<?php echo str_replace("\"","\\\"",$title);?>") + "&p[url]=" + encodeURIComponent("<?php echo $url;?>") + "&p[summary]=" + encodeURIComponent("<?php echo str_replace("\"","\\\"",$excerpt)?>") + "&image";
				break;
			case "google-plus":
				loc = "http://plus.google.com/share?url=" + encodeURIComponent("<?php echo $url;?>");
				break;
			case "mail-ru":
				loc = "http://connect.mail.ru/share?url=" + encodeURIComponent("<?php echo $url;?>") + "&title=" + encodeURIComponent("<?php echo str_replace("\"","\\\"",$title);?>") + "&description=" + encodeURIComponent("<?php echo str_replace("\"","\\\"",$excerpt);?>") + "&imageurl=";
				break;
			case "odnoklassniki":
				loc = "http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=" + encodeURIComponent("<?php echo $url;?>") + "&st.comments=" + encodeURIComponent("<?php echo str_replace("\"","\\\"",$excerpt);?>");
				break;
			case "twitter":
				loc = "http://twitter.com/intent/tweet?status=" + encodeURIComponent("<?php echo str_replace("\"","\\\"",$title);?>.\r\n\r\n<?php echo $url;?>");
				break;
			case "vkontakte":
				loc = "http://vk.com/share.php?url=" + encodeURIComponent("<?php echo $url;?>") + "&title=" + encodeURIComponent("<?php echo str_replace("\"","\\\"",$title);?>") + "&description=" + encodeURIComponent("<?php echo str_replace("\"","\\\"",$excerpt);?>") + "&noparse=false";
				break;
		}
		if (loc) document.location.href = loc;
	}
</script>
</body>
</html>