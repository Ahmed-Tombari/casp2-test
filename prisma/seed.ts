import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  const email = "tombariahmed9@gmail.com";
  const password = "Caspeduahmed2026$";
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      firstName: "Ahmed",
      lastName: "Tombari",
      email,
      phone: null,
      country: null,
      passwordHash: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log({ admin });
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
