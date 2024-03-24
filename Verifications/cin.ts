

export default function verifCin(cin:string):boolean
{   const cinRegex = /^\d{8}$/;
    return cinRegex.test(cin);
}