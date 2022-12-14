const adicionarUser = async (login, senha) => {

    const url = `https://subtle-mochi-7b34b0.netlify.app/.netlify/functions/api/v1/usuario`

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

    if (result.status = 201) {
        return true
    } else{
        return false
    }
}

const criarUser = async () => {

    const formulario = document.getElementById('form')
    const login = document.getElementById('login').value
    const senha = document.getElementById('senha').value

    if(formulario.reportValidity()){
        const result = await adicionarUser(login, senha)

        if (result) {
            alert('Usuario criado com sucesso')
            open('./dash.html', '_self')
        }else{
            alert('Não foi possível criar')
        }
    }
}

document.querySelector('button').addEventListener('click', criarUser)