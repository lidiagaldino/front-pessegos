const select = document.getElementById('ativo-inativo')

const getProdutos = async () => {

    const urlBebidas = `https://subtle-mochi-7b34b0.netlify.app/.netlify/functions/api/v1/produtos/bebida`
    const urlPizza = `https://subtle-mochi-7b34b0.netlify.app/.netlify/functions/api/v1/produtos/pizza`

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

    array.forEach(item => {
        item.tamanho = ''
        item.preco = ''
        item.preco_desconto = ''
    })

    console.log(array)

    const arrayFinal = array.filter((element, index) => {
        console.log(array.indexOf(element))
        return array.indexOf(element) == index
    })

    console.log(arrayFinal)

    return array
}

const getInativos = async () => {

    const array = []

    const urlPizza = `https://subtle-mochi-7b34b0.netlify.app/.netlify/functions/api/v1/produtos/ativo/pizza`
    const urlBebida = `https://subtle-mochi-7b34b0.netlify.app/.netlify/functions/api/v1/produtos/ativo/bebida`

    const responsePizza = await fetch(urlPizza)
    const responseBebida = await fetch(urlBebida)

    const resultPizza = await responsePizza.json()
    const resultBebida = await responseBebida.json()

    if (resultBebida.status == 200) {
        resultBebida.message.forEach(element => {
            array.push(element)
        })
    }

    if(resultPizza.status == 200){
        resultPizza.message.forEach(element => {
            array.push(element)
        })
    }

    const arrayFinal = array.filter((element, index) => {
        console.log(array.indexOf(element.nome) == index)
        return array.indexOf(element.nome) == index
    })

    console.log(arrayFinal)

    return arrayFinal
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
    
    if (data.stat == 0) {
        img.style.filter = 'grayscale(60%)'
    }

    const name = document.createElement('span')
    name.textContent = data.nome

    if (data.id_pizza) {
        a.id = `${data.id_pizza}-${data.id_produto}`
    } else{
        a.id = `${data.id_bebida}-${data.id_produto}`
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

    let data = []

    if (select.options[select.selectedIndex].value == 'inativo') {
        data = await getInativos()
    } else{
        data = await getProdutos()
    }

    console.log(data)

    

    const cards = data.map(createProdutos)

    container.replaceChildren(...cards)
}

document.getElementById('ativo-inativo').addEventListener('change', loadProdutos)

container.addEventListener('click', (event) => {
    if (event.target.classList.contains('link')) {
        localStorage.setItem('id_produto', event.target.id)
        localStorage.setItem('tipo', event.target.classList.value.split(' ')[1])
    }
})
loadProdutos()