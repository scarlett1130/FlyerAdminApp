export const isExpired = (timestamp) => {
    let now = new Date(new Date().toUTCString());
    let expires = new Date(timestamp.replace(' ', 'T'));

    let expired = (now > expires);

    return expired
};
