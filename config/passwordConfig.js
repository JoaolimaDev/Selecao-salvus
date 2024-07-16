const passwordValidationRules = (password) => {
    const rules = [];
    const minLength = 8;

    if (password.length < minLength) {
        rules.push(`Senha deve conter pelo menos ${minLength} caracteres.`);
    }
    if (!/[A-Z]/.test(password)) {
        rules.push('A senha deve conter pelo menos uma letra maiúscula.');
    }
    if (!/[a-z]/.test(password)) {
        rules.push('A senha deve conter pelo menos uma letra minúscula.');
    }
    if (!/[0-9]/.test(password)) {
        rules.push('A senha deve conter pelo menos um número');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        rules.push('A senha deve conter pelo menos um caractere especial!');
    }

    return rules;
};

module.exports = passwordValidationRules;
