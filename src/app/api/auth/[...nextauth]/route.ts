import NextAuth, { Awaitable, NextAuthOptions }  from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { agent } from '../../../../lib/api'
import { AtpAgentLoginOpts, AtpSessionData } from '@atproto/api'

const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Bluesky',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        identifier: { label: 'Username', type: 'text', placeholder: 'username.bksy.social' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, _) {
        const user = await agent.login(credentials as AtpAgentLoginOpts)

        return user?.data
          ? { id: user.data.did, email: user.data.email, name: user.data.handle }
          : null
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(AuthOptions)

export { handler as GET, handler as POST }
