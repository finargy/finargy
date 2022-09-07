import React from "react";
import {GetServerSideProps, NextPage} from "next";
import {Box, Text} from "@chakra-ui/react";
import {getToken} from "next-auth/jwt";

import {dbUsers, dbUserValidation} from "../../database";
import {AuthLayout} from "../../components/layouts";
import {get32DigitsToken, getDateNowPlusHours} from "../../utils";
import {mailer} from "../../utils/nodemailer";

type Props = {
  validation: boolean;
  message: string;
};

const VerificationPage: NextPage<Props> = ({validation, message}) => {
  return (
    <AuthLayout title="Verificación">
      <Box>
        <Text>Verificacion: {validation ? "Correcta" : "Error"}</Text>
        <Text>Mensaje: {message}</Text>
      </Box>
    </AuthLayout>
  );
};

export default VerificationPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
  const {token, email} = query as {token: string; email: string};
  const session: any = await getToken({req});

  const res = await checkUserValidation(token, email, session);

  return res;
};

const checkUserValidation = async (token: string, email: string, session: any) => {
  // check if user is logged in and already verified
  if (session?.user.isVerified) {
    return {
      props: {
        validation: true,
        message: `El email ${email} ya se encuentra verificado!`,
      },
    };
  }

  // if user logged in is different from the user to be validated
  if (session?.user.email !== email) {
    return {
      props: {
        validation: false,
        message: `Cierre sesión en esta cuenta para validar ${email}.`,
      },
    };
  }

  const userValidation = await dbUserValidation.getUserValidation(token);
  const user = await dbUsers.getUserByEmail(email);

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  if (!userValidation && user.isVerified) {
    return {
      props: {
        validation: true,
        message: `El email ${email} ya se encuentra verificado!`,
      },
    };
  }

  const dateNow = new Date().getTime();
  const expirationDate = new Date(userValidation?.expiration!).getTime();

  if (dateNow > expirationDate) {
    const token = get32DigitsToken();
    const expiration = getDateNowPlusHours(24);
    const newUserValidation = await dbUserValidation.createUserValidation(
      user._id,
      token,
      expiration,
    );

    await mailer.send(
      "RegistrationEmail",
      {
        name: user.name,
        brand: "Finargy",
        verificationUrl: `${process.env.HOST_URL}/auth/verification?token=${newUserValidation?.token}&email=${user.email}`,
      },
      {
        to: user.email,
        from: process.env.EMAIL_FROM,
      },
    );
    await dbUserValidation.hardDeleteUserValidationById(userValidation?._id!);

    return {
      props: {
        validation: false,
        message:
          "El link de validación expiró. Un nuevo link se envió a su email. Mire la bandeja de entrada.",
      },
    };
  }

  if (userValidation) {
    try {
      await dbUsers.updateUserById(userValidation?.user! as string, {isVerified: true});
      await dbUserValidation.hardDeleteUserValidationById(userValidation?._id!);
    } catch (error) {
      return {
        props: {
          validation: false,
          message: "Error en la verificación. Recarge la página.",
        },
      };
    }
  }

  return {
    props: {
      validation: true,
      message: "Verificación exitosa!",
    },
  };
};
