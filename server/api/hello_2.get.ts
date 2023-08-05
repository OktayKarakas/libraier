import prisma from "~/helpers/misc/prisma";

export default defineEventHandler(() => {
  function main() {
    return prisma.user.findMany();
  }

  return main()
    .then((users) => {
      // Process the 'users' data if needed
      console.log(users);
      return { users }; // This return will be the final response from the API
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
});
