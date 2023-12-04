import prisma from "../src/database/configDB";

async function main() {
    const omar = await prisma.users.upsert({
        where: {email: "omar@gmail.com"},
        update: {},
        create: {
            fullName: "Omar",
            email: "omar@gmail.com",
            password: "12345678",
            role: "SUPER_ADMIN",
            access: true,
        }
    });
    const ahmed = await prisma.users.upsert({
        where: {email: "ahmed@gmail.com"},
        update: {},
        create: {
            fullName: "Ahmed",
            email: "ahmed@gmail.com",
            password: "12345678",
            role: "SUPER_ADMIN",
            access: true,
        }
    });

    const safa = await prisma.users.upsert({
        where: {email: "safa@gmail.com"},
        update: {},
        create: {
            fullName: "Safa",
            email: "safa@gmail.com",
            password: "12345678",
            role: "ADMIN",
            access: true,
        }
    });

    console.log({ahmed, omar,safa})
}

main()
.then(async() => {
    await prisma.$disconnect()
})
.catch(async(e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})