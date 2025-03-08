import axios from 'axios';


export const prospectiveStudentSave=(prospectiveStudent)=>axios.post("http://localhost:8081/api/student/save-prospective-student",prospectiveStudent);

export const getprospectiveStudentById=(id,token)=>axios.get("http://localhost:8081/api/student/get-student-byID/"+id, {
    headers: {
        Authorization: `Bearer ${token}`, // Attach token
        "Content-Type": "application/json",
      },
});


export const getEligibleStudentByEmail=(email,token)=>axios.get("http://localhost:8081/api/student/get-eligible-student/"+ email, {
    headers: {
        Authorization: `Bearer ${token}`, // Attach token
        "Content-Type": "application/json",
      },
} );