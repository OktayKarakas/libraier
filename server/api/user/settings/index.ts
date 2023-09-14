import { getToken } from "#auth";
import prisma from "~/helpers/misc/prisma";
// WRONG ERROR BECAUSE OF TS.
// @ts-ignore
import bcrypt from "bcrypt";
import { promisify } from "util"; // Import 'promisify' from the 'util' module

export default defineEventHandler(async (event) => {
  const token = await getToken({ event });
  if (event.node.req.method === "PATCH") {
    async function main() {
      const query = getQuery(event);
      const body = await readBody(event);
      if (!query.removePhoto) {
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
                if (body.username) {
                  const sameUserNameExist = await prisma.user.findUnique({
                    where: {
                      username: body.username,
                    },
                  });
                  if (sameUserNameExist) {
                    await prisma.user.update({
                      where: {
                        email: query.email,
                      },
                      data: {
                        ...body,
                        username: user.username,
                      },
                    });
                    console.log("same user");
                    return { error: "same_username_exist" };
                  } else {
                    await prisma.user.update({
                      where: {
                        email: query.email,
                      },
                      data: {
                        ...body,
                      },
                    });
                    return {};
                  }
                }
                await prisma.user.update({
                  where: {
                    email: query.email,
                  },
                  data: {
                    ...body,
                  },
                });
                return {};
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
      } else {
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
                await prisma.user.update({
                  where: {
                    email: query.email,
                  },
                  data: {
                    profilePhoto: "",
                  },
                });
              }
            }
          } else {
            console.error("user not exist.");
            Promise.reject("error.");
            return { error: true };
          }
        } else {
          console.error("Type Error");
          Promise.reject("error.");
          return { error: true };
        }
      }
    }

    return main()
      .then((result) => {
        return { result };
      })
      .catch(async (e: any) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
  }
  return {};
});
