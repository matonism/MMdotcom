//TODO: implement real validation for email address, name, and content
//email must have @ and .
//email must be at least 5 characters with characters on either side of the @ and .
//Name must be at least 2 characters
//content must be at least 4 characters (maybe a soft check? Is this all you wanted to say?)

//TODO: implement a loading icon for when email is sending
import MiCoolComponent from "../../micomponent-framework/MiCoolComponent.js";

class ContactForm extends MiCoolComponent {

    static get observedAttributes(){
        return ['message-text']
    }

    form = {name: '', email: '', content: ''};

    connectedCallback(){
        super.connectedCallback();
        this.setAttribute('message-text', 'Thank you for reaching out! I\'ll get back to you as soon as I can!');
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
        if(!name){
            let nameInput = this.shadowRoot.querySelector("custom-input#name");
            nameInput.setAttribute('error', true);
            validInput = false;
        }
        if(!email){
            let emailInput = this.shadowRoot.querySelector("custom-input#email");
            emailInput.setAttribute('error', true);
            validInput = false;
        }
        if(!content){
            let contentInput = this.shadowRoot.querySelector("custom-input#content");
            contentInput.setAttribute('error', true);
            validInput = false;
        }

        return validInput;
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