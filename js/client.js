import './elementos/card_pizza.js'
import { getPizzas, getBebidas, getFavoritos, getOfertas, sendMessage } from './consumo_client.js'

const createPizzas = (data) => {

    const cardPizza = document.createElement('card-pizza')

    cardPizza.nome = data.nome
    cardPizza.foto = data.imagem

    cardPizza.type = 'https://cdn-icons-png.flaticon.com/512/1404/1404945.png'

    cardPizza.preco = 'R$ ' + data.preco
    cardPizza.descricao = data.descricao

    return cardPizza
}

const loadPizzas = async () => {

    const slider = document.getElementById('slider-list')

    const pizzas = await getPizzas()

    const cards = pizzas.message.map(createPizzas)

    slider.replaceChildren(...cards)
}

const createBebidas = (data) => {

    const cardBebida = document.createElement('card-pizza')

    cardBebida.nome = data.nome
    cardBebida.foto = data.imagem

    cardBebida.type = '../img/bebida-icon.png'

    cardBebida.preco = 'R$ ' + data.preco

    const descricao = `${data.descricao} Teor alcoolico: ${data.teor_alcoolico}`

    cardBebida.descricao = descricao

    return cardBebida
}

const loadBebidas = async () => {

    const slider = document.getElementById('slider-list-bebida')

    const bebidas = await getBebidas()

    const cards = bebidas.message.map(createBebidas)

    slider.replaceChildren(...cards)
}

const createFavoritas = (data) => {

    let card = ''

    if (data.nome.includes('Pizza')) {
        card = createPizzas(data)
    } else{
        card = createBebidas(data)
    }

    return card
}

const loadFavoritas = async () => {

    const slider = document.getElementById('slider-list-favoritas')

    const favoritos = await getFavoritos()

    const cards = favoritos.message.map(createFavoritas)

    slider.replaceChildren(...cards)
}

const createOfertas = (data) => {

    let card = ''

    if (data.nome.includes('Pizza')) {
        card = createPizzas(data)
    } else{
        card = createBebidas(data)
    }

    return card
}

const loadOfertas = async () => {

    const slider = document.getElementById('slider-list-ofertas')

    const ofertas = await getOfertas()

    const cards = ofertas.message.map(createOfertas)

    slider.replaceChildren(...cards)
}

loadBebidas()
loadPizzas()
loadFavoritas()
loadOfertas()

const enviarMensagem = async () => {

    const form = document.querySelector('form')
    const name = document.getElementById('name')
    const email = document.getElementById('email') 
    const mensagem = document.getElementById('texto') 

    if (form.reportValidity()) {
        const sendJson = {
        nome: name.value,
        email: email.value,
        texto: mensagem.value
        }

        const result = await sendMessage(sendJson)
        console.log(result)

        if (result.status == 201) {
            name.value = ''
            email.value = ''
            mensagem.value = ''
            alert('Mensagem enviada com sucesso')
        } else{
            alert('Ocorreu um erro no envio, tente novamente mais tarde')
        }
    }

}

document.getElementById('enviar').addEventListener('click', enviarMensagem)

let limite = document.querySelector('.limit')
limite.textContent = '0/200'
const texto = document.getElementById('texto')

texto.addEventListener('keydown', () => {
    limite.textContent = `${texto.value.length}/200`
})
