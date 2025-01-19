import axios from 'axios';

export const loginToApplyForm=(loginDto)=> axios.post("http://localhost:8081/api/student/login", loginDto);