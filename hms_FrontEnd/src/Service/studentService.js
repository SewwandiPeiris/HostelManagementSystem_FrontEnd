import axios from 'axios';
 
export const prospectiveStudentSave=(prospectiveStudent)=>axios.post("http://localhost:8081/api/student/save-prospective-student",prospectiveStudent);