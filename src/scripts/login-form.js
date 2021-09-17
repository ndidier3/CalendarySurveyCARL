const usernameInput = document.getElementById('username-input')
const passwordInput = document.getElementById('password-input')

const loginButton = document.getElementById('login-button')

loginButton.addEventListener("click", async function () {
    const username = usernameInput.value
    const password = passwordInput.value
    try {
        const response = await login({username, password})

        if (response.data.token !== undefined) {
            loginButton.removeEventListener("click")
            window.location.href = "instructions.html"
        } else {
            username.style.border = "red"
            password.style.border = "red"
        }

    } catch (error) {
      console.log({ error })  
    }

})