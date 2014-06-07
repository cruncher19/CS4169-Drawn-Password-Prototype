<!DOCTYPE html public "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/tr/HTML401/loose.dtd">
<?php
 //get p1,p2,p3 username, pass
 //?p=1&u=tanja&pwd=abc
$l = 0; #inital state of login success
$uname = $_POST["u"];
$passId = 0;
$r = "fail";

if (isset($_POST["login1"])) {
  $passId = 1;
#change later when grid done
$pwd = $_GET["userPwd"];
}
else if (isset($_POST["login2"])) {
  $passId = 2;
}
else if (isset($_POST["login3"])) {
  $passId = 3;
}

$u = "";
$p = "";

#read passwords
$handle = fopen("passwords.csv", "r");
if ($handle) {
  while (($line = fgets($handle)) !== false) {
   $a = explode(',', $line);
   $parts = explode('.', $string);
   if ($a[1] == $id && $a[2] = $uname && $a[3] = $pwd) {
   $r = "success";
   }

  }
} else {
  // error opening the file.
} 
fclose($handle);

#record activities 
$file = fopen("records.csv","a");
$s =date('Y-m-d H:i:s').",".$uname.",".$passId.",".$r."\n";
fwrite($file,$s);
fclose($file);


#redirect back to login at the end
#header('Location: index.html?u=3');
#validate.php


print "done";
?>