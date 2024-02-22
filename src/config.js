const prod = ''
// const dev = 'https://beta.roommakeover.com.np'
const dev = 'http://localhost:4001'


export const BASE_URL = import.meta.env.MODE === 'production' ? prod : dev
// export const IMAGE_URL = `${BASE_URL}/api/image`
export const IMAGE_URL = `https://roommakeover.com.np/api/image`