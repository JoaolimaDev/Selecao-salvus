const { User, Scope, Ability, UserAbility } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const createUser = async (fName, lName, email, password, scopeName, abilities) => {

    const scope = await Scope.findOne({ where: { name: scopeName } });
    if (!scope) {
        throw new Error('Escopo inválido!');
    }

    if (scope.name == "admin") {
        throw new Error('Usuário não contem as permissões necessárias, para criação de admins!');
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

const updateUser = async (userID, updates, tokenUserId) => {


    const {firstname, lastname, email, password, scopeName, abilities} = updates;
    const passwordhashed = await bcrypt.hash(password, 10);

    const scope = await Scope.findOne({ where: { name: scopeName } });
    if (!scope) {
        throw new Error('Escopo inválido!');
    }

    const userScopes = await User.findOne({
        where: { id: tokenUserId },
        include: [{
          model: Scope,
          as: 'scope',
          attributes: ['name'],
        }]
    });

    const abilitiesList = await Ability.findAll({
        where: {
          name: abilities,
        },
    });

    const userFound =  await User.findOne({where: { id: userID }});
    if (!userFound) {
        throw new Error('Usuário inválido!');
    }

    const validAbilitiesNames = abilitiesList.map(ability => ability.name);
    const invalidAbilities = abilities.filter(ability => !validAbilitiesNames.includes(ability));

    if (invalidAbilities.length > 0) {
        throw new Error('Habilidade inválida:' + invalidAbilities);
    }    

    const existingUser = await User.findOne({
        where: {
          email,
          id: {
            [Op.ne]: userFound.id
          }
        }
    });

    if (existingUser) {
        throw new Error('Email já cadastrado!');
    }

    if (userFound.id !== tokenUserId && userScopes.scope.name !== "admin" && scopeName == "admin") {
        throw new Error('Usuário não contem as permissões necessárias, para criação de admins!');
    }
    
    return User.update({
        firstname: firstname,
        lastname: lastname,
        email,
        password : passwordhashed,
        scope_id: scope.id},
    {where: { id : userFound.id }}).then(() => {
        return email;
    }).catch((err) => {
        return err;
    });
   
};



module.exports = {
    createUser,
    updateUser
}