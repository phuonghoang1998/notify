import { commonApi } from "./commonApi";
export const clientApi = {
    get: async () => {
        try {
            let url = 'https://61d6872735f71e0017c2e68d.mockapi.io/clients';
            let result = await commonApi.get(url);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    add: async model => {
        try {
            let url = 'https://61d6872735f71e0017c2e68d.mockapi.io/clients';
            let result = await commonApi.post(url, model);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    edit: async (clientId , model) => {
        try {
            let url = `https://61d6872735f71e0017c2e68d.mockapi.io/clients/${clientId}`;
            let result = await commonApi.put(url, model);
            return result;
        } catch (error) {
            console.error(error);
        }
    },
    delete: async id => {
        try {
            let url = `https://61d6872735f71e0017c2e68d.mockapi.io/clients/${id}`;
            let result = await commonApi.delete(url);
            return result;
        } catch (error) {
            console.error(error);
        }
    }
}