const logarUser = async (login, senha) => {

    const url = `https://subtle-mochi-7b34b0.netlify.app/.netlify/functions/api/v1/user/login`

    const usuario = {
        login: login,
        senha: senha
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'content-type': 'application/json'
        }
    }

    const result = await fetch(url, options)

    if (result.status == 200) {
        return true
    } else{
        return false
    }
}

const verificarUsuario = async () => {

    const formulario = document.getElementById('form')
    const senha = document.getElementById('senha').value
    const login = document.getElementById('login').value

    if(formulario.reportValidity()){
        const result = await logarUser(login, senha)

        if (result) {
            open('./dash.html', '_self')
        } else{
            alert('Usuário ou senha incorretos')
        }
    }
    
}

document.querySelector('button').addEventListener('click', verificarUsuario)