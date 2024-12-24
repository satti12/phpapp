import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

// MySQL connection configuration
const connectionConfig = {
  host: "localhost", // MySQL server host
  user: "root", // MySQL username
  password: "1234", // MySQL password
  database: "students", // Name of your database
};

export async function POST(request: NextRequest) {
  let connection;
  try {
    const body = await request.json(); // Parse the incoming request body

    const { name, age, grade, email, phone, address } = body;

    if (!name || !age || !grade) {
      return NextResponse.json(
        { error: "Name, age, and grade are required" },
        { status: 400 }
      );
    }

    // Establish a MySQL connection
    connection = await mysql.createConnection(connectionConfig);

    // Insert data into the 'std_profile' table
    const query = `
      INSERT INTO std_profile (name, age, grade, email, phone, address, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;
    const values = [
      name,
      age,
      grade,
      email || null,
      phone || null,
      address || null,
    ];

    await connection.execute(query, values);

    // Respond with success
    return NextResponse.json({ message: "Student added successfully!" });
  } catch (error) {
    console.error("Error adding student:", error);
    return NextResponse.json(
      { error: "Error adding student" },
      { status: 500 }
    );
  } finally {
    if (connection) {
      // Close the MySQL connection
      await connection.end();
    }
  }
}
export async function GET(request: NextRequest) {
  let connection;
  try {
    // Create a MySQL connection
    connection = await mysql.createConnection(connectionConfig);

    // Query to fetch all student profiles from the 'std_profile' table
    const [rows] = await connection.execute("SELECT * FROM std_profile");

    // Send the response with the student profiles
    return NextResponse.json({ students: rows });
  } catch (error) {
    console.error("Error fetching student profiles:", error);
    return NextResponse.json(
      { error: "Error fetching student profiles" },
      { status: 500 }
    );
  } finally {
    if (connection) {
      // Disconnect from MySQL database
      await connection.end();
    }
  }
}
