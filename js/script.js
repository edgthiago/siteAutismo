// Pre-carregador
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.preloader').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.preloader').style.display = 'none';
        }, 500);
    }, 1000);
});

// Menu Mobile
const menuBtn = document.getElementById('menuMobileBtn');
const mainNav = document.getElementById('mainNav');

menuBtn.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    if (menuBtn.querySelector('i').classList.contains('fa-bars')) {
        menuBtn.querySelector('i').classList.remove('fa-bars');
        menuBtn.querySelector('i').classList.add('fa-times');
    } else {
        menuBtn.querySelector('i').classList.remove('fa-times');
        menuBtn.querySelector('i').classList.add('fa-bars');
    }
});

// Botão voltar ao topo
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Animação suave ao clicar nos links do menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Fecha o menu mobile se estiver aberto
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
            }
        }
    });
});

// Efeito de aparecimento ao rolar a página
const fades = document.querySelectorAll('.fade-in');

function checkFades() {
    const triggerBottom = window.innerHeight * 0.8;
    
    fades.forEach(fade => {
        const fadeTop = fade.getBoundingClientRect().top;
        
        if (fadeTop < triggerBottom) {
            fade.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkFades);
window.addEventListener('load', checkFades);

// Estatísticas animadas
const statNumbers = document.querySelectorAll('.stat-item .number');

function animateNumbers() {
    statNumbers.forEach(number => {
        const isInViewport = number.getBoundingClientRect().top < window.innerHeight * 0.8;
        
        if (isInViewport && !number.classList.contains('highlight')) {
            number.classList.add('highlight');
        }
    });
}

window.addEventListener('scroll', animateNumbers);

// FAQ accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        
        faqItem.classList.toggle('active');
        this.classList.toggle('active');
        
        // Fecha outros itens
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
                item.querySelector('.faq-question').classList.remove('active');
            }
        });
    });
});

