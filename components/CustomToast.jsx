import React from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function CustomToast() {
    
    return (
        <ToastContainer
            position="top-right"
            autoClose={10000}
            hideProgressBar={false}
            pauseOnHover={true}
            transition={Bounce}
            newestOnTop={false}
            closeOnClick={true}
            theme="light"
            limit={6}
        />
    )
}
