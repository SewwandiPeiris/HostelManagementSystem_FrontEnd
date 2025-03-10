import axios from 'axios';
import { jwtDecode  } from 'jwt-decode';

export const loginToApplyForm=(loginDto)=> axios.post("http://localhost:8081/api/student/login", loginDto);

export const loginStudentProfile=(loginDto)=> axios.post("http://localhost:8081/api/main/login",loginDto);


export const decodeJwtToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded; // Return decoded payload
    } catch (error) {
      console.error("Invalid Token:", error);
      return null;
    }
};