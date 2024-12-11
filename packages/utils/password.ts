import bcrypt from 'bcryptjs'

export async function saltAndHashPassword(
  password: string,
  salt: string | number = 10,
): Promise<string> {
  return bcrypt.hash(password, salt)
}

export async function comparePasswords(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}
