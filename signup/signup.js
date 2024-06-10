document.getElementById('submit').addEventListener('click', function(event) {

        event.preventDefault(); 
        var password = document.getElementById('password').value;
        var repeatPassword = document.getElementById('passwordd').value;

        console.log('Password:', password); 
        console.log('Repeat Password:', repeatPassword); 

        if (password === repeatPassword) {
            document.getElementById('message').innerText = 'Uğurla qeydiyyatdan keçdiniz';
            document.getElementById('message').style.color = 'green';
            document.getElementById('goback').style.display = 'block';
        } else {
            alert('Şifrələr uyğun deyil. Yenidən yoxlayın.');
        }
    
});