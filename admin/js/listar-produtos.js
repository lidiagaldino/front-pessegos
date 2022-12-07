const getProdutos = async () => {

    const urlBebidas = `http://localhost:8080/v1/produtos/bebida`
    const urlPizza = `http://localhost:8080/v1/produtos/pizza`

    const responseBebidas = await fetch(urlBebidas)
    const responsePizzas = await fetch(urlPizza)

    const pizzas = await responsePizzas.json()
    const bebidas = await responseBebidas.json()

    const array = []

    pizzas.message.forEach(element => {
        array.push(element)
    });

    bebidas.message.forEach(element => {
        array.push(element)
    })

    return array
}

const container = document.getElementById('container')

const createProdutos = (data) => {

    const card = document.createElement('div')
    card.classList.add('card-user')
    const a = document.createElement('a')
    a.href = './editar_produto.html'
    a.classList.add('link')

    const img = document.createElement('img')
    img.classList.add('icon-image')
    img.src = data.imagem
    console.log(data);

    const name = document.createElement('span')
    name.textContent = data.nome

    if (data.id_pizza) {
        a.id = data.id_pizza
    } else{
        a.id = data.id_bebida
    }

    if (data.teor_alcoolico != null) {
        a.classList.add('bebida')
    } else{
        a.classList.add('pizza')
    }
    card.appendChild(a)
    card.appendChild(img)
    card.appendChild(name)

    return card
}

const loadProdutos = async () => {

    const data = await getProdutos()

    const cards = data.map(createProdutos)

    container.replaceChildren(...cards)
}

container.addEventListener('click', (event) => {
    if (event.target.classList.contains('link')) {
        localStorage.setItem('id_produto', event.target.id)
        localStorage.setItem('tipo', event.target.classList.value.split(' ')[1])
    }
})
loadProdutos()