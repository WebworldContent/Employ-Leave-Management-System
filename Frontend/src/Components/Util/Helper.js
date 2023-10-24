export const isValidUser = (response) => {
    if (!response.ok) {
        if (400 <= response.status && response.status <= 499) {
            return 0;
        }
        throw new Error(`Something went wrong with status code: ${response.status}`);
    }
    return 1;
};