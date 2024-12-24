"use client";

import { useEffect, useState } from "react";
interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
  email?: string;
  phone?: string;
  address?: string;
  created_at?: string;
  updated_at?: string;
}
export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  useEffect(() => {
    // Fetch student profiles
    fetch("/mysql/students")
      .then((res) => res.json())
      .then((data) => setStudents(data.students))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  return (
    <div className=" bg-white h-[40rem]">
      <h1 className="text-black">Student Profiles</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id} className="text-black">
            {student.name}, Age: {student.age}, Grade: {student.grade}
          </li>
        ))}
      </ul>
    </div>
  );
}
