class CardPizza extends HTMLElement{

    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'open'})
    }

    static get observedAttributes() {
        return ['nome', 'foto', 'type', 'preco', 'descricao']
    }

    attributeChangedCallback(nameAttr, oldValue, newValue) {
        this[nameAttr] = newValue
    }

    connectedCallback() {
        this.shadow.appendChild(this.component())
        this.shadow.appendChild(this.styles())
    }

    component(){
        const card = document.createElement('div')
        card.classList.add('card-produto')

        card.innerHTML = `
        <div class="container">
            <div class="overlay">
                <div class="head">
                    <span class="preco">${this.preco}</span>
                    <span class="star">⭐</span>
                </div>
                <span class="descricao">${this.descricao}</span>
            </div>
        </div>

        </div>
            
            <div class="title">
                <img class="type-icon" src="${this.type}"/>
                <span class="produto-name">${this.nome}</span>
            </div> 
        `

        return card
    }

    styles(){
        const style = document.createElement('style')

        style.textContent = `
            .card-produto{
                width: 255px;
                height: 330px;
                display: flex;
                flex-direction: column;
                background: #FEEAEA;
                border: 1px solid rgba(107, 0, 0, 0.5);
                transition: all ease-in-out .5s;
            }

            .container{
                position: relative;
                height: 80%;
                width: 100%;
                display: flex;
                background-image: url('${this.foto}');
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;    

            }

            .overlay{
                display: flex;
                flex-direction: column;
                position: absolute;
                height: 100%;
                width: 100%;
                opacity: 0;
                transition: .5s ease;
                background: rgba(254, 234, 234, 0.8);
                gap: 30px;
            }

            .container:hover .overlay{
                cursor: pointer;
                opacity: 1;
            }

            .card-produto:hover{
                height: 350px;
                width: 270px;
            }

            .head{
                display: flex;
                justify-content: space-between;
                padding: 10px;
            }

            .descricao{
                padding: 10px;
                display: flex;
                flex-wrap- wrap;
            }

            .title{
                display: flex;
                height: 15%;
                gap: 10px;
                align-items: center;
                padding: 10px;
                background: #FEEAEA;

            }

            .type-icon{
                height: 20px;
            }
        `

        return style
    }
}

customElements.define('card-pizza', CardPizza)