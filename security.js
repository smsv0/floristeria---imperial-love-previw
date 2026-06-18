const contraseña = "admin@1234"
const input = document.querySelector(".input")
const button = document.querySelector(".send")

button.addEventListener("click", () => {
    if (input.value === contraseña){
        sessionStorage.setItem("admin", "true")
        window.location.href = "index.html"
    } else {
        alert("contraseña incorrecta")
    }
})

