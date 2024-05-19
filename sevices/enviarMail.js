//Pack de conf de un .env creado por el usuario
import dotenv from 'dotenv';
//Funcion que permite el envio de emails
import nodemailer from 'nodemailer';
dotenv.config()

const MAIL_EMPRESA = process.env.MAIL_EMPRESA;
const CODIGO_MAIL = process.env.CODIGO_MAIL;

const enviarMail = async (email, nombre) =>{
    console.log(`Email enviado a ${email} - ${nombre}`);
    console.log(`Email enviado correctamente`);

    //transportador cre
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: MAIL_EMPRESA,
            pass: CODIGO_MAIL
        }
    })
    
    let emaildata = await transporter.sendMail({
        from: `Empresa <${MAIL_EMPRESA}>`,
        to: email,
        subject: 'Registro Exitoso 🌳. Gracias por contactarte con Ngen Ambiental',
        html: `<h2>Estimado/a ${nombre} Gracias por completar nuestro formulario </h2> 
        <p>Queremos expresar nuestro sincero agradecimiento por haber completado nuestro formulario. Tu interés y participación son de gran valor para nosotros en Ngen Ambiental.<br><br>Hemos recibido tu información con éxito y estamos emocionados de comenzar este viaje contigo. En breve, nos pondremos en contacto contigo para continuar con el proceso. <br><br>Si tienes alguna pregunta o necesitas más información mientras tanto, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte en todo lo que necesites.<br><br>Una vez más, gracias por tu tiempo y colaboración. ¡Esperamos con ansias trabajar juntos!<br><br>Saludos cordiales,<br><br>Ngen Ambiental</p>
        
        <img src="https://www.ngenambiental.cl/images/logo_ngen_web.png">`,
    })
}

export default enviarMail;