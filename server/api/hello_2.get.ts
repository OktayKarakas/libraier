import prisma from "~/helpers/misc/prisma";

export default defineEventHandler(() => {
  async function main() {
    const users = await prisma.user.findMany();
    console.log(users);
  }

  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  return {};
});
