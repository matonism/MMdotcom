import MiCoolComponent from "../../micomponent-framework/MiCoolComponent.js";

class ContactForm extends MiCoolComponent {

    renderedCallback(){

		let nameInput = this.shadowRoot.querySelector("custom-input#name");
        nameInput.onchange = this.validateInput;
        
        let button = this.shadowRoot.querySelector('.submit-button');
        button.addEventListener('click', (event) => {
            this.submit();
        });

    }

    validateInput(){
        console.log('input changed');
    }

    submit(){
        console.log('figure out submitting forms in nodejs and sending notification to me');
    }
}

export default ContactForm;