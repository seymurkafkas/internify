import type { AppProps } from "next/app";
import "../styles/globals.css";
import UserProvider from "../services/auth/userContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
