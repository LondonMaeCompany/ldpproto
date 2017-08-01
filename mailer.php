<?php

$errorMSG = "";

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Name is required... ";
} else {
    $name = $_POST["name"];
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Email is required... ";
} else {
    $email = $_POST["email"];
} 

// MESSAGE
if (empty($_POST["message"])) { 
    $errorMSG .= "Message is required... ";
} else {
    $message = $_POST["description"];
}

$company = $_POST["company"];
$phone = $_POST["phone"];
$address = $_POST["address"];
$location = $_POST["location"]; 

$EmailTo = "archiemoreno777@gmail.com";
$Subject = "Lock Down Protection Contact Form";

// prepare email body text
$Body = ""; 
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Company: ";
$Body .= $company;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Phone: ";
$Body .= $phone;
$Body .= "\n";
$Body .= "Address: ";
$Body .= $address;
$Body .= "\n";
$Body .= "Location: ";
$Body .= $location;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "Your Email Has Been Sent";
}else{ 
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}

?>