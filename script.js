document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.getElementById('name');
    const backgroundAnimation = document.getElementById('background-animation');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Tema kontrolü
    let currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    // Tüm bölümleri seç
    const sections = document.querySelectorAll('.section');
    const skillItems = document.querySelectorAll('.skill-item');
    const projectCards = document.querySelectorAll('.project-card');
    const hobbies = document.querySelectorAll('.hobby-item');
    const languages = document.querySelectorAll('.language-item');
    const navLinks = document.querySelectorAll('.nav-links a');

    // İsim animasyonu tamamlandıktan sonra ışıltı efekti ekle
    setTimeout(() => {
        nameElement.classList.add('glow');
    }, 2000);

    // Parçacık efekti oluştur
    createParticles();

    // Animasyon gecikmelerini ayarla
    skillItems.forEach((item, index) => {
        item.style.setProperty('--i', index + 1);
        item.style.animationDelay = `${0.1 * (index + 1)}s`;
    });

    projectCards.forEach((card, index) => {
        card.style.setProperty('--i', index + 1);
        card.style.animationDelay = `${0.2 * (index + 1)}s`;
    });

    hobbies.forEach((hobby, index) => {
        hobby.style.setProperty('--i', index + 1);
        hobby.style.animationDelay = `${0.1 * (index + 1)}s`;
    });

    languages.forEach((lang, index) => {
        lang.style.setProperty('--i', index + 1);
        lang.style.animationDelay = `${0.2 * (index + 1)}s`;
    });

    // İsim üzerine gelindiğinde efekt
    nameElement.addEventListener('mouseover', () => {
        nameElement.style.transform = 'scale(1.1)';
        nameElement.style.transition = 'transform 0.3s ease';
    });

    nameElement.addEventListener('mouseout', () => {
        nameElement.style.transform = 'scale(1)';
    });

    // İsim tıklama efekti
    nameElement.addEventListener('click', () => {
        nameElement.classList.remove('animate__fadeIn');
        void nameElement.offsetWidth; // Reflow
        nameElement.classList.add('animate__animated', 'animate__rubberBand');

        // Animasyon tamamlandıktan sonra sınıfları kaldır
        setTimeout(() => {
            nameElement.classList.remove('animate__animated', 'animate__rubberBand');
        }, 1000);
    });

    // Scroll animasyonu
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 300;

            if (scrollPos >= sectionTop) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });

    // Bölümlere başlangıç animasyonu ekle
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        section.style.transitionDelay = `${0.1 * (index + 1)}s`;
    });

    // Sayfa yüklendiğinde ilk bölümleri göster
    setTimeout(() => {
        const visibleSections = Array.from(sections).slice(0, 3);
        visibleSections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }, 500);

    // Touchbar için smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Arka plan animasyonu için fare etkileşimi
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        // Fare konumuna göre arka plan animasyonunu hafifçe hareket ettir
        const moveX = (x - 0.5) * 5;
        const moveY = (y - 0.5) * 5;

        backgroundAnimation.style.transform = `translate(${moveX}vw, ${moveY}vh)`;
    });

    // Tema değiştirici
    themeToggle.addEventListener('click', () => {
        if (currentTheme === 'dark') {
            document.body.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            currentTheme = 'light';
            localStorage.setItem('theme', 'light');
        } else {
            document.body.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            currentTheme = 'dark';
            localStorage.setItem('theme', 'dark');
        }
    });
});

// Rastgele parçacıklar oluştur
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const colors = ['#00b4d8', '#0077b6', '#4361ee', '#4cc9f0', '#3a0ca3'];

    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Rastgele boyut
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Rastgele konum
        const posX = Math.random() * window.innerWidth;
        const posY = window.innerHeight;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;

        // Rastgele renk
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;

        // Rastgele opaklık
        const opacity = Math.random() * 0.6 + 0.2;
        particle.style.opacity = opacity;

        // Rastgele animasyon süresi
        const duration = Math.random() * 4 + 3;
        particle.style.animationDuration = `${duration}s`;

        // Rastgele hareket mesafesi
        const distance = Math.random() * 200 + 100;
        particle.style.setProperty('--distance', `-${distance}px`);

        // Rastgele dönüş
        const rotation = Math.random() * 360;
        particle.style.setProperty('--rotation', `${rotation}deg`);

        particlesContainer.appendChild(particle);

        // Animasyon tamamlandıktan sonra parçacığı kaldır
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }, 200);

    // Sayfa yüklendiğinde başlangıç parçacıkları oluştur
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 15 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;

            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.backgroundColor = color;

            const opacity = Math.random() * 0.6 + 0.2;
            particle.style.opacity = opacity;

            const duration = Math.random() * 4 + 3;
            particle.style.animationDuration = `${duration}s`;

            const distance = Math.random() * 200 + 100;
            particle.style.setProperty('--distance', `-${distance}px`);

            const rotation = Math.random() * 360;
            particle.style.setProperty('--rotation', `${rotation}deg`);

            particlesContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }, i * 100);
    }
}
