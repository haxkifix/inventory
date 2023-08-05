<?php

// Establish a connection to your MySQL database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "inventory";
$username = $_POST['username'];

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve product data from the database
$sql = "SELECT * FROM users where username==$username ";
$result = $conn->query($sql);

$products = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

$conn->close();

// Output the product data in JSON format
header('Content-Type: application/json');
echo json_encode($users);
?>
