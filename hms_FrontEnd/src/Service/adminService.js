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

export const getAllProspectiveStudentByFilter=(token,param)=>axios.get("http://localhost:8081/api/user/get-all-bySalaryOrDistanceOrGender",{
    headers: {
        Authorization: `Bearer ${token}`, // Attach token
        "Content-Type": "application/json",

    },
    params:param
});

export const updateStudentStatus=(token,param)=>axios.put("http://localhost:8081/api/user/update-status/",null,{
    headers: {
        Authorization: `Bearer ${token}`, // Attach token
        "Content-Type": "application/json",
    },
    params:param
});


export const getAllEligibleStudent=(token)=>axios.get("http://localhost:8081/api/user/get-all-eligible-student",{
    headers: {
        Authorization: `Bearer ${token}`, // Attach token
        "Content-Type": "application/json",
    },
});

export const getRoomByHostelId=(id,token)=>axios.get("http://localhost:8081/api/room/get-room-hostelId/"+id, {
    headers: {
        Authorization: `Bearer ${token}`, // Attach token
        "Content-Type": "application/json",
    },
});


export const addEligibleStudent=(token,student)=>axios.post("http://localhost:8081/api/user/save-user",student,{
    headers: {
        Authorization: `Bearer ${token}`, // Attach token
        "Content-Type": "application/json",
    },
});


export const updateHostelAndRoomCapacity=(token,hostelId,commonDto)=>axios.put("http://localhost:8081/api/hostel/update-hostel-capacity/"+hostelId,commonDto,{
    headers: {
        Authorization: `Bearer ${token}`, // Attach token
        "Content-Type": "application/json",
    },
});

export const deleteEligibleStudent=(token,id)=>axios.delete("http://localhost:8081/api/user/delete-eligible-student/"+id,{
    headers: {
        Authorization: `Bearer ${token}`, // Attach token
        "Content-Type": "application/json",
    },
});

export const deleteRoomById=(token,id)=>axios.delete("http://localhost:8081/api/room/delete-room/"+id,{
    headers: {
        Authorization: `Bearer ${token}`, // Attach token
        "Content-Type": "application/json",
    },
});

export const addHostel=(token,hostel)=>axios.post("http://localhost:8081/api/hostel/add-hostel",hostel,{
    headers: {
        Authorization: `Bearer ${token}`, // Attach token
        "Content-Type": "application/json",
    },
});









