import axios from 'axios';

export const BASE_URL = 'http://localhost:8080/con';

const raxios = axios.create({ baseURL: BASE_URL });

export default raxios;
