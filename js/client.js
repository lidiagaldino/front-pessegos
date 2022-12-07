import './elementos/card_pizza.js'
import { getPizzas, getBebidas, getFavoritos, getOfertas, sendMessage, addFavorito } from './consumo_client.js'


const createPizzas = (data) => {

    const container = document.createElement('div')
    container.classList.add('container-card')
    const cardPizza = document.createElement('card-pizza')
    const star = document.createElement('a')
    star.innerHTML = `<svg id="${data.id_produto}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 star star-parent">
    <path class="star-child" stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>`
  

    cardPizza.nome = data.nome
    cardPizza.foto = data.imagem

    cardPizza.type = 'https://cdn-icons-png.flaticon.com/512/1404/1404945.png'

    cardPizza.preco = 'R$ ' + data.preco
    cardPizza.descricao = data.descricao
    container.appendChild(cardPizza)
    container.appendChild(star)

    return container
}

const loadPizzas = async () => {

    const slider = document.getElementById('slider-list')

    const pizzas = await getPizzas()

    const cards = pizzas.message.map(createPizzas)

    slider.replaceChildren(...cards)
}

const createBebidas = (data) => {

    const container = document.createElement('div')
    container.classList.add('container-card')
    const cardBebida = document.createElement('card-pizza')
    const star = document.createElement('div')
    star.innerHTML = `<svg id="${data.id_produto}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 star">
    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>`

    cardBebida.nome = data.nome
    cardBebida.foto = data.imagem

    cardBebida.type = '../img/bebida-icon.png'

    cardBebida.preco = 'R$ ' + data.preco

    const descricao = `${data.descricao}`

    cardBebida.descricao = descricao
    container.appendChild(cardBebida)
    container.appendChild(star)

    return container
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
const card = document.querySelectorAll('.slider-list')

card.forEach(item => {
    item.addEventListener('click', async (event) => {
   
        if (event.target.classList.value.includes('star')) {
            if (event.target.classList.contains('star-child')) {
                event.target.parentElement.classList.toggle('star-active')
                if (event.target.parentElement.classList.contains('star-active')) {
                    console.log(await addFavorito(event.target.parentElement.id))
                }
            } else{
                event.target.classList.toggle('star-active')
                if (event.target.classList.contains('star-active')) {
                    console.log(await addFavorito(event.target.id))
                }
            }
            

        }
    })
})

texto.addEventListener('keydown', () => {
    limite.textContent = `${texto.value.length}/200`
})
