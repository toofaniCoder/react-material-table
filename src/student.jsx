import { useParams } from "react-router-dom";

import STUDENTS from "./students.json";
export default function Student() {
  const params = useParams();
  const student = STUDENTS.find((student) => student.id == params.id);
  return (
    <div>
      <h1> student ID: {params.id}</h1>
      <hr />
      <p>{student.name}</p>
      <p>{student.phone}</p>
    </div>
  );
}
