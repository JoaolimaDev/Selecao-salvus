const { User, Scope, Ability, UserAbility } = require('../models');

const createUser = async (fName, lName, email, password, scopeName, abilities) => {

    const scope = await Scope.findOne({ where: { name: scopeName } });
    if (!scope) {
        throw new Error('Escopo inválido!');
    }

    const abilitiesList = await Ability.findAll({
        where: {
          name: abilities,
        },
    });

    const validAbilitiesNames = abilitiesList.map(ability => ability.name);
    const invalidAbilities = abilities.filter(ability => !validAbilitiesNames.includes(ability));

    if (invalidAbilities.length > 0) {
        throw new Error('Habilidade inválida:' + invalidAbilities);
    }

 
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Email já cadastrado!');
    }

    const newUser = await User.create({
        firstname: fName,
        lastname: lName,
        email,
        password,
        scope_id: scope.id,
    });

    const userAbilities = abilitiesList.map(ability => ({
        user_id: newUser.id,
        ability_id: ability.id
    }));

    await UserAbility.bulkCreate(userAbilities);

    return newUser;

}

const updateUser = async (updates) => {
    const email = updates.email;
    const existingUser = await user.findByPk({ where: { email } });
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