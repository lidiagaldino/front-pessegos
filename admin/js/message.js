import '../../js/elementos/card-mensagem.js'

const getMessages = async () => {

    const url = `http://localhost:8080/v1/mensagem`

    const response = await fetch(url)
    const message = await response.json()

    return message

}

const deleteMessage = async (id) => {

    const url = `http://localhost:8080/v1/mensagem/${id}`

    const response = await fetch(url, {method: 'delete'})
    const result = await response.json()

    return result
}

const createMessage = (data) => {

    const container = document.createElement('div')
    const card = document.createElement('card-mensagem')
    const botao = document.createElement('button')

    card.nome = data.nome
    card.mensagem = data.texto
    card.email = data.email
    card.code = data.id
    
    botao.type = 'submit'
    botao.classList.add('botao')
    botao.textContent = 'Deletar'
    botao.id = data.id

    container.appendChild(card)
    container.appendChild(botao)
    container.classList.add('container-msg')

    return container
}

const loadMessages = async () => {

    const messagesContainer = document.getElementById('mensagens')

    const messages = await getMessages()

    const cards = messages.message.map(createMessage)

    messagesContainer.replaceChildren(...cards)
}

loadMessages()

document.querySelector('.mensagens').addEventListener('click', async (event) => {
    if (event.target.className == 'botao') {
        const resultado = confirm('Deseja realmente deletar esta mensagem?')
        if (resultado) {
            await deleteMessage(event.target.id)
            await loadMessages()
        }
    }
})
