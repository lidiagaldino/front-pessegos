const teorContainer = document.getElementById('teor')

const container = document.querySelector('.container-op')
const bebida = document.getElementById('bebida')
const pizza = document.getElementById('pizza')


const adicionarBebida = async(foto, teor, nome, ingredientes, tipo, preco, desconto, tamanho) => {

    const url = `http://localhost:8080/v1/produtos/bebida`

    const produto = {
        foto: foto,
        teor: teor, 
        nome: nome, 
        ingredientes: ingredientes,
        tipo: tipo,
        preco: preco, 
        desconto: desconto, 
        tamanho: tamanho
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(produto),
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

const adicionarPizza = async (foto, nome, ingredientes, tipo, preco, desconto, tamanho) => {
    const url = `http://localhost:8080/v1/produtos/pizza`

    const produto = {
        foto: foto,
        nome: nome, 
        ingredientes: ingredientes,
        tipo: tipo,
        preco: preco, 
        desconto: desconto, 
        tamanho: tamanho
    }

    const options = {
        method: 'POST',
        body: JSON.stringify(produto),
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

const criarProduto = async () => {

    const formulario = document.getElementById('form')
    const foto = document.getElementById('foto').value
    const teor = document.getElementById('teor').value
    const nome = document.getElementById('nome').value
    const ingredientes = document.getElementById('ingredientes').value
    const tipo = document.getElementById('tipo').value
    const preco = document.getElementById('preco').value
    const desconto = document.getElementById('desconto').value

    if(formulario.reportValidity()){
        const result = 0
        if (bebida.checked) {
            result = await adicionarBebida(foto, teor, nome, ingredientes, tipo, preco, desconto, tamanho)
        }
        else if (pizza.checked) {
            result = await adicionarPizza(foto, nome, ingredientes, tipo, preco, desconto, tamanho)
        }
        else{
            alert('Escolha se é pizza ou bebida')
            return false
        }


        if (result) {
            alert('Produto criado com sucesso')
            open('./dash.html', '_self')
        }else{
            alert('Não foi possível criar')
        }
    }


}

document.querySelector('button').addEventListener('click', criarProduto)

container.addEventListener('change', () => {
    if(bebida.checked){
        teorContainer.classList.remove('hide-input')
        teorContainer.classList.add('show-input')
    }
    if (pizza.checked) {
        teorContainer.classList.add('hide-input')
        teorContainer.classList.remove('show-input')
    }
})