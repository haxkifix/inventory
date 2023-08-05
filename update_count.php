<?php
// Assuming you have a database connection established
// Replace the following placeholders with your actual database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "inventory";

// Create a database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the input data from the request
$data = json_decode(file_get_contents("php://input"), true);

if(isset($data['id']) && isset($data['count'])) {
    $productId = $data['id'];
    $newCount = $data['count'];

    // Update the count in the database
    $updateQuery = "UPDATE products SET count = ? WHERE id = ?";
    $stmt = $conn->prepare($updateQuery);
    $stmt->bind_param("ii", $newCount, $productId);

    if ($stmt->execute()) {
        $response = array("success" => true, "message" => "Count updated successfully");
    } else {
        $response = array("success" => false, "message" => "Error updating count: " . $conn->error);
    }

    $stmt->close();
} else {
    $response = array("success" => false, "message" => "Invalid input data");
}

$conn->close();

// Return JSON response
header("Content-Type: application/json");
echo json_encode($response);
?>
