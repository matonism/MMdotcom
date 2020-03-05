import MiCoolComponent from "../../micomponent-framework/MiCoolComponent.js";

class PageFrame extends MiCoolComponent {

    static get observedAttributes(){
        return [];
    }
    
    constructor(){
        super();
    }

    connectedCallback(){
        super.connectedCallback();
    }

    renderedCallback(){
    }
        
}

export default PageFrame;