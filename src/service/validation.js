const registerValidator = {
    email: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
    firstName: (value) => value.trim() != "" && value.length >= 3,
    lastName: (value) => value.trim() != "" && value.length >= 3,
    phone: (value) => value.trim() != "" && value.length >= 10,
    password: (value) => value.trim() != "" && value.length >= 8,
    repeatPassword: (value, currentValues) => value.trim() != "" &&
                            value === currentValues.password &&
                            registerValidator.password(currentValues.password)
};

const loginValidator = {
    email: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
    password: (value) => value.trim() != "",
};

const commentsValidator = {
    comment: (value) => value.trim() != "" && value.length <= 100 && value.length >= 4,
};

const editProfileValidator = {
    firstName: (value) => value.trim() != "" && value.length >= 3,
    lastName: (value) => value.trim() != "" && value.length >= 3,
    phone: (value) => value.trim() != "" && value.length >= 10,
};

export {
    registerValidator,
    loginValidator,
    commentsValidator,
    editProfileValidator
};



