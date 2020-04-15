import MiCoolComponent from "../../micomponent-framework/MiCoolComponent.js";

class ContactForm extends MiCoolComponent {

    form = {name: '', email: '', content: ''};

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
            $.ajax({
                type: "POST",
                url : "https://adu6x55ip7.execute-api.us-east-2.amazonaws.com/contact-me-email",
                dataType: "json",
                crossDomain: "true",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(this.form),
            success: function () {
                // clear form and show a success message
                //alert("Successful");
                // Display an info toast with no title
                toastr.success('Your message was sent successfully');
                setTimeout(() => {
                    location.reload()
                }, 5000);
            },
            error: function (error, textStatus) {
                // show an error message
                alert("Unsuccessfull");
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
}

export default ContactForm;