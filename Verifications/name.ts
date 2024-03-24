export function isValidName(name: string): boolean {
    const alphabeticRegex = /^[a-zA-Z]+$/;
    return alphabeticRegex.test(name);
  }
  