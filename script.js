// ── Traduções (i18n) ────────────────────────────────────────
const translations = {
    pt: {
        nav: {
            home: 'Início',
            about: 'Sobre',
            music: 'Música',
            youtube: 'YouTube',
            gallery: 'Instagram',
            contact: 'Contato',
        },
        hero: {
            cta: 'Ouça Agora',
        },
        about: {
            heading: 'Sobre',
            text: 'Música, culinária, fotografia e artes que expressam sentimentos, gostos e sensações—essas são minhas paixões. Profissionalmente, atuo com TI, mas todo o resto é meu hobby e minha válvula de escape criativa. A música é uma forma especial de conexão com os sentimentos, e adoro selecionar e mixar faixas que contem uma história.',
        },
        music: {
            heading: 'Música',
        },
        youtube: {
            heading: 'YouTube',
            text: 'Confira meus sets e mixes exclusivos no canal do YouTube. Cada vídeo é uma nova experiência musical para sentir e curtir.',
            cta: 'Acesse o Canal',
        },
        gallery: {
            heading: 'Instagram',
            text: 'Acompanhe meu dia a dia, bastidores, fotos e inspirações no Instagram. Música, arte e lifestyle em cada post.',
            follow: 'Seguir no Instagram',
        },
        contact: {
            heading: 'Contato',
            text: 'Quer falar comigo, contratar para eventos ou compartilhar ideias? Envie sua mensagem pelo formulário abaixo e vamos nos conectar.',
            namePlaceholder: 'Seu nome',
            emailPlaceholder: 'Seu e-mail',
            messagePlaceholder: 'Sua mensagem',
            send: 'Enviar',
            success: 'Mensagem enviada com sucesso! Obrigado pelo contato.',
        },
        footer: {
            text: `© ${new Date().getFullYear()} ntrevisan. Todos os direitos reservados.`,
        },
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            music: 'Music',
            youtube: 'YouTube',
            gallery: 'Instagram',
            contact: 'Contact',
        },
        hero: {
            cta: 'Listen Now',
        },
        about: {
            heading: 'About',
            text: 'Music, food, photography, and arts that express emotions, tastes, and sensations—these are my passions. By profession, I work in IT, but everything else is my hobby and creative escape. Music is a special way to connect with feelings, and I love curating and mixing tracks that tell a story.',
        },
        music: {
            heading: 'Music',
        },
        youtube: {
            heading: 'YouTube',
            text: 'Check out my exclusive sets and mixes on my YouTube channel. Each video is a new musical experience to enjoy and feel.',
            cta: 'Visit the Channel',
        },
        gallery: {
            heading: 'Instagram',
            text: 'Follow my daily life, behind the scenes, photos, and inspirations on Instagram. Music, art, and lifestyle in every post.',
            follow: 'Follow on Instagram',
        },
        contact: {
            heading: 'Contact',
            text: "Want to get in touch, book me for events, or share ideas? Send your message using the form below and let's connect.",
            namePlaceholder: 'Your name',
            emailPlaceholder: 'Your email',
            messagePlaceholder: 'Your message',
            send: 'Send',
            success: 'Message sent successfully! Thanks for reaching out.',
        },
        footer: {
            text: `© ${new Date().getFullYear()} ntrevisan. All rights reserved.`,
        },
    },
};

const SUPPORTED_LANGS = ['pt', 'en'];
let currentLang = 'en';

function getTranslation(lang, key) {
    return key.split('.').reduce((obj, part) => (obj ? obj[part] : undefined), translations[lang]);
}

// Deteta o idioma preferido do browser do utilizador (pt-BR ou en-UK/en-*)
function detectLang() {
    const saved = localStorage.getItem('lang');
    if (SUPPORTED_LANGS.includes(saved)) return saved;

    const browserLangs = navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language || navigator.userLanguage || 'en'];

    for (const lang of browserLangs) {
        if (lang && lang.toLowerCase().startsWith('pt')) return 'pt';
    }
    return 'en';
}

function applyLang(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = 'en';
    currentLang = lang;
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en-GB';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const value = getTranslation(lang, el.getAttribute('data-i18n'));
        if (value !== undefined) el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const value = getTranslation(lang, el.getAttribute('data-i18n-placeholder'));
        if (value !== undefined) el.setAttribute('placeholder', value);
    });

    document.querySelectorAll('.lang-btn').forEach((btn) => {
        const active = btn.dataset.lang === lang;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', String(active));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Idioma: deteta o browser, aplica, e liga o seletor manual
    applyLang(detectLang());

    document.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            localStorage.setItem('lang', lang);
            applyLang(lang);
        });
    });

    // Menu responsivo
    const nav = document.querySelector('nav ul');
    const logo = document.querySelector('.logo');
    if (logo && nav) {
        logo.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Formulário de contato (simulação)
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            formMessage.textContent = getTranslation(currentLang, 'contact.success');
            form.reset();
            setTimeout(() => {
                formMessage.textContent = '';
            }, 4000);
        });
    }
});
