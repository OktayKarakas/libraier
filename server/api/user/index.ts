import prisma from "~/helpers/misc/prisma";
import { getToken } from "#auth";
// WRONG ERROR BECAUSE OF TS.
// @ts-ignore
import bcrypt from "bcrypt";
import { promisify } from "util"; // Import 'promisify' from the 'util' module

export default defineEventHandler(async (event) => {
  const token = await getToken({ event });

  // USER DATA
  if (event.node.req.method === "GET") {
    const query = getQuery(event);
    async function main() {
      if (query.getUser) {
        if (typeof query.email === "string") {
          const user = await prisma.user.findUnique({
            where: {
              email: query.email,
            },
          });
          if (user) {
            if (token && token.sub) {
              const compareAsync = promisify(bcrypt.compare);
              const result = await compareAsync(token.sub, user.password);
              if (result) {
                return { user };
              } else {
                console.error("Authentication failed.");
                return { success: false };
              }
            } else {
              console.error("Token missing.");
              return { success: false };
            }
          } else {
            console.error("User not found.");
            return { success: false };
          }
        } else {
          console.error("Type Error.");
          return { success: false };
        }
      } else if (query.getUserWithoutAuth) {
        if (typeof query.id === "string") {
          const user = await prisma.user.findUnique({
            where: {
              id: query.id,
            },
            select: {
              id: true,
              username: true,
              description: true,
              profilePhoto: true,
            },
          });

          return user;
        }
      }
    }

    return main()
      .then((user) => {
        return { user };
      })
      .catch(async (e: any) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });

    // USER REGISTER
  } else if (event.node.req.method === "POST") {
    async function main() {
      const body = await readBody(event);
      const user = await prisma.user.create({
        data: {
          fullName: body.fullName,
          username: body.username,
          email: body.email,
          description: body.description,
          password: body.password,
        },
      });

      return user;
    }

    return main()
      .then((users) => {
        return users;
      })
      .catch(async (e: any) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
    // UPDATE USER
  } else if (event.node.req.method === "PATCH") {
    async function main() {
      const query = getQuery(event);
      const body = await readBody(event);
      if (typeof query.id === "string") {
        const updateUser = await prisma.user.update({
          where: {
            id: query.id,
          },
          data: {
            ...body,
          },
        });
        return updateUser;
      }
    }
    return main()
      .then((user) => {
        return user;
      })
      .catch(async (e: any) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
    // DELETE USER
  } else if (event.node.req.method === "DELETE") {
    async function main() {
      const query = getQuery(event);
      if (typeof query.id === "string") {
        const deleteUser = await prisma.user.delete({
          where: {
            id: query.id,
          },
        });
        return deleteUser;
      }
    }

    return main()
      .then((user) => {
        return user;
      })
      .catch(async (e: any) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
  }
});
