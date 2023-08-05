<?php
// Include any necessary configurations or database connections here

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the product ID from the POST request
    $productID = $_POST["product_id"];

    // Replace with your database credentials and connection code
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

    // Implement the logic to delete the product from your database using the provided product ID
    $sql = "DELETE FROM products WHERE id = $productID";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Product removed successfully"]);
    } else {
        echo json_encode(["message" => "Failed to remove product"]);
    }

    $conn->close();
}
?>
