import { adminLoginAPI, hrmLoginAPI } from "@/lib/api";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
var bcrypt = require('bcryptjs');


async function HR_Login(loginData) {
    const response = await hrmLoginAPI(loginData);
    if (response.status === 200) {
        const { email, fname, lname, image_url, userId, password, moduleAccess } = response.data;
        const compare_hash = bcrypt.compareSync(loginData.password, password);

        if (compare_hash) {
            const user = { email, name: `${fname} ${lname}`, image: image_url, userId: userId, module: moduleAccess, role: "hr" };
            console.log(user)
            return user;
        }
        else {
            throw new Error('Password is incorrect');
        }

    }
    else if(response.status === 0 && response.data.length === 0) {
        throw new Error('No user found');
    }
}

async function Admin_Login(loginData){
    const dataPost = {email: loginData.email, password: loginData.password};
    const response = await adminLoginAPI(dataPost);
    console.log("RESPONSE ADMIN", response)
    if(response.status === 200){
        const data = response.data;
        const user = {name: data.name, email: data.email, image: data.image_url, userId: data.adminId, role: "admin"};
        console.log(user)
        return user;
    }
    else if(response.status === 0 && response.data.length === 0) {
        throw new Error('No user found');
    }
    else{
        throw new Error('Password is incorrect');
    }
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const loginData = { email: credentials.email, password: credentials.password };                
                console.log("UserType:", credentials.userType)
                if(credentials.userType === "hr"){
                    return HR_Login(loginData);  
                }
                else if(credentials.userType === "admin"){
                    return Admin_Login(loginData);
                }

            },
        })
    ],
    callbacks: {
        async jwt({ token, user, session }) {
            // console.log("JWT Callback:: ", {token, user, session});
            if (user) {
                return {
                    ...token,
                    userId: user.userId,
                    module: user.module,
                    role: user.role,
                };
            }
            return token;
        },
        async session({ session, token, user }) {
            // console.log("Session Callback:: ", {user, session});
            return {
                ...session,
                user: {
                    ...session.user,
                    userId: token.userId,
                    module: token.module,
                    role: token.role,
                }
            };
        },
        
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
