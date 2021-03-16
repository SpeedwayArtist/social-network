export const required = (value) => {
    if (value) return undefined;
    return 'Field is required';
}

export const maxLengthCreator = (maxLength) => {
    return (value) => {
        if (value && value.length > maxLength) return 'Max lenght is ' + maxLength + ' symbols';
        return undefined;
    }
}