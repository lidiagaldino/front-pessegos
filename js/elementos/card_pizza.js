class CardPizza extends HTMLElement{

    constructor(){
        super()
        this.shadow = this.attachShadow({mode: 'open'})
        this.preco_promocao = ''
    }

    static get observedAttributes() {
        return ['nome', 'foto', 'type', 'preco', 'descricao', 'preco_promocao']
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
                    <span class="preco preco_promocao">${this.preco_promocao}</span>
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

            .preco_promocao{
                text-decoration: line-through;
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
                flex-direction: column;
                gap: 10px;
                padding: 10px;
            }

            .descricao{
                padding: 10px;
                display: flex;
                flex-wrap- wrap;
                font-family: 'Julius Sans One';
                font-style: normal;
                font-weight: 100;
                font-size: 20px;
                line-height: 30px;

                color: rgba(107, 0, 0, 0.5);
            }

            .title{
                display: flex;
                height: 15%;
                gap: 10px;
                align-items: center;
                padding: 10px;
                background: #FEEAEA;
                font-family: 'Jua';
                font-style: normal;
                font-weight: 100;
                font-size: 20px;
                line-height: 30px;

                color: rgba(107, 0, 0, 0.5);

            }

            .type-icon{
                height: 20px;
            }

            .preco{
                display: flex;
                font-family: 'Jua';
                font-style: normal;
                margin-top: 2%;
                font-weight: 100;
                font-size: 2rem;
                line-height: 20px;

                color: rgba(107, 0, 0, 0.5);
            }
        `

        return style
    }
}

customElements.define('card-pizza', CardPizza)