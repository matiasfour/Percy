import { BASE_URL } from "@/api/constants";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { isExpired, decodeToken } from "react-jwt";


async function refreshAccessToken(token: any) {
  try {
    const url = `${BASE_URL}token/refresh/`

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({refresh: token.refreshToken})
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    //@ts-ignore
    let expiracy = decodeToken(refreshedTokens.access).exp

    return {
      ...token,
      access: refreshedTokens.access,
      accessTokenExpires: Date.now() + expiracy,
      refreshToken: token.refreshToken,
      error: "RefreshAccessTokenError",
    }
  } catch (error) {

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}


export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Crendentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(BASE_URL + "login/", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          // If no error and we have user data, return it
          if (res.ok) {
            const user = await res.json();
            if (user) {
              return user;
            } else {
              return null;
            }
          }
          // Return null if user data could not be retrieved
        } catch (error) {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        //@ts-ignore
        let expiracy = decodeToken(user.access).exp
        //@ts-ignore
        console.log(decodeToken(user.access))
        //@ts-ignore
        token = { access: user.access, accessTokenExpires: expiracy, refreshToken: user.refresh, };
      }

      //@ts-ignore
      if (!isExpired(token.access)) {
        console.log("hora actual", Date.now())
        console.log("hora de expiracion", token.accessTokenExpires)
        console.log("no se refrescara")
        return token
      }

      console.log("se refrescara");
      return refreshAccessToken(token)
    },
    async session({ session, token, user }) {
      //@ts-ignore
      session.access = token.access;
      //@ts-ignore
      session.error = token.error;
      //@ts-ignore
      session.refresh = token.refreshToken
      return session;
    },
    async signIn({ user, account, profile, email, credentials, }) {
      //@ts-ignore
      user.access = user.access;
      //@ts-ignore
      user.refresh = user.refresh;
      return true;
    },
  },
};

export default NextAuth(authOptions);
