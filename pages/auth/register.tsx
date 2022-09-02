import {useState} from "react";
import {GetServerSideProps, NextPage} from "next";
import {getProviders, getSession, signIn} from "next-auth/react";
import NextLink from "next/link";
import {useForm} from "react-hook-form";
import {
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Icon,
  Input,
  Link,
  Tag,
  Text,
} from "@chakra-ui/react";
import {BiErrorCircle} from "react-icons/bi";
import {useRouter} from "next/router";

import {AuthLayout} from "../../components/layouts";
import {validations} from "../../utils";

type Providers = {
  [key: string]: {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
  };
};

type FormData = {
  name: string;
  email: string;
  password: string;
  password2: string;
};

type Props = {
  providers: Providers;
};

const RegisterPage: NextPage<Props> = ({providers}) => {
  const {google} = providers;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onRegisterUser = () => {
    // TODO
  };

  return (
    <AuthLayout title="Ingresar">
      <form noValidate onSubmit={handleSubmit(onRegisterUser)}>
        <Grid
          backgroundColor="whiteAlpha.200"
          borderRadius="20px"
          className="fadeIn"
          gap={2}
          p="30px 30px"
          w={350}
        >
          <GridItem>
            <Tag colorScheme="red" display={showError ? "flex" : "none"} p={3} w="100%">
              <Icon as={BiErrorCircle} fontSize="lg" mr={1} />
              Email o contraseña incorrectos
            </Tag>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel fontWeight="bold" htmlFor="name">
                Nombre
              </FormLabel>
              <Input
                backgroundColor="whiteAlpha.800"
                color="black"
                id="name"
                type="text"
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 2,
                    message: "Este campo debe tener al menos 2 caracteres",
                  },
                })}
              />
              {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel fontWeight="bold" htmlFor="email">
                Correo
              </FormLabel>
              <Input
                backgroundColor="whiteAlpha.800"
                color="black"
                id="email"
                type="email"
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
              />
              {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel fontWeight="bold" htmlFor="password">
                Contraseña
              </FormLabel>
              <Input
                backgroundColor="whiteAlpha.800"
                color="black"
                id="password"
                type="password"
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
              />
              {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.password2}>
              <FormLabel fontWeight="bold" htmlFor="password2">
                Repetir contraseña
              </FormLabel>
              <Input
                backgroundColor="whiteAlpha.800"
                color="black"
                id="password2"
                type="password"
                {...register("password", {
                  required: "Este campo es requerido",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
              />
              {errors.password2 && <FormErrorMessage>{errors.password2.message}</FormErrorMessage>}
            </FormControl>
          </GridItem>

          <GridItem>
            <Button
              colorScheme="yellow"
              disabled={isLoading}
              isLoading={isLoading}
              size="lg"
              type="submit"
              w="100%"
            >
              Ingresar
            </Button>
          </GridItem>

          <GridItem display="flex" justifyContent="end" pt={2}>
            <NextLink
              passHref
              href={router.query.p ? `/auth/register?p=${router.query.p}` : "/auth/login"}
            >
              <Link textDecor="underline">Ya tienes cuenta?</Link>
            </NextLink>
          </GridItem>

          <GridItem>
            <HStack color="blackAlpha.500">
              <Divider borderColor="blackAlpha.500" mb={2} mt={2} />
              <Text>O</Text>
              <Divider borderColor="blackAlpha.500" mb={2} mt={2} />
            </HStack>

            <Button
              colorScheme="blackAlpha"
              mt={2}
              variant="outline"
              w="100%"
              onClick={() => signIn(google.id)}
            >
              {google.name}
            </Button>
          </GridItem>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {
  const session = await getSession({req});
  // the querys saves user redirection path
  const {p = "/"} = query;

  // user already log in
  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};
