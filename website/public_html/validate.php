<!DOCTYPE html public "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/tr/HTML401/loose.dtd">
<?php

$l = 0; #inital state of login success
$uname = $_POST["u"];
$passId = $_POST["p"];
$pwd = $_POST["pwd"];
$r = "fail";

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
#HOW TO PASS VALIDATION OUTCOME TO BRAD?
?>