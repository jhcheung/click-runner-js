// const PORT = process.env.PORT || 3000;

const hostname = window.location.hostname;

export const url = window.location.protocol+'//'+hostname+(window.location.port ? ':'+window.location.port: '');

export const gameUrl = url + '/api/v1/games/'
export const usersUrl = url + '/api/v1/users/'