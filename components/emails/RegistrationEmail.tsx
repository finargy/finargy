import {Email} from "../../utils/nodemailer";

type RegistrationProps = {
  name: string;
  verificationUrl: string;
  brand: string;
};

export const RegistrationEmail: Email<RegistrationProps> = ({name, brand, verificationUrl}) => ({
  subject: `Bienvenido a ${brand}!`,
  body: (
    <body>
      <h1>Hola {name}</h1>
      <a href={verificationUrl}>Entra al link para activar tu cuenta!</a>
    </body>
  ),
});
