import React from "react";
import {GetServerSideProps, NextPage} from "next";
import {getSession} from "next-auth/react";
import {Box} from "@chakra-ui/react";

import {dbUsers, dbUserValidation} from "../../database";
import {AuthLayout} from "../../components/layouts";

type Props = {
  validation: boolean;
};

const VerificationPage: NextPage<Props> = ({validation}) => {
  return (
    <AuthLayout title="Verificación">
      <Box>verificacion: {validation ? "Correcta" : "Eror"}</Box>
    </AuthLayout>
  );
};

export default VerificationPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const {token} = query as {token: string};
  const session: any = await getSession();

  // user already verified
  if (session?.user.isVerified) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const userValidation = await dbUserValidation.getUserValidation(token);
  // TODO: checkear expiration date

  // validation exists
  const validation = userValidation ? true : false;

  if (validation) {
    try {
      await dbUsers.updateUserById(userValidation?.user! as string, {isVerified: true});
      await dbUserValidation.hardDeleteUserValidationById(userValidation?._id!);
    } catch (error) {
      return {
        props: {
          validation: false,
        },
      };
    }
  }

  return {
    props: {
      validation,
    },
  };
};
