import React, { ErrorInfo } from 'react';
import InternalError from './InternalError';
import { AxiosError } from 'axios';

type GenericApiErrorBoundaryState = {
  hasError: boolean;
  error?: any;
};

export default class GenericErrorBoundary extends React.Component<
  any,
  GenericApiErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    logError(error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      // unauthorized error
      if (error?.isAxiosError && error.response?.status === 401) {
        window.location.assign('/welcome');
        return <></>;
      }

      // You can render any custom fallback UI
      return (
        <div>
          <InternalError />
        </div>
      );
    }

    return this.props.children;
  }
}

export const logError = (error: any, errorInfo: ErrorInfo) => {
  console.log(`Caught Generic Error: ${error.message}`, { error, errorInfo });
  if (error.isAxiosError) {
    const apiError: AxiosError = error;
    if (apiError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(apiError.response.data);
      console.log(apiError.response.status);
      console.log(apiError.response.headers);
    } else if (apiError.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(apiError.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', apiError.message);
    }
    console.log('Error config:', apiError.config);
  } else {
    console.log(`Not an Api Error!`);
  }
};
