export const ramdomUtil = ({ length, number, uppercase, lowercase }) => {
    let result = '';
    let characters = '';
    const numberChar = '0123456789';
    const uppercaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChar = 'abcdefghijklmnopqrstuvwxyz';

    if (typeof number === 'undefined' || number === true) characters += numberChar;
    if (typeof uppercase === 'undefined' || uppercase === true) characters += uppercaseChar;
    if (typeof lowercase === 'undefined' || lowercase === true) characters += lowercaseChar;

    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;

}
export const genClientId = () => {
    return ramdomUtil({ length: 10, lowercase: false, number: false });
}

export const genClientSecret = () => {
    return ramdomUtil({ length: 20, number: false });
}

