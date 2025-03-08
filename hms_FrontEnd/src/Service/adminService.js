import axios from "axios";


export const getAllProspectiveStudent=(token)=>axios.get("http://localhost:8081/api/user/get-all-prospective-student",{
    headers: {
        Authorization: `Bearer ${token}`, // Attach token
        "Content-Type": "application/json",
    },
});