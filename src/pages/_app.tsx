import { AppProps } from "next/app";
import Head from "next/head";

import "../styles/reset.scss";
import "../styles/global.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="shortcut icon"
                    href="/favicon.png"
                    type="image/x-icon"
                />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
