

async function askForDetails(failedAttempts = 0) {
    const { value: action } = await Swal.fire({
        title: 'What would you like to do?',
        input: 'select',
        inputOptions: {
            register: 'Register',
            login: 'Login'
        },
        allowOutsideClick: false
    });

    if (action === 'register') {
        const { value: formValues } = await Swal.fire({
            title: 'Register',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Write your name">
                <input id="swal-input2" class="swal2-input" placeholder="Write your lastname">
                <input id="swal-input3" class="swal2-input" placeholder="Write your Email">
                <input type="password" id="swal-input4" class="swal2-input" placeholder="Write your password">
            `,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value,
                    document.getElementById('swal-input3').value,
                    document.getElementById('swal-input4').value
                ];
            }
        });
        if (formValues) {
            if (!formValues[0] || !formValues[1] || !formValues[2] || !formValues[3]) {
                Swal.fire('Error', 'All fields are required', 'error');
                return;
            }
            const data = {
                name: formValues[0],
                lastname: formValues[1],
                email: formValues[2],
                password: formValues[3]
            };
            
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                Swal.fire('Error', errorData.message, 'error');
            } else {
                Swal.fire('Success', 'Registered successfully, now log in', 'success').then(() => {
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1000);  
                });
            }
        }
    } else if (action === 'login') {
        const { value: formValues } = await Swal.fire({
            title: 'Login',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="Write your Email">
                <input type="password" id="swal-input2" class="swal2-input" placeholder="Write your password">
            `,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ];
            }
        });
        if (formValues) {
            if (!formValues[0] || !formValues[1]) {
                Swal.fire('Error', 'Both fields are required', 'error');
                return;
            }
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formValues[0],
                    password: formValues[1]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                Swal.fire('Error', errorData.message, 'error');
                if (failedAttempts < 2) {
                    askForDetails(failedAttempts + 1);
                } else {
                    Swal.fire('Error', 'Too many failed login attempts. Please try again later.', 'error');
                }
            } else {
                Swal.fire('Success', 'Logged in successfully', 'success').then(
                    setTimeout(() => {
                        window.location.href = '/main';
                    }, 1000)); 
            }
        }
    }
}



export default askForDetails;
