<?php 

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email {

    public $email;
    public $nombre;
    public $token;

    public function __construct($email, $nombre, $token){
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }    
    
    public function enviarConfirmacion() {

        // cuerpo del email que se enviara al usuario que este intentando crear su cuenta
        $contenido = "
            <html>
                <p>Hola <strong>$this->nombre!</strong></p>
                <p>Has solicitado la creación de tu cuenta en AppSalon.</p> 
                <p>Click <a href='https://appsalon-lionel-prats.alwaysdata.net/confirmar-cuenta?token=$this->token'>aquí</a> para confirmar tu cuenta.</p>
                <small style=\"color: red;\">- Si tú no solicitaste la creación de esta cuenta, simplemente ignora este mensaje. -</small>
            </html>
        ";

        // crear el objeto de email
        $mail = new PHPMailer();
        $mail->isSMTP(); // SMTP -> protocolo de envio de emails


        
        $mail->SMTPAuth = true;
        
        // Configuracion Mailtrap - VIDEO 471 vvv    
        // $mail->Host = 'sandbox.smtp.mailtrap.io';
        // $mail->Port = 2525;
        // $mail->Username = '0ee9fc809210a6';
        // $mail->Password = 'a7becad76ae08f';
        // $mail->setFrom('cuentas@appsalon.com');
        //$mail->addAddress('cuentas@appsalon.com', 'AppSalon.com');

        // Configuarcion Lio - VIDEO 471 vvv
        // Mail remitente -> bienesraices20230410@gmail.com -> mail de prueba que cree para los proyectos de prueba phpmailer y phpmailer2023
        $mail->Host = 'smtp.gmail.com';     
        $mail->Port = 587;                                    
        $mail->Username = 'bienesraices20230410@gmail.com';                     
        $mail->Password = 'hphfsbmvevcsrcds';   
        $mail->setFrom('bienesraices20230410@gmail.com');
        $mail->addAddress($this->email, $this->nombre);
        // Fin configuarcion Lio - VIDEO 471

        $mail->Subject = 'Confirma tu cuenta';
        $mail->isHTML(true); 
        $mail->CharSet = "UTF-8";
        $mail->Body = $contenido;
        $mail->send();
    }

    public function enviarInstrucciones() {
        $contenido = "
            <html>
                <p>Hola <strong>$this->nombre!</strong></p>
                <p>Has solicitado reestablecer tu contraseña.</p> 
                <p>Haz click <a href='https://appsalon-lionel-prats.alwaysdata.net/recuperar?token=$this->token'>aquí</a> reestablecer tu contraseña.</p>
                <small style=\"color: red;\">- Si tú no solicitaste este cambio ignora este mensaje. -</small>
            </html>
        ";

        $mail = new PHPMailer();
        $mail->isSMTP(); // SMTP -> protocolo de envio de emails
        
        $mail->SMTPAuth = true;
        
        $mail->Host = 'smtp.gmail.com';     
        $mail->Port = 587;                                    
        $mail->Username = 'bienesraices20230410@gmail.com';                     
        $mail->Password = 'hphfsbmvevcsrcds';   
        $mail->setFrom('bienesraices20230410@gmail.com');
        $mail->addAddress($this->email, $this->nombre);
        
        $mail->Subject = 'Reestablece tu password'; // asunto del email
        $mail->isHTML(true); 
        $mail->CharSet = "UTF-8";
        $mail->Body = $contenido;
        $mail->send();
    }

}
