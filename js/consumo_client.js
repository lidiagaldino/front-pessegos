const getPizzas = async () => {

    const url = `https://subtle-mochi-7b34b0.netlify.app/.netlify/functions/api/v1/produtos/pizza`

    const response = await fetch(url)
    const pizzas = await response.json()

    return pizzas
}

const getBebidas = async () => {

    const url = `https://subtle-mochi-7b34b0.netlify.app/.netlify/functions/api/v1/produtos/bebida`

    const response = await fetch(url)
    const bebidas = await response.json()

    return bebidas
}

const getFavoritos = async () => {

    const url = `https://subtle-mochi-7b34b0.netlify.app/.netlify/functions/api/v1/produtos/favoritos`

    const response = await fetch(url)
    const favoritas = await response.json()

    return favoritas
}

const getOfertas = async () => {

    const url = `https://subtle-mochi-7b34b0.netlify.app/.netlify/functions/api/v1/produtos/promocoes`

    const response = await fetch(url)
    const ofertas = await response.json()

    return ofertas
}

const sendMessage = async (dados) => {

    const url = 'https://subtle-mochi-7b34b0.netlify.app/.netlify/functions/api/v1/mensagem'

    const options = {
        method: 'POST',
        body: JSON.stringify(dados),
        headers: {
            'content-type': 'application/json'
        }
    }

    const result = await fetch(url, options)

    return result
}

const addFavorito = async (id) => {

    const url = `https://subtle-mochi-7b34b0.netlify.app/.netlify/functions/api/v1/produtos/favoritos/${id}`

    const options = {
        method: 'PUT'
    }

    const result = await fetch(url, options)

    return result

}

export{
    getPizzas,
    getBebidas,
    getFavoritos,
    getOfertas,
    sendMessage,
    addFavorito
}