document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('show');
    });
    
    // Smooth scrolling pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Fermer le menu mobile si ouvert
                nav.classList.remove('show');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Compensation pour le header fixe
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Chargement de plus d'images dans la galerie
    const loadMoreBtn = document.getElementById('load-more');
    const galleryContainer = document.querySelector('.gallery-container');
    
    if (loadMoreBtn && galleryContainer) {
        loadMoreBtn.addEventListener('click', function() {
            // Simuler le chargement de nouvelles images
            for (let i = 0; i < 3; i++) {
                const newItem = document.createElement('div');
                newItem.className = 'gallery-item';
                newItem.style.backgroundImage = `url('https://source.unsplash.com/random/300x300/?musical,${Math.floor(Math.random() * 100)}')`;
                galleryContainer.appendChild(newItem);
            }
            
            // Désactiver le bouton après quelques chargements
            if (galleryContainer.children.length >= 12) {
                loadMoreBtn.disabled = true;
                loadMoreBtn.textContent = 'Toutes les photos chargées';
            }
        });
    }
    
    // Formulaire de newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simuler l'envoi du formulaire
            setTimeout(() => {
                alert(`Merci pour votre inscription avec l'email ${email}! Vous serez informé des nouvelles dates.`);
                this.reset();
            }, 500);
        });
    }
    
    // Formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simuler l'envoi du formulaire
            setTimeout(() => {
                alert(`Merci pour votre message, ${name}! Nous vous répondrons à l'adresse ${email} dès que possible.`);
                this.reset();
            }, 500);
        });
    }
    
    // Animation au défilement
    function animateOnScroll() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialiser les styles pour l'animation
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Déclencher l'animation au chargement et au défilement
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Lecteur audio pour des extraits musicaux (fonctionnalité avancée)
    function initAudioPlayer() {
        const audioPlayer = document.createElement('div');
        audioPlayer.className = 'audio-player';
        audioPlayer.innerHTML = `
            <button id="play-btn"><i class="fas fa-play"></i></button>
            <div class="progress-container">
                <div class="progress-bar"></div>
            </div>
            <span class="current-time">0:00</span>
            <span class="duration">0:30</span>
            <audio src="assets/audio/extrait.mp3"></audio>
        `;
        
        document.body.appendChild(audioPlayer);
        
        const playBtn = document.getElementById('play-btn');
        const audio = audioPlayer.querySelector('audio');
        const progressBar = audioPlayer.querySelector('.progress-bar');
        const currentTimeEl = audioPlayer.querySelector('.current-time');
        
        // Simuler un extrait musical (en pratique, vous auriez un vrai fichier audio)
        if (audio) {
            playBtn.addEventListener('click', function() {
                if (audio.paused) {
                    audio.play();
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    audio.pause();
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
            
            audio.addEventListener('timeupdate', function() {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = `${progress}%`;
                
                // Mettre à jour le temps courant
                const minutes = Math.floor(audio.currentTime / 60);
                const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
                currentTimeEl.textContent = `${minutes}:${seconds}`;
            });
            
            // Permettre de cliquer sur la barre de progression
            audioPlayer.querySelector('.progress-container').addEventListener('click', function(e) {
                const percent = e.offsetX / this.offsetWidth;
                audio.currentTime = percent * audio.duration;
            });
            
            // Réinitialiser quand la piste est terminée
            audio.addEventListener('ended', function() {
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                progressBar.style.width = '0%';
                audio.currentTime = 0;
            });
        }
    }
    
    // Démarrer le lecteur audio (à décommenter quand vous aurez des fichiers audio)
    // initAudioPlayer();
});