
export  function passwordsMatch(password:string,confirmPassword:string)
{
    return password===confirmPassword;
}
export function isStrongPassword(password:string)
{
    return password.length>8;
}