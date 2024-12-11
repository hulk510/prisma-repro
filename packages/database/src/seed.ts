import { saltAndHashPassword } from '@repo/utils/password'
import { prisma } from './client'

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      emailVerified: new Date(),
      hashedPassword: await saltAndHashPassword('password'),
    },
  })

  console.log('Created user:', user)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    console.log('Disconnecting...')
    await prisma.$disconnect()
  })
