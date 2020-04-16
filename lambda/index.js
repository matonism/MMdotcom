//When deploying new lambda function for email, we must travel to this link and continue
//https://accounts.google.com/b/0/displayunlockcaptcha

//TODO: See if there is any way to load balance or limit requests
//This applies for both Lambda (because I don't want to be DDOS'ed with emails) and S3 (because I don't want to be regular DDOS'ed and have to pay a bunch)
var sesAccessKey = process.env.email_address;
var sesSecretKey = process.env.secret_key;

exports.handler = function(event, context, callback) {

  	var nodemailer = require('nodemailer');
  	var smtpTransport = require('nodemailer-smtp-transport');

  	var transporter = nodemailer.createTransport(smtpTransport({
	    service: 'gmail',
	    auth: {
	        user: sesAccessKey,
	        pass: sesSecretKey
	    }
  	}));

    try{
        let payload = JSON.parse(event.body);
        if(!payload || !payload.name || !payload.email || !payload.content){
  	  
            const response = {
                statusCode: 500,
                body: JSON.stringify({
                    error: 'malformed params',
                }),
            };
            callback(null, response);
        
  	    }else{
  	  
  	    
            var message = {
                from: sesAccessKey,
                to: "michaelkmatonis@gmail.com",
                subject: "Interest at michaelmatonis.com",
                html: "<div>Message from " + payload.name + "</div><div>" + payload.email + "</div><p>" + payload.content + "</p>"
            };
            
            transporter.sendMail(message, function(error, info){
                if(error){
                    const response = {
                        statusCode: 500,
                        body: JSON.stringify({
                            error: error.message,
                        }),
                    };
                    callback(null, response);
                }
            
                const response = {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: `Email processed succesfully!`
                    }),
                };
                callback(null, response);

            });
        }
    }catch(e){
        const response = {
            statusCode: 500,
            body: JSON.stringify({
                error: e,
            }),
        };
        callback(null, response);
    }

}