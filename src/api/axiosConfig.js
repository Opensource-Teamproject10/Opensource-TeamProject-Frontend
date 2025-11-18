import axios from "axios";

// 1. 기본 baseURL을 설정한 axios 인스턴스를 생성합니다.
const api = axios.create({
    baseURL: "http://localhost:8081", // 서버의 기본 URL
    headers: {
        "Content-Type": "application/json",
    },
});

// 2. 요청 인터셉터(Request Interceptor) 설정
// : api 인스턴스를 통해 요청을 보낼 때마다 이 함수가 먼저 실행됩니다.
api.interceptors.request.use(
    (config) => {
        // localStorage에서 토큰을 가져옵니다.
        const token = localStorage.getItem("token");

        if (token) {
            // 토큰이 있다면, 모든 요청의 Authorization 헤더에 토큰을 추가합니다.
            // (형식: "Bearer <토큰>")
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config; // 설정된 config를 반환해야 요청이 계속됩니다.
    },
    (error) => {
        // 요청 에러 처리
        return Promise.reject(error);
    }
);

export default api;