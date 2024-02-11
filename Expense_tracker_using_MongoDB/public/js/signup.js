

const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPasswordField = document.getElementById("cpassword");
const passwordError = document.getElementById("passwordError");

function signup(event) {
   
    event.preventDefault();
    const form = event.target;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const confirmPassword = form.elements.cpassword.value;
  
     

   
    if (password.length <= 6) {
        document.body.innerHTML += '<div style="color: red;">password length must be greater than 6</div>';
    }
    else if (password !== confirmPassword) {
        passwordError.textContent = 'Passwords do not match';
    }

    else {
        const userData = {
            Name: name,
            Email: email,
            Password: password
        }
        addUser(userData);
    }
}

async function addUser(userData) {


    try {

        let response = await axios.post("http://localhost:3000/add-user/signup", userData);
        if (response.status === 200) {
            alert("User Successfully Created!");
         
            window.location.href="/login";

        }
        
        name.value = '';
        email.value = '';
        password.value = '';
    


        console.log(response.data);

    } catch (err) {
        console.log(err);
        alert(err.response.data.msg)


       
    }
}
