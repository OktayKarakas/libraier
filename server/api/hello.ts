import prisma from "~/helpers/misc/prisma";

export default defineEventHandler(() => {
  function main() {
    return prisma.user.findMany();
  }

  return main()
    .then((users) => {
      return { users };
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
});
