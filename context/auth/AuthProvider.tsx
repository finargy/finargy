import {useReducer, FC, useEffect} from "react";
import axios from "axios";
import {useSession} from "next-auth/react";

import {finargyApi} from "../../axiosApi";
import {IUser} from "../../interfaces";

import {AuthContext, authReducer} from "./";

interface Props {
  children: React.ReactNode;
}

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const {data, status} = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch({type: "Auth - Login", payload: data?.user as IUser});
    }
  }, [status, data]);

  /**
   * Register the user by calling the /user/register endpoint and
   * dispatch "Auth - Login"
   * @param email - registration email
   * @param password - registration password
   * @param name - registration name
   * @returns Promise that resolves to an object with
   * hasError: boolean and message?: string
   */
  const registerUser = async (
    email: string,
    password: string,
    name: string,
  ): Promise<{hasError: boolean; message?: string}> => {
    try {
      const {data} = await finargyApi.post("/user/register", {email, password, name});

      dispatch({type: "Auth - Login", payload: data.user});

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as any;

        return {
          hasError: true,
          message: err.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "User registration error",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // methods
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
