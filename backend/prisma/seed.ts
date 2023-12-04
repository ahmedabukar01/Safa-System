import prisma from "../src/database/configDB";
import bcrypt from "bcryptjs"

async function main() {
    // const password ="12345678"
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash("12345678", salt)
    
    const omar = await prisma.users.upsert({
        where: {email: "omar@gmail.com"},
        update: {},
        create: {
            fullName: "Omar",
            email: "omar@gmail.com",
            password: hashed,
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
            password: hashed,
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
            password: hashed,
            role: "ADMIN",
            access: true,
        }
    });

    const ali = await prisma.users.upsert({
        where: {email: "ali@gmail.com"},
        update: {},
        create: {
            fullName: "Ali",
            email: "ali@gmail.com",
            password: hashed,
            role: "USER",
            access: true,
        }
    });

    console.log({ahmed, omar, safa, ali})
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