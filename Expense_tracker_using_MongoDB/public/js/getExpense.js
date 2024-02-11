

document.addEventListener('DOMContentLoaded', function () {
    getExpense(1);
});

let totalAmount = 0;


async function getExpense(page) {

    const displayTotalAmount = (message) => {
        document.getElementById('TotalExpense').innerHTML = message;
    };

    const fetchTotalExpenseAmount = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/getUser/username', { headers: { "Authorization": token }  });

            const totalExpenseAmount = response.data.totalAmount;

            const totalAmount = `
            <div class="total-amount-container">
                <p><span>Your Total Expense is: <span class="total-amount">₹ ${totalExpenseAmount}</span></span></p>
            </div>
        `;

            displayTotalAmount(totalAmount);

        } catch (error) {
            console.error('Error fetching user name:', error.message);
        }
    };
    fetchTotalExpenseAmount()


    totalAmount = 0;

    try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`/get-expense/expense?page=${page}`, { headers: { "Authorization": token } });
        if (res.status === 200) {
            const elist = document.getElementById("expenses-list");
            elist.innerHTML = "";

            const expenses = res.data.data;
            // console.log(expenses)
            const itemsPerPage = 5;
            const totalPages = Math.ceil(expenses.length / itemsPerPage);

            const table = document.createElement('table');
            table.classList.add('expense-table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Payment</th>
                        <th>Date</th>
                         <th>Delete</th>
                    </tr>
                </thead>
                <tbody id="expense-body"></tbody>
            `;

            const expenseBody = table.querySelector('#expense-body');

           
            expenses.sort((b,a) => new Date(b.expenseDate) - new Date(a.expenseDate));

            
            expenses.slice((page - 1) * itemsPerPage, page * itemsPerPage).forEach((expense, index) => {
                const adjustedIndex = (page - 1) * itemsPerPage + index + 1;
                const row = expenseBody.insertRow();



                const srNoCell = row.insertCell();
                srNoCell.textContent = adjustedIndex;

                const amountCell = row.insertCell();
                amountCell.textContent = expense.amount;

                const descriptionCell = row.insertCell();
                descriptionCell.textContent = expense.description;


                const categoryCell = row.insertCell();
                categoryCell.textContent = expense.category;

                const expensePayment = row.insertCell();
                expensePayment.textContent = expense.payment;

                const originalDate = expense.expenseDate;
                const formattedDate = new Date(originalDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }).split('/').join('-');

                const expenseDate = row.insertCell();
                expenseDate.textContent = formattedDate


                const deleteCell = row.insertCell();


                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete');
                deleteBtn.addEventListener('click', async () => {
                    try {
                        const token = localStorage.getItem("token");
                       const Id=expense._id
                       console.log("===================>",Id)
                        const deleteRes = await axios.delete(`/delete-expense/delete/${Id.toString()}`, { headers: { "Authorization": token } });

                        if (deleteRes.status === 200) {
                            table.deleteRow(row.rowIndex);
                            totalAmount -= expense.amount;
                            document.getElementById('total-amount-pages').textContent = totalAmount.toFixed(2);
                        }


                        else {
                            console.error("Error deleting expense");
                        }
                        alert('expense delete successfully');
                    } catch (err) {
                        console.error(err);
                    }
                });
                deleteCell.appendChild(deleteBtn);

                totalAmount += expense.amount;
            });

            elist.appendChild(table);

            createPagination(totalPages, page);

            document.getElementById('total-amount-pages').textContent = totalAmount.toFixed(2);
        } else {
            console.error("Something went wrong");
        }
    } catch (error) {
        console.error("Something went wrong", error);
    }
}


function createPagination(totalPages, currentPage) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;

        if (i === currentPage) {
            pageLink.classList.add("active");
        }

        pageLink.addEventListener("click", function () {
            getExpense(i);
        });

        paginationContainer.appendChild(pageLink);
    }
}

function goToPage() {
    const pageSearch = document.getElementById("pageSearch").value;
    const page = parseInt(pageSearch, 10);
    if (!isNaN(page) && page > 0) {
        getExpense(page);
    }
}



document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('filter-month').addEventListener('click', filterExpensewithmonth);

    function filterExpensewithmonth() {
        let month = document.getElementById('month').value;
        const invalidInputs = document.getElementById('invalid-inputs');
        if (month < 1 || month > 12 || isNaN(month)) {
            invalidInputs.textContent = 'Please enter a valid month number (01-12).';
            invalidInputs.style.color = 'red';
            month.value = '';
        } else {
            invalidInputs.textContent = '';

            filterExpense(1, month)
        }


    }

    let monthlytotalAmount = 0;
    async function filterExpense(page, month) {

        monthlytotalAmount = 0



        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(`/get-expense/expense?page=${page}`, { headers: { "Authorization": token } });
            if (res.status === 200) {
                const elist = document.getElementById("filterExpenses-list");
                elist.innerHTML = "";

                const expenses = res.data.data;
                // console.log(expenses)
                const itemsPerPage = 70;
                const totalPages = Math.ceil(expenses.length / itemsPerPage);

                const table = document.createElement('table');
                table.classList.add('expense-table');
                table.innerHTML = `
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Payment</th>
                        <th>Date</th>
                         <th>Delete</th>
                    </tr>
                </thead>
                <tbody id="expense-body"></tbody>
            `;

                const expenseBody = table.querySelector('#expense-body');

                // Sort expenses by date in descending order
                expenses.sort((a, b) => new Date(b.expenseDate) - new Date(a.expenseDate));

                // Render expenses in the table
                expenses.slice((page - 1) * itemsPerPage, page * itemsPerPage).forEach((expense, index) => {

                    const originalDate = expense.expenseDate;
                    const formattedDate = new Date(originalDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    }).split('/').join('-');
                    const splitDate = formattedDate.split('-');
                    const splitmonth = splitDate[1]; // This will give you the month

                    console.log(splitmonth)

                    if (splitmonth == month) {
                        const adjustedIndex = (page - 1) * itemsPerPage + index + 1;
                        const row = expenseBody.insertRow();



                        const srNoCell = row.insertCell();
                        srNoCell.textContent = adjustedIndex;

                        const amountCell = row.insertCell();
                        amountCell.textContent = expense.amount;

                        const descriptionCell = row.insertCell();
                        descriptionCell.textContent = expense.description;


                        const categoryCell = row.insertCell();
                        categoryCell.textContent = expense.category;

                        const expensePayment = row.insertCell();
                        expensePayment.textContent = expense.payment;



                        const expenseDate = row.insertCell();
                        expenseDate.textContent = formattedDate


                        const deleteCell = row.insertCell();


                        const deleteBtn = document.createElement('button');
                        deleteBtn.textContent = 'Delete';
                        deleteBtn.classList.add('delete');
                        deleteBtn.addEventListener('click', async () => {
                            try {
                                const token = localStorage.getItem("token");
                                const deleteRes = await axios.delete(`/delete-expense/delete/${expense.id}`, { headers: { "Authorization": token } });

                                if (deleteRes.status === 200) {
                                    table.deleteRow(row.rowIndex);

                                    monthlytotalAmount -= expense.amount;
                                    document.getElementById('total-amount-pages').textContent = monthlytotalAmount.toFixed(2);

                                }


                                else {
                                    console.error("Error deleting expense");
                                }
                                alert('expense delete successfully');
                                window.location.reload()
                            } catch (err) {
                                console.error(err);
                            }
                        });
                        deleteCell.appendChild(deleteBtn);

                        monthlytotalAmount += expense.amount;

                    }

                });

                elist.appendChild(table);



                document.getElementById('totalExpense-amount-pages').textContent = monthlytotalAmount.toFixed(2);
                // document.getElementById('totalExpense-amount-pages').style.display = 'block';
                document.getElementById('total-expense-month').style.display = 'block';
                const thisMonth = document.getElementById('this-month')
                console.log('month', month)
              
                switch (month) {
                    case '01':
                        thisMonth.textContent = 'January';
                        break;
                    case '02':
                        thisMonth.textContent = 'February';
                        break;
                    case '03':
                        thisMonth.textContent = 'March';
                        break;
                    case '04':
                        thisMonth.textContent = 'April';
                        break;
                    case '05':
                        thisMonth.textContent = 'May';
                        break;
                    case '06':
                        thisMonth.textContent = 'June';
                        break;
                    case '07':
                        thisMonth.textContent = 'July';
                        break;
                    case '08':
                        thisMonth.textContent = 'August';
                        break;
                    case '09':
                        thisMonth.textContent = 'September';
                        break;
                    case '10':
                        thisMonth.textContent = 'October';
                        break;
                    case '11':
                        thisMonth.textContent = 'November';
                        break;
                    case '12':
                        thisMonth.textContent = 'December';
                        break;
                    default:
                        thisMonth.textContent = 'Invalid Month';
                        break;
                }




            } else {
                console.error("Something went wrong");
            }
        } catch (error) {
            console.error("Something went wrong", error);
        }


    }


});
























var sidemenu = document.getElementById('sidemenu');
function openmenu() {
    sidemenu.style.right = "0"

}
function closemenu() {
    sidemenu.style.right = "-200px"

}