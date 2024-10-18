import { NextAuthOptions } from "next-auth"


export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    
   ],
   pages: {
    signIn: "/login"
   },
   secret: process.env.NEXTAUTH_SECRET
}

// export default NextAuth(authOptions)