import "./globals.css";
import Head from "next/head";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import AuthProvider from "./Providers";
import CustomToast from "@/components/CustomToast";
config.autoAddCss = false;


export const metadata = {
  title: "HRM System",
  description: "Human Resource Management System by Alvi Noor Hossain",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      </Head>
      <body>
        <AuthProvider>
          <CustomToast />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
