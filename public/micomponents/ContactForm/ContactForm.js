//TODO: implement a loading icon for when email is sending
import MiCoolComponent from "../../micomponent-framework/MiCoolComponent.js";

class ContactForm extends MiCoolComponent {

    static get observedAttributes(){
        return ['message-text', 'input-error-message']
    }

    connectedCallback(){
        super.connectedCallback();
        if(!this.getAttribute('message-text')){
            this.setAttribute('message-text', 'Thank you for reaching out! I\'ll get back to you as soon as I can!');
        }

        if(!this.getAttribute('input-error-message')){
            this.setAttribute('input-error-message', 'Please correct the following errors:\n');
        }
        this.form = {name: '', email: '', content: ''};
    }
    renderedCallback(){

		let nameInput = this.shadowRoot.querySelector("custom-input#name");
        nameInput.addEventListener("custominputkeyup", event => {
            this.setInput(event);
        });
        
		let emailInput = this.shadowRoot.querySelector("custom-input#email");
        emailInput.addEventListener("custominputkeyup", event => {
            this.setInput(event);
        });
        
		let contentInput = this.shadowRoot.querySelector("custom-input#content");
        contentInput.addEventListener("custominputkeyup", event => {
            this.setInput(event);
        });
        
        let button = this.shadowRoot.querySelector('.submit-button');
        button.addEventListener('click', (event) => {
            this.submit();
        });
        
        let homeButton = this.shadowRoot.querySelector('.return-home-button');
        homeButton.addEventListener('click', (event) => {
            window.location = '/pages/home/';
        });

    }

    setInput(event){
        console.log('input changed');
        this.form[event.detail.inputField] = event.detail.value;
    }

    submit(){
        this.showProcessingWall();
        let valid = this.validateSubmission();
        console.log('figure out submitting forms in nodejs and sending notification to me');
        if(valid){
            let contactForm = this;
            $.ajax({
                type: "POST",
                url : "https://adu6x55ip7.execute-api.us-east-2.amazonaws.com/contact-me-email",
                dataType: "json",
                crossDomain: "true",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(this.form),
            success: function () {
                toastr.success('Your message was sent successfully');
                contactForm.showFormCompleted();
            },
            error: function (error, textStatus) {
                // show an error message
                toastr.error('Something went wrong sending your message');
                contactForm.showError();
            }});

        }else{
            this.hideProcessingWall();
        }
        
    }

    validateSubmission(){
        let validInput = true;
        let name = this.form.name;
        let email = this.form.email;
        let content = this.form.content;
        let inputErrors = {
            name: {selector: "custom-input#name", message: ''},
            email: {selector: "custom-input#email", message: ''},
            content: {selector: "custom-input#content", message: ''}
        };

        if(!name){
            inputErrors.name.message = 'You must populate the name field';
        }else if(name && name.length <= 1){
            inputErrors.name.message = 'You must populate a real name';
        }else{
            inputErrors.name.message = '';;
        }

        if(!email){
            inputErrors.email.message = 'You must populate the email field';
        }else if(email && (!email.includes('@') || !email.includes('.') || email.length <= 4)){
            inputErrors.email.message = 'You must populate a real email field';
        }else{
            inputErrors.email.message = '';
        }

        if(!content){
            inputErrors.content.message = 'You must include a message';
        }else{
            inputErrors.content.message = '';
        }

        let errorMessage = 'Please correct the following errors:';
        Object.keys(inputErrors).forEach((input) => {
            if(inputErrors[input].message){
                errorMessage += '\n' + inputErrors[input].message;
                this.showInputError(inputErrors[input].selector);
                validInput = false;
            }else{
                this.removeInputError(inputErrors[input].selector);
            }
        })

        if(!validInput){
            this.shadowRoot.querySelector('.input-error-message').classList.remove('hide');
            this.setAttribute('input-error-message', errorMessage);
        }

        return validInput;
    }

    showInputError(selector){
        let inputField = this.shadowRoot.querySelector(selector);
        inputField.setAttribute('error', true);
    }

    removeInputError(selector){
        let inputField = this.shadowRoot.querySelector(selector);
        inputField.setAttribute('error', false);
    }

    showProcessingWall(){
        this.shadowRoot.querySelector('.processing-wall').classList.remove('hide');
    }

    hideProcessingWall(){
        this.shadowRoot.querySelector('.processing-wall').classList.add('hide');
    }

    showFormCompleted(){
        this.shadowRoot.querySelector('.contact-form-format').classList.add('hide');
        this.shadowRoot.querySelector('.form-completed').classList.remove('hide');
        this.hideProcessingWall();
    }
    
    showError(){
        this.setAttribute('message-text', 'Sorry! There was an issue processing your request.  Feel free to reach out to me at michaelmatonis@hotmail.com or give me a call at the number listed below.');
        this.showFormCompleted();
    }
}

export default ContactForm;