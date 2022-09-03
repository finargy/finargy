import {useRouter} from "next/router";
import {useEffect, useState} from "react";

type UseErrorFormProps = {
  textError: string;
  displayError: boolean;
  loading: boolean;
  queryErrors: boolean;
};

/**
 * Hook to handle form errors.
 *
 * @param {string} [textError] - The text to display in the error message.
 * @param {boolean} [displayError=false] - boolean = false,
 * @param {boolean} [loading=false] - boolean = false
 * @param {boolean} [queryErrors] - Show error displayed in the query url
 * @returns An object with the following properties:
 * - errorMessage
 * - setErrorMessage
 * - showError
 * - setShowError
 * - isLoading
 * - setIsLoading
 */
export const useErrorForm = ({
  textError,
  displayError,
  loading,
  queryErrors,
}: UseErrorFormProps) => {
  const {query} = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>(textError);
  const [showError, setShowError] = useState<boolean>(displayError);
  const [isLoading, setIsLoading] = useState<boolean>(loading);

  useEffect(() => {
    const error = queryErrors ? (query.error as string) : "";

    if (error === "CredentialsSignin") {
      setShowError(true);
      setErrorMessage("Email o contraseña no válidos");
    }
  }, [query, setErrorMessage, setShowError, queryErrors]);

  return {
    errorMessage,
    setErrorMessage,
    showError,
    setShowError,
    isLoading,
    setIsLoading,
  };
};
