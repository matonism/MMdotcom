import MiCoolComponent from "../../micomponent-framework/MiCoolComponent.js";

class HamburgerDropDown extends MiCoolComponent {

    static get observedAttributes(){
        return ['display-class', 'dropdown-width'];
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
        let dropdownContent = this.shadowRoot.querySelector('.dropdown-content');
        dropdownContent.style.opacity = 0;
        dropdownContent.style.width = this.getAttribute('dropdown-width');

        hamburger.addEventListener('click', () => {  
            if(this.getAttribute('display-class') == 'show'){
                this.setAttribute('display-class', 'hide');
                hamburger.classList.remove('selected');

            }else{
                this.setAttribute('display-class', 'show');
                hamburger.classList.add('selected');
            }
        });

        window.addEventListener('click', (event) => {
            if(!this.clickedInDropdown(event)){
                this.setAttribute('display-class', 'hide');
                hamburger.classList.remove('selected');
            }
        });

        window.addEventListener('resize', () => {
            dropdownContent.style.width = this.parentElement.offsetWidth;
        });
    }

    rerenderedCallback(name, oldValue, newValue){

        //waiting for rerendered css file
            if(name==='display-class'){
                let dropdownContent = this.shadowRoot.querySelector('.dropdown-content');
                if(dropdownContent != null){
                    if(newValue === 'show'){
                        dropdownContent.style.opacity = 1;
                    }else if(newValue === 'hide'){
                        dropdownContent.style.opacity = 0;
                    }
                }
            }
            
    }

    clickedInDropdown(event){
        if(!!event.target){
            return this.checkIfHamburgerIsParent(event.target);
        }
        return false;
    }

    checkIfHamburgerIsParent(element){
        if(this == element){
            return true;
        }else if(element.parentElement != null){
            return this.checkIfHamburgerIsParent(element.parentElement);
        }
        return false;

    }
        
}

export default HamburgerDropDown;