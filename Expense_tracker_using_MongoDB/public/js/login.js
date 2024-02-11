const emailValue = document.getElementById("email");
const passwordValue = document.getElementById("password");

function Login(e) {

    e.preventDefault();


    const email = emailValue.value;
    const password = passwordValue.value;
    const userData = {
        email: email,
        password: password
    }

    checkData(userData);

}
async function checkData(userData) {

    try {

        let res = await axios.post("/user-login/login", userData);
        console.log(res.data);
        if (res.status === 200) {
            alert("Login successful!");
            localStorage.setItem('token',res.data.token);
            // consoole.log(res.data.token);
            window.location.href="index3";
        }

        emailValue.value = '';
        passwordValue.value = '';



    } catch (err) {
        if (err.response) {
            if (err.response.status === 404) {
                alert("User does not exist");
            } else if (err.response.status === 401) {
                alert("Wrong Password");
            }
            else if (err.response.status === 500) {
                alert("An error occurred during login.");
            }
        } else {
            console.error('Error:', err);
        }
    }

}