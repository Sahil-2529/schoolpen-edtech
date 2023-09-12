import axios from "axios";

const url="###";

export const addLesson = (lessonData) => {
    return axios.post(`${url}/lesson`, lessonData);
  };
  
  
  export const getLesson = (lessonId) => {
    return axios.get(`${url}/lesson/${lessonId}`);
  };
  
  export const getAllLessons = () => {
    return axios.get(`${url}/lessons`);
  };
  
  
  export const startLesson = (lessonId, userId) => {
    return axios.put(`${url}/lesson/${lessonId}/start?user_id=${userId}`);
  };
  
 
  export const resumeLesson = (userId) => {
    return axios.get(`${url}/lesson/resume?user_id=${userId}`);
  };
  
  
  export const completeLesson = (lessonId, userId) => {
    return axios.put(`${url}/lesson/${lessonId}/complete?user_id=${userId}`);
  };
  
  
  export const getCompletedLessons = (userId) => {
    return axios.get(`${url}/user/${userId}/completed_lessons`);
  };