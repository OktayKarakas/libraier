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
                    ...body,
                    approved: false,
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
      } else if (query.getPrompt) {
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
                return await prisma.ownedPrompt.create({
                  data: {
                    userId: user.id,
                    ...body,
                  },
                });
              } else {
                return {
                  error: true,
                };
              }
            } else {
              return {
                error: true,
              };
            }
          } else {
            return {
              error: true,
            };
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
      } else if (query.getCategories) {
        let updatedVal = {};
        const orderBy: any = { updatedAt: null, favNumCount: null };

        // Define the date filter based on the selected time range
        const currentDate = new Date();
        switch (query.timeRange) {
          case "all time":
            // No additional filter needed for "all time"
            break;
          case "past month":
            currentDate.setMonth(currentDate.getMonth() - 1);
            updatedVal = {
              updatedAt: {
                gte: currentDate,
              },
            };
            break;
          case "past week":
            currentDate.setDate(currentDate.getDate() - 7);
            updatedVal = {
              updatedAt: {
                gte: currentDate,
              },
            };
            break;
          case "past day":
            currentDate.setDate(currentDate.getDate() - 1);
            updatedVal = {
              updatedAt: {
                gte: currentDate,
              },
            };
            break;
          default:
            // Handle invalid time range selection
            throw new Error("Invalid time range selection");
        }
        switch (query.queryType) {
          case "top":
            orderBy.favNumCount = "desc";
            orderBy.updatedAt = null;
            break;
          case "newest":
            orderBy.updatedAt = "desc";
            orderBy.favNumCount = null;
            break;
          case "popular":
            orderBy.favNumCount = "desc";
            orderBy.updatedAt = null;
            break;
          default:
            // Handle invalid query type
            throw new Error("Invalid query type");
        }

        if (orderBy.updatedAt && !orderBy.favNumCount) {
          const categories = await prisma.category.findMany({
            where: updatedVal,
            orderBy: [
              {
                updatedAt: "desc",
              },
            ],
          });
          return {
            categories,
          };
        } else if (orderBy.favNumCount && orderBy.updatedAt) {
          const categories = await prisma.category.findMany({
            where: updatedVal,
            orderBy: [
              {
                updatedAt: "desc",
              },
              {
                favNum: "desc",
              },
            ],
          });
          return {
            categories,
          };
        } else if (orderBy.favNumCount && !orderBy.updatedAt) {
          const categories = await prisma.category.findMany({
            where: updatedVal,
            orderBy: [
              {
                favNum: "desc",
              },
            ],
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
      } else if (query.getPromptById) {
        if (typeof query.promptId === "string") {
          const prompts = await prisma.prompt.findUnique({
            where: {
              id: query.promptId,
            },
          });
          return {
            prompts,
          };
        }
      } else if (query.getPromptTagById) {
        const tagNames: Object[] = [];

        if (Array.isArray(query.tagId)) {
          const tagPromises = query.tagId.map(async (id) => {
            const tag = await prisma.tag.findUnique({
              where: {
                id: id,
              },
            });
            if (tag) {
              tagNames.push(tag);
            }
          });

          // Wait for all promises to resolve
          await Promise.all(tagPromises);
        } else {
          if (query.tagId && typeof query.tagId === "string") {
            const tag = await prisma.tag.findUnique({
              where: {
                id: query.tagId,
              },
            });
            if (tag) {
              return [tag];
            }
          }
        }

        return tagNames;
      } else if (query.getPromptByOwnedUserId) {
        if (query.userId && typeof query.userId === "string") {
          const prompt = await prisma.ownedPrompt.findMany({
            where: {
              userId: query.userId,
            },
            skip: Number(query.skip),
            take: Number(query.take),
          });
          const totalCount = await prisma.ownedPrompt.count({
            where: {
              userId: query.userId,
            },
          });
          if (prompt) {
            return { prompt, totalCount };
          }
        }
      } else if (query.getPromptByTitleAndUserId) {
        if (typeof query.promptTitle === "string") {
          if (query.userId && typeof query.userId === "string") {
            const prompts = await prisma.prompt.findMany({
              where: {
                AND: [
                  {
                    title: {
                      startsWith: query.promptTitle,
                    },
                  },
                  {
                    writerId: {
                      equals: query.userId,
                    },
                  },
                ],
              },

              take: 5,
            });
            return prompts;
          }
        }
      } else if (query.getOwnedPromptByTitleAndUserId) {
        if (typeof query.promptTitle === "string") {
          if (query.userId && typeof query.userId === "string") {
            const prompts = await prisma.ownedPrompt.findMany({
              where: {
                AND: [
                  {
                    promptTitle: {
                      startsWith: query.promptTitle,
                    },
                  },
                  {
                    userId: {
                      equals: query.userId,
                    },
                  },
                ],
              },

              take: 5,
            });
            return prompts;
          }
        }
      } else if (query.checkUserHasPrompt) {
        if (typeof query.promptId === "string") {
          if (typeof query.userEmail === "string") {
            const user = await prisma.user.findUnique({
              where: {
                email: query.userEmail,
              },
            });
            if (user) {
              if (token && token.sub) {
                const compareAsync = promisify(bcrypt.compare);
                const result = await compareAsync(token.sub, user.password);
                if (result) {
                  const prompt = await prisma.ownedPrompt.findFirst({
                    where: {
                      AND: [
                        {
                          promptId: {
                            equals: query.promptId,
                          },
                        },
                        {
                          userId: {
                            equals: user.id,
                          },
                        },
                      ],
                    },
                  });
                  if (prompt) {
                    return prompt;
                  } else {
                    return {
                      success: false,
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
  }
});
