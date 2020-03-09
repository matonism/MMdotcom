import MiCoolComponent from "../../micomponent-framework/MiCoolComponent.js";

class HamburgerDropDown extends MiCoolComponent {

    static get observedAttributes(){
        return ['display-class'];
    }
    
    constructor(){
        super();
    }

    connectedCallback(){
        super.connectedCallback();
        this.setAttribute('display-class', 'hide');
    }

    renderedCallback(){
        let hamburger = this.shadowRoot.querySelector('.hamburger-icon-container');

        hamburger.addEventListener('click', () => {  
            this.setAttribute('display-class', 'show');
        });

        window.addEventListener('click', (event) => {
            if(!this.clickedInDropdown(event)){
                this.setAttribute('display-class', 'hide');
            }
        });
    }

    clickedInDropdown(event){
        if(!!event.target.shadowRoot && !!event.target.shadowRoot.host){
            return this == event.target.shadowRoot.host;
        }
        return false;
    }
        
}

export default HamburgerDropDown;