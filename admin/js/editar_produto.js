const nome = document.getElementById('nome')
const ingredientes = document.getElementById('ingredientes')
const preco = document.getElementById('preco')
const desconto = document.getElementById('desconto')

const updateProduto = async (id, produto) => {

    let url = ''

    if (localStorage.getItem('tipo') == 'bebida') {
        url = `http://localhost:8080/v1/produtos/bebida/${id}`
    } else{
        url = `http://localhost:8080/v1/produtos/pizza/${id}`
    }

    const options = {
        method: 'PUT',
        body: JSON.stringify(produto),
        headers: {
            'content-type': 'application/json'
        }
    }

    const response = await fetch (url, options)

    if (response) {
        return true
    } else{
        return false
    }
}

const getProdutoById = async (id) => {

    let url = ''

    if (localStorage.getItem('tipo') == 'bebida') {
        url = `http://localhost:8080/v1/produtos/bebida/${id}`
    } else{
        url = `http://localhost:8080/v1/produtos/pizza/${id}`
    }

    const response = await fetch(url)

    const produto = response.json()

    return produto
}

const produto = await getProdutoById(localStorage.getItem('id_produto'));

nome.value = produto[0].nome
ingredientes.value = produto[0].descricao
preco.value = produto[0].preco
desconto.value = produto[0].desconto

const getTipos = async (tipo) => {

    const url = `http://localhost:8080/v1/tipo/${tipo}`

    const response = await fetch(url)

    const tipos = await response.json()

    return tipos
}

const getTamanhos = async () => {

    const url = `http://localhost:8080/v1/produtos/tamanho`

    const response = await fetch(url)

    const tamanhos = await response.json()

    return tamanhos
}

const createTipos = (data) => {

    const op = document.createElement('option')
    op.textContent = data.tipo
    op.id = data.id
    op.value = data.tipo

    return op
}

const loadTipos = async () => {

    const container = document.getElementById('dropdown-tipos')

    const data = await getTipos(localStorage.getItem('tipo'))

    const cards = data.message.map(createTipos)

    container.replaceChildren(...cards)

}

const createTamanhos = (data) => {

    const op = document.createElement('option')

    op.textContent = data.nome
    op.id = data.id
    op.value = data.nome

    return op
}

const loadTamanhos = async () => {

    const container = document.getElementById('dropdown-tamanhos')

    const data = await getTamanhos()

    const cards = data.message.map(createTamanhos)

    container.replaceChildren(...cards)

}



loadTamanhos()
loadTipos()
