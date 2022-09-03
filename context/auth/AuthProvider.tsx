import axios from "axios";
import {useReducer, FC} from "react";

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