// Formulário de contato
const form = document.getElementById('formContato');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Normalmente aqui teria uma requisição AJAX para enviar os dados do formulário
    // Mas para demonstração, vamos apenas mostrar uma mensagem de sucesso
    
    form.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>Mensagem enviada!</h3>
            <p>Agradecemos seu contato. Responderemos em breve.</p>
            <button class="btn" onclick="location.reload()">Enviar nova mensagem</button>
        </div>
    `;
});

// Calendário de eventos
document.addEventListener('DOMContentLoaded', function() {
    const calendario = document.getElementById('calendario');
    const currentMonthDisplay = document.getElementById('currentMonth');
    const btnPrevMonth = document.getElementById('prevMonth');
    const btnNextMonth = document.getElementById('nextMonth');
    
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const hoje = new Date();
    let currentMonth = hoje.getMonth();
    let currentYear = hoje.getFullYear();
    
    // Eventos (simulados para demonstração)
    const eventos = [
        { dia: 18, mes: 4, ano: 2025, titulo: 'Simpósio Brasileiro de Autismo', local: 'São Paulo, SP' },
        { dia: 5, mes: 5, ano: 2025, titulo: 'Workshop para Famílias', local: 'Online' },
        { dia: 22, mes: 6, ano: 2025, titulo: 'Formação em ABA', local: 'Rio de Janeiro, RJ' },
        { dia: 2, mes: 3, ano: 2025, titulo: 'Dia Mundial de Conscientização do Autismo', local: 'Nacional' }
    ];
    
    function renderCalendario() {
        // Limpa os dias (exceto cabeçalho)
        const dias = calendario.querySelectorAll('.dia');
        dias.forEach(dia => dia.remove());
        
        // Atualiza o mês/ano exibido
        currentMonthDisplay.textContent = `${meses[currentMonth]} ${currentYear}`;
        
        // Primeiro dia do mês
        const firstDay = new Date(currentYear, currentMonth, 1);
        // Último dia do mês
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        
        // Dias do mês anterior para completar a primeira semana
        const startDayOfWeek = firstDay.getDay(); // 0 (Domingo) a 6 (Sábado)
        
        // Dias do mês anterior
        for (let i = startDayOfWeek; i > 0; i--) {
            const day = new Date(currentYear, currentMonth, 1 - i);
            const diaElement = createDayElement(day.getDate(), true);
            calendario.appendChild(diaElement);
        }
        
        // Dias do mês atual
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const isToday = currentYear === hoje.getFullYear() && currentMonth === hoje.getMonth() && i === hoje.getDate();
            
            // Verifica se tem evento nesse dia
            const temEvento = eventos.some(evento => 
                evento.dia === i && evento.mes === currentMonth && evento.ano === currentYear
            );
            
            const evento = eventos.find(evento => 
                evento.dia === i && evento.mes === currentMonth && evento.ano === currentYear
            );
            
            const diaElement = createDayElement(i, false, isToday, temEvento, evento);
            calendario.appendChild(diaElement);
        }
        
        // Completa os dias do próximo mês para fechar o grid
        const totalDaysDisplayed = calendario.querySelectorAll('.dia').length;
        const remainingCells = 42 - totalDaysDisplayed; // 6 linhas x 7 colunas = 42 células
        
        for (let i = 1; i <= remainingCells; i++) {
            const diaElement = createDayElement(i, true);
            calendario.appendChild(diaElement);
        }
    }
    
    function createDayElement(day, isOtherMonth, isToday = false, temEvento = false, evento = null) {
        const diaElement = document.createElement('div');
        diaElement.className = 'dia';
        
        if (isOtherMonth) {
            diaElement.classList.add('outro-mes');
        }
        
        if (isToday) {
            diaElement.classList.add('hoje');
        }
        
        if (temEvento) {
            diaElement.classList.add('tem-evento');
            
            // Adiciona popup com informação do evento
            const popup = document.createElement('div');
            popup.className = 'dia-popup';
            popup.innerHTML = `
                <h4>${evento.titulo}</h4>
                <p>${evento.local}</p>
            `;
            diaElement.appendChild(popup);
        }
        
        const diaNumero = document.createElement('span');
        diaNumero.className = 'dia-numero';
        diaNumero.textContent = day;
        diaElement.appendChild(diaNumero);
        
        return diaElement;
    }
    
    // Navegação do calendário
    btnPrevMonth.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendario();
    });
    
    btnNextMonth.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendario();
    });
    
    // Renderiza o calendário inicial
    renderCalendario();
});

// Mensagem de cookie
window.addEventListener('load', function() {
    setTimeout(function() {
        const cookieMessage = document.createElement('div');
        cookieMessage.className = 'cookie-message';
        cookieMessage.innerHTML = `
            <p>Este site usa cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa <a href="#">Política de Privacidade</a>.</p>
            <button class="cookie-accept">Aceitar</button>
        `;
        document.body.appendChild(cookieMessage);
        
        setTimeout(function() {
            cookieMessage.classList.add('show');
        }, 500);
        
        document.querySelector('.cookie-accept').addEventListener('click', function() {
            cookieMessage.classList.remove('show');
            setTimeout(function() {
                cookieMessage.remove();
            }, 300);
            
            // Salvaria um cookie aqui
            localStorage.setItem('cookie-aceito', 'true');
        });
        
        // Verifica se o usuário já aceitou os cookies
        if (localStorage.getItem('cookie-aceito') === 'true') {
            cookieMessage.remove();
        }
    }, 2000);
});

// Adiciona classes fade-in aos elementos principais para animação
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section:not(.banner)');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Adiciona classes fade-in a elementos específicos
    const elements = [
        '.cards .card', 
        '.interventions .intervention',
        '.rights-cards .rights-card',
        '.resources .resource',
        '.evento-card',
        '.stat-item',
        '.testimonial-item'
    ];
    
    elements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
        });
    });
});

// Função para garantir que o conteúdo seja exibido
window.addEventListener('DOMContentLoaded', function() {
    // Força a exibição de todos os elementos
    document.querySelectorAll('.fade-in').forEach(function(el) {
        el.classList.add('visible');
    });
    
    // Remove a animação de pré-carregador imediatamente
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
    
    // Verifica se há algum problema com as imagens
    document.querySelectorAll('img').forEach(function(img) {
        img.onerror = function() {
            // Substitui a imagem por um placeholder quando não conseguir carregar
            this.src = 'https://via.placeholder.com/400x300?text=Imagem+Indisponível';
            console.log('Imagem não carregada: ' + this.getAttribute('src'));
        };
    });
});

// Modo escuro
const darkModeToggle = document.getElementById('darkModeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Verifica se o usuário já escolheu um tema anteriormente
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').classList.remove('fa-moon');
    darkModeToggle.querySelector('i').classList.add('fa-sun');
}

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        darkModeToggle.querySelector('i').classList.remove('fa-moon');
        darkModeToggle.querySelector('i').classList.add('fa-sun');
    } else {
        localStorage.setItem('theme', 'light');
        darkModeToggle.querySelector('i').classList.remove('fa-sun');
        darkModeToggle.querySelector('i').classList.add('fa-moon');
    }
});

// Controles de acessibilidade
const fontSizeDefault = document.getElementById('fontSizeDefault');
const fontSizeLarge = document.getElementById('fontSizeLarge');
const fontSizeXLarge = document.getElementById('fontSizeXLarge');
const lineHeightToggle = document.getElementById('lineHeightToggle');
const readingFocusToggle = document.getElementById('readingFocusToggle');

// Aplica configurações salvas
if (localStorage.getItem('fontSize')) {
    document.body.classList.add(localStorage.getItem('fontSize'));
}

if (localStorage.getItem('lineHeight') === 'large') {
    document.body.classList.add('line-height-large');
    lineHeightToggle.classList.add('active');
}

if (localStorage.getItem('readingFocus') === 'on') {
    document.body.classList.add('reading-focus-mode');
    readingFocusToggle.classList.add('active');
}

// Tamanho da fonte
fontSizeDefault.addEventListener('click', function() {
    document.body.classList.remove('font-size-large', 'font-size-xlarge', 'font-size-xxlarge');
    localStorage.setItem('fontSize', '');
    
    resetActiveButtons();
    this.classList.add('active');
});

fontSizeLarge.addEventListener('click', function() {
    document.body.classList.remove('font-size-xlarge', 'font-size-xxlarge');
    document.body.classList.add('font-size-large');
    localStorage.setItem('fontSize', 'font-size-large');
    
    resetActiveButtons();
    this.classList.add('active');
});

fontSizeXLarge.addEventListener('click', function() {
    document.body.classList.remove('font-size-large', 'font-size-xxlarge');
    document.body.classList.add('font-size-xlarge');
    localStorage.setItem('fontSize', 'font-size-xlarge');
    
    resetActiveButtons();
    this.classList.add('active');
});

// Espaçamento entre linhas
lineHeightToggle.addEventListener('click', function() {
    document.body.classList.toggle('line-height-large');
    this.classList.toggle('active');
    
    if (document.body.classList.contains('line-height-large')) {
        localStorage.setItem('lineHeight', 'large');
    } else {
        localStorage.setItem('lineHeight', 'default');
    }
});

// Modo foco de leitura
readingFocusToggle.addEventListener('click', function() {
    document.body.classList.toggle('reading-focus-mode');
    this.classList.toggle('active');
    
    if (document.body.classList.contains('reading-focus-mode')) {
        localStorage.setItem('readingFocus', 'on');
    } else {
        localStorage.setItem('readingFocus', 'off');
    }
});

function resetActiveButtons() {
    fontSizeDefault.classList.remove('active');
    fontSizeLarge.classList.remove('active');
    fontSizeXLarge.classList.remove('active');
}

// Funcionalidades para o novo header e acessibilidade
document.addEventListener('DOMContentLoaded', function() {
    // Painel de acessibilidade
    const accessibilityPanel = document.getElementById('accessibilityPanel');
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const closeAccessibilityPanel = document.getElementById('closeAccessibilityPanel');
    
    // Botão para abrir painel de acessibilidade
    accessibilityToggle.addEventListener('click', function() {
        accessibilityPanel.classList.add('active');
    });
    
    // Botão para fechar painel de acessibilidade
    closeAccessibilityPanel.addEventListener('click', function() {
        accessibilityPanel.classList.remove('active');
    });
    
    // Fechar o painel ao clicar fora dele
    document.addEventListener('click', function(event) {
        if (!accessibilityPanel.contains(event.target) && event.target !== accessibilityToggle) {
            accessibilityPanel.classList.remove('active');
        }
    });
    
    // Opção de fonte para dislexia
    const dyslexicFontToggle = document.getElementById('dyslexicFontToggle');
    
    if (dyslexicFontToggle) {
        if (localStorage.getItem('dyslexicFont') === 'on') {
            document.body.classList.add('dyslexic-font');
            dyslexicFontToggle.classList.add('active');
        }
        
        dyslexicFontToggle.addEventListener('click', function() {
            document.body.classList.toggle('dyslexic-font');
            this.classList.toggle('active');
            
            if (document.body.classList.contains('dyslexic-font')) {
                localStorage.setItem('dyslexicFont', 'on');
            } else {
                localStorage.setItem('dyslexicFont', 'off');
            }
        });
    }
    
    // Opções de contraste
    const contrastDefault = document.getElementById('contrastDefault');
    const contrastHigh = document.getElementById('contrastHigh');
    
    if (contrastDefault && contrastHigh) {
        if (localStorage.getItem('contrast') === 'high') {
            document.body.classList.add('high-contrast');
            contrastHigh.classList.add('active');
        } else {
            contrastDefault.classList.add('active');
        }
        
        contrastDefault.addEventListener('click', function() {
            document.body.classList.remove('high-contrast');
            localStorage.setItem('contrast', 'default');
            
            contrastHigh.classList.remove('active');
            this.classList.add('active');
        });
        
        contrastHigh.addEventListener('click', function() {
            document.body.classList.add('high-contrast');
            localStorage.setItem('contrast', 'high');
            
            contrastDefault.classList.remove('active');
            this.classList.add('active');
        });
    }
    
    // Indicador de progresso da página
    const progressBar = document.getElementById('pageScrollProgress');
    
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            progressBar.style.width = scrolled + '%';
        });
    }
    
    // Dropdown menu para mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (window.innerWidth <= 768) {
        dropdowns.forEach(dropdown => {
            const dropdownLink = dropdown.querySelector('.nav-link');
            
            dropdownLink.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        });
    }
    
    // Adicionar classe active aos botões de acessibilidade com base nas configurações salvas
    if (localStorage.getItem('fontSize') === 'font-size-large') {
        document.getElementById('fontSizeLarge').classList.add('active');
    } else if (localStorage.getItem('fontSize') === 'font-size-xlarge') {
        document.getElementById('fontSizeXLarge').classList.add('active');
    } else {
        document.getElementById('fontSizeDefault').classList.add('active');
    }
});

// Adicionar CSS dinâmico para fontes específicas para dislexia
if (!document.getElementById('dyslexic-font-style')) {
    const dyslexicStyle = document.createElement('style');
    dyslexicStyle.id = 'dyslexic-font-style';
    dyslexicStyle.textContent = `
        /* Fonte mais amigável para dislexia */
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap');
        
        body.dyslexic-font * {
            font-family: 'Lexend', sans-serif !important;
            letter-spacing: 0.5px !important;
            word-spacing: 3px !important;
            line-height: 1.8 !important;
        }
        
        /* Alto contraste */
        body.high-contrast {
            color: white !important;
            background-color: black !important;
        }
        
        body.high-contrast .blue-bg,
        body.high-contrast .green-bg,
        body.high-contrast .purple-bg {
            background-color: #111 !important;
        }
        
        body.high-contrast a,
        body.high-contrast h1,
        body.high-contrast h2,
        body.high-contrast h3,
        body.high-contrast h4,
        body.high-contrast h5,
        body.high-contrast h6 {
            color: yellow !important;
        }
        
        body.high-contrast .btn,
        body.high-contrast .btn-pequeno,
        body.high-contrast .nav-item.highlight .nav-link {
            background-color: yellow !important;
            color: black !important;
        }
        
        body.high-contrast .card,
        body.high-contrast .intervention,
        body.high-contrast .rights-card,
        body.high-contrast .resource,
        body.high-contrast .testimonial-item,
        body.high-contrast .faq-item,
        body.high-contrast .stat-item,
        body.high-contrast .contact-form,
        body.high-contrast .evento-card,
        body.high-contrast .accessibility-panel,
        body.high-contrast .dropdown-menu {
            background-color: #222 !important;
            border: 1px solid yellow !important;
        }
    `;
    document.head.appendChild(dyslexicStyle);
}