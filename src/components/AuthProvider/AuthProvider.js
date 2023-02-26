import { ApolloError, useLazyQuery, useMutation } from "@apollo/client";
import { createContext } from "react";
import { CURRENT_USER_QUERY } from "./queries/currentUser";
import { SIGN_UP_MUTATION } from "./mutations/signUp";
import { SIGN_IN_MUTATION } from "./mutations/signIn";
import { LOGOUT_MUTATION } from "./mutations/logout";
import { REFRESH_MUTATION } from "./mutations/refresh";
import { useNavigate } from "react-router-dom";
import { isUnauthenticatedError } from "../../common/utils";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [signInMutation] = useMutation(SIGN_IN_MUTATION);
  const [signUpMutation] = useMutation(SIGN_UP_MUTATION);
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);
  const [getUserQuery] = useLazyQuery(CURRENT_USER_QUERY, {
    fetchPolicy: "network-only",
  });
  const [
    refreshMutation,
    { reset: resetRefreshMutation, called: isRefreshCalled },
  ] = useMutation(REFRESH_MUTATION, {
    fetchPolicy: "network-only",
  });

  const getCurrentUser = (callback, options = { refetch: false }) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!options.refetch && currentUser) {
      callback(null, currentUser);
      return;
    }
    getUserQuery({
      onError: (error) => callback(error),
      onCompleted: ({ currentUser }) => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        callback(null, currentUser);
      },
    });
  };

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
    localStorage.removeItem("currentUser");
    logoutMutation({
      onError: (error) => callback(error),
      onCompleted: (data) => callback(null, data),
    });
  };

  const refresh = (request, callback) => {
    console.log("refresh");
    refreshMutation({
      onError: (error) => {
        if (isUnauthenticatedError(error)) {
          logout(() => {
            navigate("/signIn");
          });
          return;
        }
        callback(error);
      },
      onCompleted: () => {
        dispatchGraphqlRequest(request, callback);
      }
    });
  }

  const dispatchGraphqlRequest = (request, callback) => {
    request({
      onError: (error) => {
        if (isUnauthenticatedError(error)) {
          refresh(request, callback);
          return;
        }
        callback(error)
      },
      onCompleted: (data) => callback(null, data),
    });
  };

  const value = {
    getCurrentUser,
    signUp,
    signIn,
    logout,
    dispatchGraphqlRequest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
