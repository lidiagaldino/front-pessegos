const updateUser = async (id, dados) => {

    const url = `https://subtle-mochi-7b34b0.netlify.app/.netlify/functions/api/v1/usuario/${id}`

    const options = {
        method: 'PUT',
        body: JSON.stringify(dados),
        headers: {
            'content-type': 'application/json'
        }
    }

    const result = await fetch(url, options)
    console.log(result)

    if (result.status == 201) {
        return true
    }else{
        return false
    }
}

const getDados = async () => {

    const form = document.getElementById('form')
    const login = document.getElementById('login').value
    const senha = document.getElementById('senha').value

    if (form.reportValidity()) {
        const json = {
            login: login,
            senha: senha
        }
        
        const result = await updateUser(localStorage.getItem('id'), json)

        if (result) {
            alert('Atualização realizada com sucesso')
            open('./dash.html', '_self')
        } else{
            alert('Erro, tente novamente')
        }
    }
}

document.querySelector('button').addEventListener('click', getDados)