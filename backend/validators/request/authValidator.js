const validateRegister = (req) => {

    const { name, email, password } = req.body;

    if (!name?.trim()) {

        return { error: "Name is required." };

    }

    if (!email?.trim()) {

        return { error: "Email is required." };

    }

    if (!password?.trim()) {

        return { error: "Password is required." };

    }

    return {

        value: {

            name: name.trim(),

            email: email.trim(),

            password,

        },

    };

};

const validateLogin = (req) => {

    const { email, password } = req.body;

    if (!email?.trim()) {

        return { error: "Email is required." };

    }

    if (!password?.trim()) {

        return { error: "Password is required." };

    }

    return {

        value: {

            email: email.trim(),

            password,

        },

    };

};

module.exports = {

    validateRegister,

    validateLogin,

};