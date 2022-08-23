export const urls = {
    login: '/',
    view: '/view',
    upload: '/upload',
};
export const nav = {};
export function navTo(url: string) {
    window.location.href = url;
}
