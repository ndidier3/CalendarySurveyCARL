const axiosInstance = async function login(username, password) {
    try {
        const response = await axiosInstance.post("/users/login", { 
            username,
            password
        })
        return response  
    } catch (error) {
        console.log({ error })
    } 

}