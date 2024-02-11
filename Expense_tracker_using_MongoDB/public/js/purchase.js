function showPremiumUserMessage() {
    document.getElementById('rzp-button1').style.visibility = "hidden"; 
    document.getElementById('message').innerHTML = "You are a premium user";
    
}
function showLeaderboard() {
    const inputElement = document.createElement('input');
    inputElement.type = 'button';
    inputElement.value = 'Show Leaderboard';
    inputElement.id = 'leaderboard-button';

    inputElement.onclick = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get('/premiumuser/showLeaderBoard', {
                headers: { "Authorization": token }
            });

            const userLeaderboardArray = response.data;
            console.log('=====================================>', userLeaderboardArray);

            var leaderboardElem = document.getElementById('leaderboard');
            leaderboardElem.innerHTML = ''; 

            
            const table = document.createElement('table');
            table.className = 'leaderboard-table';

          
            const headerRow = table.insertRow();
            const srNoHeader = headerRow.insertCell(0);
            srNoHeader.innerHTML = '<b>Sr No</b>';
            const nameHeader = headerRow.insertCell(1);
            nameHeader.innerHTML = '<b>Name</b>';
            const amountHeader = headerRow.insertCell(2);
            amountHeader.innerHTML = '<b>Total Amount</b>';

           
            userLeaderboardArray.forEach((userDetails, index) => {
                const row = table.insertRow();
                const srNoCell = row.insertCell(0);
                srNoCell.textContent = index + 1; 
                const nameCell = row.insertCell(1);
                nameCell.textContent = userDetails.Name;
                const amountCell = row.insertCell(2);
                amountCell.textContent = userDetails.totalExpenses;
            });

        
            leaderboardElem.appendChild(table);
        } catch (error) {
            console.error(error);
            // Handle error here, e.g., display an error message to the user
        }
    }
    document.getElementById('message2').appendChild(inputElement);
}




function reports()
{
   const messageDiv = document.getElementById("report");
   const report = document.createElement("button");
   report.textContent = "Reports";
   report.setAttribute('id', "show-report-btn")
   messageDiv.appendChild(report);
   report.addEventListener('click', async ()=>
   {
       window.location.href="reports";
   })

}





// taken by google inbuilt code this is ....
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const token = localStorage.getItem("token");
const decodedToken = parseJwt(token);
const ispremiumuser = decodedToken.ispremiumuser;
if (ispremiumuser) {
    showPremiumUserMessage();
    showLeaderboard();
    reports();
}



document.getElementById('rzp-button1').onclick = async function (e) {
    const token = localStorage.getItem('token')
    const response = await axios.get('/purchase/premiummembership', { headers: { "Authorization": token } });
    console.log(response);
    var options =
    {
        "key": response.data.key_id, // enter the Key ID generated from the dashboard
        "order_id": response.data.order.id,// for one time payment
       //handling a success payment
        "handler": async function (response) {
            const res = await axios.post('/purchase/updatetransactionstatus', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            },{ headers: {"Authorization": token}  })

            console.log("==========================================================================================================================================")
            alert('You are a Premium User Now')
            document.getElementById('rzp-button1').style.visibility="hidden"
            document.getElementById('message').innerHTML="You are a premium user";
            // localStorage.setItem('isadmin',true);
             localStorage.setItem('token', res.data.token)
             showLeaderboard();
             reports();
             
         

        },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', async function (response) {
        console.log(response);
        alert('Something went wrong');

   
        const res = await axios.post('/purchase/updatetransactionstatus', {
            order_id: options.order_id,
            payment_id: response.error.metadata.order_id,
            status: 'FAILED',
        }, { headers: { "Authorization": token } });

        console.log(res);
    });
}



var sidemenu=document.getElementById('sidemenu');
function openmenu(){
    sidemenu.style.right="0"
   
}
function closemenu(){
    sidemenu.style.right="-200px"
   
}