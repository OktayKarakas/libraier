import prisma from "~/helpers/misc/prisma";

export default defineEventHandler(async (event) => {
  // USER DATA
  if (event.node.req.method === "GET") {
    const query = getQuery(event);
    async function main() {
      if (typeof query.id === "string") {
        const user = await prisma.user.findUnique({
          where: {
            id: query.id,
          },
        });
        if (user) {
          return user;
        } else {
          return null;
        }
      } else {
        console.log("Type Error.");
        return null;
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
