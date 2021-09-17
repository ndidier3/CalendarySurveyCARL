console.log('hello')
console.log(axios)
const axios = new axios.create({
    baseURL: "http://localhost:3001/api",
    timeout: 5000
})
