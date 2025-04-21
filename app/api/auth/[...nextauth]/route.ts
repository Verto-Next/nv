import NextAuth, { AuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions: AuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || '',
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || '',
      tenantId: process.env.AZURE_AD_TENANT_ID || '',
    }),
  ],
  pages: {
    signIn: '/signin',
    signOut: '/',
    error: '/signin', // Error code passed in query string as ?error=
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the access token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };