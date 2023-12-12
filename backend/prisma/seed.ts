import prisma from "../src/database/configDB";
import bcrypt from "bcryptjs"

async function main() {
    // const password ="12345678"
    const salt = await bcrypt.genSalt(10);
    const bocorhashed = await bcrypt.hash("#abdirah#safa@2023", salt);
    const ahmedhashed = await bcrypt.hash("#ahmed#nur@34@2023", salt);
    
    const bocor = await prisma.users.upsert({
        where: {email: "bocor@gmail.com"},
        update: {},
        create: {
            fullName: "Abdirahman Bocor",
            email: "bocor@safaa.system.com",
            password: bocorhashed,
            role: "ADMIN",
            access: true,
        }
    });
    
    const ahmed = await prisma.users.upsert({
        where: {email: "ahmed@safaa.system.com"},
        update: {},
        create: {
            fullName: "Ahmed",
            email: "ahmed@gmail.com",
            password: ahmedhashed,
            role: "SUPER_ADMIN",
            access: true,
        }
    });

    console.log({ahmed, bocor})
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