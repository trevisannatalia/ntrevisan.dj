document.addEventListener('DOMContentLoaded', () => {
    // Menu responsivo (opcional, se quiser adicionar um botão para mobile)
    const nav = document.querySelector('nav ul');
    const logo = document.querySelector('.logo');
    if(logo && nav) {
        logo.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Formulário de contato (simulação)
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            formMessage.textContent = 'Mensagem enviada com sucesso! Obrigado pelo contato.';
            form.reset();
            setTimeout(() => {
                formMessage.textContent = '';
            }, 4000);
        });
    }
});
