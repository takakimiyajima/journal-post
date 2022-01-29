const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Dummy user data
const users = () => {
  return Array
    .from(Array(10))
    .map((_, index) => {
      const randomStr = Math.random().toString(36).slice(-12);
      return {
        name: randomStr,
        email: `${randomStr}@example.com`,
        posts: {
          create: [
            {
              title: `${index} Post!`,
              content: 'Hello, World!, Hello!!!!',
            },
          ],
        },
      }
    })
}

async function main() {
  console.log(`Start seeding ...`);
  for (const u of users()) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
