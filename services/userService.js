const { User } = require('../models');

const createUser = async (fName, lName, email, password) => {

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Email já cadastrado!');
    }

    const newUser = await User.create({
        firstName: fName,
        lastName: lName,
        email,
        password
    });

    return newUser;
}

const updateUser = async (updates) => {
    const email = updates.email;
    const existingUser = await User.findByPk({ where: { email } });
    if (!existingUser) {
        throw new Error('Usuário não encontrado!');
    }

    return User.update(updates)
    .then(updatedUser => updatedUser)
    .catch(error => { throw new Error(error.message) });
};



module.exports = {
    createUser,
    updateUser
}