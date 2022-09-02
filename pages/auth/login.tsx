import {Heading} from "@chakra-ui/react";
import {useSession} from "next-auth/react";
import Link from "next/link";

import {AuthLayout} from "../../components/layouts";

const LoginPage = () => {
  const session = useSession();

  console.log(session);

  return (
    <AuthLayout title="Login">
      <Heading>Login page</Heading>
      <Link href="/api/auth/signin">Login</Link>
    </AuthLayout>
  );
};

export default LoginPage;
