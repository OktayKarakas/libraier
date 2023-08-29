import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "~/helpers/misc/prisma";
// WRONG ERROR BECAUSE OF TS.
// @ts-ignore
import bcrypt from "bcrypt";

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user && token) {
        const saltRounds = 10;
        bcrypt.hash(
          token.sub,
          saltRounds,
          async function (err: any, hash: any) {
            if (token.email) {
              const existUser = await prisma.user.findUnique({
                where: {
                  email: token.email,
                },
              });

              if (!existUser) {
                if (token.name) {
                  await prisma.user.create({
                    data: {
                      fullName: token.name,
                      username: token.name,
                      email: token.email,
                      password: hash,
                      profilePhoto: `${token.picture}`,
                    },
                  });
                }
              }
            }

            if (err) {
              console.error("error hashing.");
            }
          }
        );
      }
      return Promise.resolve(token);
    },
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
