import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = () => { // Denna görs om till en arrowfunktion pga att i useTodos  queryFn: apiClient.getAll, så refereras this till det globala och inte till apiclient.
        return axiosInstance.get<T[]>(this.endpoint).then(res => res.data)
    }

    post = (data: T) => {
        return axiosInstance.post<T>(this.endpoint, data)
            .then(res => res.data);
    }
}

export default APIClient;