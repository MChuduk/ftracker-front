import { useLazyQuery,useMutation } from "@apollo/client";
import { createContext } from "react";
import { CURRENT_USER_QUERY } from "./queries/currentUser";
import { SIGN_UP_MUTATION } from "./mutations/signUp";
import { SIGN_IN_MUTATION } from "../Forms/SignInForm/mutations/signIn";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [signInMutation] = useMutation(SIGN_IN_MUTATION);
  const [signUpMutation] = useMutation(SIGN_UP_MUTATION);
  const [getUserQuery] = useLazyQuery(CURRENT_USER_QUERY);

  const getCurrentUser = (callback) => {
    getUserQuery({
      onError: (error) => callback(error),
      onCompleted: (data) => callback(null, data),
    });
  }


  const signUp = (data, callback) => {
    const { email, password, displayName } = data;
    signUpMutation({
      variables: {
        credentials: { email, password, displayName },
      },
      onError: (error) => callback(error),
      onCompleted: (data) => callback(null, data),
    });
  };

  const signIn = (data, callback) => {
    const { email, password } = data;
    signInMutation({
      variables: {
        credentials: { email, password },
      },
      onError: (error) => callback(error),
      onCompleted: (data) => callback(null, data),
    });
  };

  const logout = (callback) => {
    callback();
  };

  const value = { getCurrentUser, signUp, signIn, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
