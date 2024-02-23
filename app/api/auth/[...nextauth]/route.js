import { Users } from "@/helpers/constants";
import { hrmLogin } from "@/lib/api";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials){
                const loginData = {email: credentials.email, password: credentials.password};
                const response = await hrmLogin(loginData);
                if(response.status === 200){
                    const {email, fname, lname, image_url} = response.data;
                    const data = {email, name: fname+" "+lname, image: process.env.SERVER_URL+"/"+image_url};
                    return data;
                }
                else{
                    // const defaultData = {email: "admin@gmail.com", name: "Dallas Admin", image: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg"}
                    return null;
                }
                
            },
        })
    ],
    session: {
        strategy: "jwt",
    },
    // callbacks: {
    //     session({session, user}){
    //         session.user.fname = user.fname;
    //         session.user.lanme = user.lname;
    //         session.user.image_url = user.image_url;
    //         return session;
    //     }
    // },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };