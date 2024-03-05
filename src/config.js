const prod = import.meta.env.VITE_PROD
// const dev = import.meta.env.VITE_DEV
const dev = 'http://localhost:4001'


export const BASE_URL = import.meta.env.MODE === 'production' ? prod : dev
// export const IMAGE_URL = `${BASE_URL}/api/image`
export const IMAGE_URL = `https://betaadmin.roommakeover.com.np/api/image`
