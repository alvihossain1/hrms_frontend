import { hrmLogin } from "@/lib/api";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
var bcrypt = require('bcryptjs');

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials){
                const loginData = {email: credentials.email, password: credentials.password};
                const response = await hrmLogin(loginData);
                if(response.status === 200){
                    const {email, fname, lname, image_url, userId, password} = response.data;                 
                    const compare_hash = bcrypt.compareSync(loginData.password, password);

                    if(compare_hash){
                        const user = {email, name: `${fname} ${lname}`, image: image_url, userId: userId};
                        console.log(user)
                        return user;
                    }
                    else{
                        return null;
                    }
                    
                }
                else{
                    // const defaultData = {email: "admin@gmail.com", name: "Dallas Admin", image: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg"}
                    return null;
                }
                
            },
        })
    ],
    callbacks: {
        async jwt({token, user, session}){
            // console.log("JWT Callback:: ", {token, user, session});
            if(user){
                return {
                    ...token,
                    userId: user.userId
                };
            }            
            return token;
        },
        async session({session, token, user}){
            // console.log("Session Callback:: ", {user, session});
            return {
                ...session,
                user: {
                    ...session.user,
                    userId: token.userId,
                }
            };
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };