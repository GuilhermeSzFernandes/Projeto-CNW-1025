// Validação de confirmação de senha no formulário de cadastro

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');
    if (!form) return;

    const senhaEl = document.getElementById('senha');
    const confirmSenhaEl = document.getElementById('confirmSenha');
    const confirmMessage = document.getElementById('confirmMessage');

    function validatePasswords() {
        if (!senhaEl || !confirmSenhaEl) return true; // nada a validar

        const senha = senhaEl.value;
        const confSenha = confirmSenhaEl.value;

        if (senha === confSenha) {
            if (confirmMessage) confirmMessage.style.display = 'none';
            confirmSenhaEl.style.borderColor = '';
            return true;
        } 
        else {
            if (confirmMessage) confirmMessage.style.display = 'block';
            confirmSenhaEl.style.borderColor = 'crimson';
            return false;
        }
    }

    // Validar ao digitar
    if (senhaEl) senhaEl.addEventListener('input', validatePasswords);
    if (confirmSenhaEl) confirmSenhaEl.addEventListener('input', validatePasswords);

    
    // Interceptar submit do form
    form.addEventListener('submit', (e) => {
        if (!validatePasswords()) {
            e.preventDefault();
            // foco no campo de confirmação
            if (confirmSenhaEl) confirmSenhaEl.focus();
        }
    });
});
