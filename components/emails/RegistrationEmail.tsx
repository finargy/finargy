import {Email} from "../../utils/nodemailer";

type RegistrationProps = {
  name: string;
  brand: string;
};

export const RegistrationEmail: Email<RegistrationProps> = ({name, brand}) => ({
  subject: `Bienvenido a ${brand}!`,
  body: (
    <body>
      <h1>Hola {name}</h1>
      <p>Aca va el link para autenticar el correo!</p>
    </body>
  ),
});
