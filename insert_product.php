<?php
// Retrieve JSON data from the request
$newProduct = json_decode(file_get_contents('php://input'), true);

// Assuming you have a MySQL database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "inventory";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($newProduct['categories']=='c1') {
    $table_name = 'products';
} 
if ($newProduct['categories']=='c2') {
    $table_name = 'shoes';
}

// Prepare and execute the SQL INSERT query
$stmt = $conn->prepare("INSERT INTO $table_name (id, name, description, status, price, count) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("isssdi", $newProduct['id'], $newProduct['name'], $newProduct['description'], $newProduct['status'], $newProduct['price'], $newProduct['count']);

if ($stmt->execute()) {
  echo json_encode(array("message" => "Product inserted successfully"));
} else {
  echo json_encode(array("message" => "Product insertion failed"));
}

$stmt->close();
$conn->close();
?>
