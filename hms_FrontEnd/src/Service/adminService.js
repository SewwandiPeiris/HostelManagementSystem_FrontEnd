import axios from "axios";


export const getAllProspectiveStudent=(token)=>axios.get("http://localhost:8081/api/user/get-all-prospective-student",{
    headers: {
        Authorization: `Bearer ${token}`, // Attach token
        "Content-Type": "application/json",
    },
});

export const getAllHostel=(token)=>axios.get("http://localhost:8081/api/hostel/get-all-hostal",{
    headers: {
        Authorization: `Bearer ${token}`, // Attach token
        "Content-Type": "application/json",
    },
});

export const getAllRooms=(token)=>axios.get("http://localhost:8081/api/room/get-all-room",{
    headers: {
        Authorization: `Bearer ${token}`, // Attach token
        "Content-Type": "application/json",
    },
});

// Add Room in  to Hostel
export const addRoom=(token,room)=>axios.post("http://localhost:8081/api/room/add-room",room,{
    headers: {
        Authorization: `Bearer ${token}`, // Attach token
        "Content-Type": "application/json",
    },
});
