import { getToken } from "#auth";
import prisma from "~/helpers/misc/prisma";
// WRONG ERROR BECAUSE OF TS.
// @ts-ignore
import bcrypt from "bcrypt";
import { promisify } from "util";

export default defineEventHandler(async (event) => {
  const token = await getToken({ event });

  if (event.node.req.method === "POST") {
    async function main() {
      const query = getQuery(event);
      const body = await readBody(event);
      if (query.category_create) {
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
                if (body.name) {
                  const trimmedName = body.name.trim().toLowerCase();
                  const nameWithoutMultipleSpaces = trimmedName.replace(
                    /\s{2,}/g,
                    " "
                  );
                  const nameArr = nameWithoutMultipleSpaces.split(" ");
                  const name = nameArr.join("_");
                  const sameCategoryExist = await prisma.category.findFirst({
                    where: {
                      name: name,
                    },
                  });
                  if (sameCategoryExist) {
                    return {
                      status: 400,
                      json: { error: "category_exist" },
                    };
                  } else {
                    const trimmedName = body.name.trim().toLowerCase();
                    const nameWithoutMultipleSpaces = trimmedName.replace(
                      /\s{2,}/g,
                      " "
                    );
                    const nameArr = nameWithoutMultipleSpaces.split(" ");
                    const name = nameArr.join("_");
                    await prisma.category.create({
                      data: {
                        name: name,
                      },
                    });
                    return {
                      status: 200,
                      json: { success: true },
                    };
                  }
                }
              }
            }
          }
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
  } else if (event.node.req.method === "GET") {
    async function main() {
      const query = getQuery(event);
      if (query.getCategory) {
        if (typeof query.categoryTitle === "string") {
          const categories = await prisma.category.findMany({
            where: {
              name: {
                startsWith: query.categoryTitle,
              },
            },
          });
          return {
            categories,
          };
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
});
