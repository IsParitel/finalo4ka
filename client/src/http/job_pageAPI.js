import {$authHost, $host} from "./index";

export const createOtrasl = async (otrasl) => {
    const {data} = await $authHost.post('/api/otrasl', otrasl);
    return data;
};

export const fetchOtrasls = async () => {
    const {data} = await $host.get('/api/otrasl');
    return data;
};

export const createSpecial = async (special) => {
    const {data} = await $authHost.post('/api/special', special);
    return data;
};

export const fetchSpecials = async (otraslId) => {
    const { data } = await $host.get(`/api/special?otraslId=${otraslId}`);
    return data;
};

export const createJob_page = async (job_page) => {
    const { data } = await $authHost.post('/api/job_page', job_page); // job_page включает данные профиля
    return data;
};

export const fetchJob_pages = async (page = 1, limit = 100) => {
    const { data } = await $host.get('/api/job_page', { params: { page, limit } });
    return data;
};

export const fetchOneJob_page = async (id) => {
    const {data} = await $host.get('/api/job_page/' + id);
    return data;
};

export const deleteJobPage = async (id) => {
    const { data } = await $authHost.delete(`/api/job_page/${id}`);
    return data;
};