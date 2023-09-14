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
      } else if (query.postPrompt) {
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
                return await prisma.prompt.create({
                  data: {
                    writerId: user.id,

                    categoryId: "0c086969-d6f8-4859-91c0-f2185a7226c4",
                    categoryName: "test",
                    ...body,
                  },
                });
              }
            }
          }
        }
      } else if (query.tagCreate) {
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
                  const sameTagExist = await prisma.tag.findFirst({
                    where: {
                      AND: [{ title: name }],
                    },
                  });

                  if (sameTagExist) {
                    console.log("same tag exist.");
                    return {
                      status: 400,
                      json: { error: "tag_exist" },
                    };
                  } else {
                    const trimmedName = body.name.trim().toLowerCase();
                    const nameWithoutMultipleSpaces = trimmedName.replace(
                      /\s{2,}/g,
                      " "
                    );
                    const nameArr = nameWithoutMultipleSpaces.split(" ");
                    const name = nameArr.join("_");
                    await prisma.tag.create({
                      data: {
                        title: name,
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
                startsWith: query.categoryTitle.toLowerCase(),
              },
            },
          });
          return {
            categories,
          };
        }
      } else if (query.getPromptByTitle) {
        if (typeof query.promptTitle === "string") {
          const prompts = await prisma.prompt.findMany({
            where: {
              title: {
                startsWith: query.promptTitle,
              },
            },
            take: 5,
          });
          return {
            prompts,
          };
        }
      } else if (query.getPromptByUserId) {
        if (typeof query.writerId === "string" && query?.skip && query?.take) {
          const prompts = await prisma.prompt.findMany({
            where: {
              writerId: query.writerId,
            },
            skip: Number(query.skip),
            take: Number(query.take),
          });
          const totalCount = await prisma.prompt.count({
            where: {
              writerId: query.writerId,
            },
          });
          return {
            prompts,
            totalCount,
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
