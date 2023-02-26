const isUnauthenticatedError = (error) => {
  const { graphQLErrors } = error;
  for (const error of graphQLErrors) {
    switch (error.extensions.code) {
      case "UNAUTHENTICATED":
        return true;
      default:
        return false;
    }
  }
};

export { isUnauthenticatedError };
