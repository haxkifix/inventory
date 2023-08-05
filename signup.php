<?php
// Placeholder code for signup validation

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Basic validation checks
    if (empty($username) || empty($password) || empty($confirm_password)) {
        // If any field is empty, redirect back to the signup page with an error message
        header("Location: signup.html?error=empty_fields");
        exit();
    }

    if ($password !== $confirm_password) {
        // If passwords don't match, redirect back to the signup page with an error message
        header("Location: signup.html?error=password_mismatch");
        exit();
    }

    // Hash the password using Bcrypt
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Establish a connection to the local database
    $db_host = 'localhost';
    $db_user = 'root';
    $db_pass = '';
    $db_name = 'inventory';

    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if the username already exists in the database
    $query = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Username already exists, redirect back to the signup page with an error message
        header("Location: signup.html?error=username_taken");
        exit();
    }

    // Insert new user credentials into the database
    $insert_query = "INSERT INTO users (username, password) VALUES (?, ?)";
    $insert_stmt = $conn->prepare($insert_query);
    $insert_stmt->bind_param("ss", $username, $hashed_password);

    if ($insert_stmt->execute()) {
        // Signup successful, redirect to the login page with a success message
        header("Location: index.html?signup=success");
        exit();
    } else {
        // Something went wrong with the database insertion
        header("Location: signup.html?error=database_error");
        exit();
    }

    // Close the database connection
    $stmt->close();
    $insert_stmt->close();
    $conn->close();
}
?>
