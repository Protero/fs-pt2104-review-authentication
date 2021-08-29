const transporter = require('../configs/mailer');

const templateFactory = (to,confirmationToken) => ({
    from : process.env.MAIL_USER,
    to: to,
    subject: 'Confirmación',
    html: `
        <h3>Gracias por registrarte</h3>
        <p>Para poder acceder a la web, por favor, haz click
        <a href="http://localhost:3000/auth/confirmation/${confirmationToken}">Aquí</a>
        </p>
    `
});

const sendMail = async (to, confirmationToken) => {
    const template = templateFactory(to,confirmationToken);
    return await transporter.sendMail(template);
};

const templateConfirm = (to, username) => ({
    from : process.env.MAIL_USER,
    to: to,
    subject: 'Datos de acceso',
    html: `
        <h3>Registro confirmado</h3>
        <p>Sus datos de acceso son:</p>
        <ul>
            <li>email: ${to}</li>
            <li>username: ${username}</li>
        </ul>
        <p>Ya puede acceder a la plataforma</p>
        </p>
    `
});

const sendMailFinal = async (to, username) => {
    const template = templateConfirm(to, username);
    return await transporter.sendMail(template);
};

module.exports = {
    sendMail,
    sendMailFinal,
};