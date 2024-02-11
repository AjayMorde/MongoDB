document.addEventListener('DOMContentLoaded', function () {
  fetchUserName();
});

const displayWelcomeMessage = (message) => {
  document.getElementById('welcomeMessage').innerHTML = message;
  
};
const displayusername = (message) => {
  console.log('mesage', message)
  document.getElementById('username').innerHTML = message;
  
};

const fetchUserName = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('/getUser/username', {
        headers: { "Authorization": token }
    });
    
    const userName = response.data.loggedInUserName

    console.log(userName)
    const welcomeMessage = `
    <div class="welcome-message">
    <p>Hello <span class="user-name">${userName}</span></p>
    <p>Step into your expense tracker app.</p>
    <p><span>Are you all set to get started?</span></p>
</div>
`;
    
    displayWelcomeMessage(welcomeMessage);
    
    const username=`<h2>${userName}</h2>`;
    displayusername(username);

  } catch (error) {
    console.error('Error fetching user name:', error.message);
  }
};



var sidemenu=document.getElementById('sidemenu');
function openmenu(){
    sidemenu.style.right="0"
   
}
function closemenu(){
    sidemenu.style.right="-200px"
   
}

document.addEventListener('DOMContentLoaded', function() {
  const profileImage = document.getElementById('previewImage');
  const editButton = document.getElementById('editButton');
  const uploadButton = document.getElementById('uploadButton');
  const removeButton = document.getElementById('removeButton');
  const fileInput = document.getElementById('fileInput');
  const localStorageKey = 'profileImage';
  const options = document.querySelector('.options');


  function displayImageFromStorage() {
      const storedImage = localStorage.getItem(localStorageKey);
      if (storedImage) {
          profileImage.src = storedImage;
      }
  }

  
  displayImageFromStorage();

  editButton.addEventListener('click', function() {
      options.classList.toggle('active');
  });

  uploadButton.addEventListener('click', function() {
      fileInput.click();
      options.classList.remove('active');
  });

  removeButton.addEventListener('click', function() {
      profileImage.src = '/images/dummyimg.png'; 
      localStorage.removeItem(localStorageKey); 
      fileInput.value = ''; 
      options.classList.remove('active');
  });

  fileInput.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              profileImage.src = e.target.result;
              localStorage.setItem(localStorageKey, e.target.result); 
          };
          reader.readAsDataURL(file);
      }
  });
});