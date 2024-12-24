"use client";

import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
    email: "",
    phone: "",
    address: "",
  });

  // Explicitly type the event parameter as React.ChangeEvent<HTMLInputElement>
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Explicitly type the event parameter as React.FormEvent<HTMLFormElement>
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/mysql/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Student added successfully!");
        setFormData({
          name: "",
          age: "",
          grade: "",
          email: "",
          phone: "",
          address: "",
        });
      } else {
        alert(data.error || "Failed to add student");
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div className="">
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade"
          value={formData.grade}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}
