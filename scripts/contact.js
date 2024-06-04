const username = document.getElementById("username")
const email = document.getElementById("userMail")
const subject = document.getElementById("subject")
const message = document.getElementById("message")
const submitButton = document.getElementById("submitButton")

const validateEntrys = (username, email, subject, message) => {
    switch (true) {
        case !username:
            alert("Esta faltando o seu nome!");
            return false;
        case !email:
            alert("Esta faltando o seu email!");
            return false;
        case !subject:
            alert("Esta faltando o assunto!");
            return false;
        case !message:
            alert("A mensagem não pode ser enviada vazia!");
            return false;
        default:
            return true
    }
}

const sendMessage = (e, username, email, subject, message) => {
    e.preventDefault()
    const isValidated = validateEntrys(username.value, email.value, subject.value, message.value)
    if(isValidated){
        username.value = "";
        email.value = "";
        subject.value = "";
        message.value = "";
        alert("Enviado com sucesso!");
    }
}

submitButton.addEventListener("click", (e) => 
    sendMessage(
        e,
        username,
        email,
        subject,
        message
    )
)
