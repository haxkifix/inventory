<?php
// Placeholder code for login validation

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Basic validation checks
    if (empty($username) || empty($password)) {
        // If username or password is empty, redirect back to the login page with an error message
        header("Location: loginindex.html?error=empty_fields");
        exit();
    }

    // Establish a connection to the local database
    $db_host = 'localhost';
    $db_user = 'root';
    $db_pass = '';
    $db_name = 'inventory';

    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare and execute the query to check user credentials
    $query = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        // Username exists in the database, check password
        $row = $result->fetch_assoc();
        $hashed_password = $row['password'];

        // Verify the password using password_verify()
        if (password_verify($password, $hashed_password)) {
            // Authentication successful
            // Set a session or cookie to authenticate the user
            // For example: $_SESSION['user'] = $username;
            header("Location: index.html"); // Redirect to the dashboard page after successful login
            exit();
        } else {
            // Invalid password, redirect back to the login page with an error message
            header("Location: loginindex.html?error=invalid_password");
            exit();
        }
    } else {
        // User does not exist, redirect back to the login page with an error message
        header("Location: loginindex.html?error=invalid_credentials");
        exit();
    }

    // Close the database connection
    $stmt->close();
    $conn->close();
}
?>
