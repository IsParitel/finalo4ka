import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";
import {fetchOneJob_page} from "./job_pageAPI";

export const registration = async (formData) => {
    const { data } = await $host.post('/api/user/registration', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const login = async (email, password) => {
    const {data} = await $host.post('/api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('/api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Пользователь не авторизован");
    }

    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const { data } = await $authHost.get(`/api/profile_page/${userId}`);
    return data; // Убедитесь, что данные включают связанные `job_create`.
};

export const fetchJobReg = async (jobPageId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error("Пользователь не авторизован");
    }

    const decoded = jwtDecode(token);
    const userId = decoded.id;

    await $authHost.post('/api/job_reg', {
        profile_pageId: userId,
        job_pageId: jobPageId,
    });

    const jobPageData = await fetchOneJob_page(jobPageId);

    return jobPageData;
};

export const deleteJobReg = async (job_pageId, profile_pageId) => {
    const { data } = await $authHost.delete(`/api/job_reg/${job_pageId}/${profile_pageId}`);
    return data;
};

export const addJobToProfile = async (job_pageId, profile_pageId) => {
    const { data } = await $authHost.post('/api/job_create', { job_pageId, profile_pageId });
    return data;
};

export const fetchJobCreates = async (profile_pageId) => {
    const { data } = await $authHost.get(`/api/job_create/profile/${profile_pageId}`);
    return data;
};

export const getUserDetails = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Пользователь не авторизован');
    }

    const decoded = jwtDecode(token);
    return {
        id: decoded.id,
        email: decoded.email,
        telefon: decoded.telefon,
        role: decoded.role,
        otraslId: decoded.otraslId,
        specialId: decoded.specialId,
    };
};
