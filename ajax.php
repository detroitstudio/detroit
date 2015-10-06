<?php

$type   = $_POST['type'];
$email  = strip_tags($_POST['email']);

$username   = 'detroit_www';
$password   = 'aLk5.AsLo98§';
$dbname     = 'detroit';

$conn = new mysqli("localhost", $username, $password, $dbname);

$conn->set_charset("utf8");

if ($conn->connect_error)
    die("Connection failed: ".$conn->connect_error);

if ($type == 'newsletter') {
    $sql = mysqli_query($conn, "SELECT * FROM Newsletter WHERE email='".$email."'");

    if(mysqli_num_rows($sql) > 0) {
        echo json_encode(array("result" => "Exist"));
    } else {
        $sql = $conn->prepare("INSERT INTO Newsletter (email) VALUES (?)");

        $sql->bind_param("s", $email);

        if ($sql->execute() === TRUE)
            echo json_encode(array("result" => "OK"));
        else
            echo json_encode(array("result" => "Error"));
    }
} else if ($type == 'form') {
    $name       = strip_tags($_POST['name']);
    $message    = strip_tags($_POST['message']);
    
    $from = $to = 'info@detroit.sk';
    $subject = 'Správa odoslaná z formulára';
    
    $emailMessage = '
        <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
                <title>Announce</title>
            </head>
            <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
                Návštevník '.$name.' vám z emailovej adresy '.$email.' poslal nasledovnú správu:
                <br /><br />
                '.$message.'
            </body>
        </html>';
     
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $headers .= 'To: '.$to."\r\n";
    $headers .= 'From: '.$from."\r\n";
    
    mail($to, $subject, $emailMessage, $headers);
}

$conn->close();