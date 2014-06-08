<!DOCTYPE html public "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/tr/HTML401/loose.dtd">
<?php

$l = 0; #inital state of login success
$uname = trim($_GET["u"]);
$passId = trim($_GET["p"]);
$pwd = trim($_GET["pwd"]);
$r = "fail";

$u = "";
$p = "";

#read passwords
$handle = fopen("passwords.csv", "r");
if ($handle) {
  while (($line = fgets($handle)) !== false && $l==0) {
    $a = explode(',', $line);
      if (($a[0] == $passId) && ($a[1] == $uname) && (trim($a[2]) == $pwd)) {
      $l = 1;
   }
  }
} else {
  // error opening the file.
} 
fclose($handle);

#record activities 
if ($l == 1) $r = "success";

$file = fopen("records.csv","a");
$s =date('Y-m-d H:i:s').",".$uname.",".$passId.",".$r."\n";
fwrite($file,$s);
fclose($file);

#HOW TO PASS VALIDATION OUTCOME TO BRAD? $l or $r?
print 'done';
?>