<?php
  $userName = $_REQUEST["name"];
  $userEmail = $_REQUEST["email"];
  $to = "info@empiretoken.world";
  $msg = $_REQUEST["message"];
  $subject = "Message from $name";

  // Format the message
  $msg = wordwrap($msg, 70);
  // Escape '.' chars on the first line (otherwise they may be removed on windows servers
  $msg = str_replace("\n.", "\n..", $msg);

  $msg = "Sender's email: $userEmail\nSender's name: $userName\n\nMessage:\n$msg";

  // Send the mail
  mail($to, $subject, $msg);

?>
