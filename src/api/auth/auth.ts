import { baseUrl } from '../const';

export const auth = async (user: FormData) => {
    try {
        const response = await fetch(baseUrl('login'), {
            method: 'POST',
            body: user
        });

        const result = await response.json()

        if (result.status === 'ok') {
            localStorage.setItem('token', result.message.token);
            return Promise.resolve(200);
        }
        else {
            return Promise.reject(401);
        }
    }
    catch {
        throw Error('Error');
    }
}
