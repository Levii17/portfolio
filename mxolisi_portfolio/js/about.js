        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize progress bars with animation
            const progressBars = document.querySelectorAll('.progress');
            setTimeout(() => {
                progressBars.forEach(bar => {
                    const targetWidth = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 300);
                });
            }, 500);
            
            // Bio scroll indicator logic
            const bioCard = document.querySelector('.bio-text');
            const scrollIndicator = document.getElementById('bioScroll');
            
            // Check if bio content needs scroll indicator
            function checkBioScroll() {
                if (bioCard.scrollHeight > bioCard.clientHeight) {
                    scrollIndicator.classList.add('visible');
                } else {
                    scrollIndicator.classList.remove('visible');
                }
            }
            
            // Run on load and resize
            checkBioScroll();
            window.addEventListener('resize', checkBioScroll);
            
            // Smooth scroll on click
            scrollIndicator.addEventListener('click', () => {
                bioCard.scrollTop += 50;
                if (bioCard.scrollTop + bioCard.clientHeight >= bioCard.scrollHeight - 10) {
                    scrollIndicator.classList.remove('visible');
                }
            });
            
            // Tech item hover animations
            const techItems = document.querySelectorAll('.tech-item');
            techItems.forEach(item => {
                item.addEventListener('mouseover', () => {
                    const others = Array.from(techItems).filter(i => i !== item);
                    others.forEach(other => {
                        other.style.opacity = '0.6';
                        other.style.transform = 'scale(0.95)';
                    });
                });
                
                item.addEventListener('mouseout', () => {
                    techItems.forEach(other => {
                        other.style.opacity = '1';
                        other.style.transform = '';
                    });
                });
            });
            
            // Retrigger typing animation on view
            const typingText = document.querySelector('.typing-text');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typingText.style.animation = 'none';
                        setTimeout(() => {
                            typingText.style.animation = 'blink 0.7s infinite, typing 3.5s steps(30) 1 forwards';
                        }, 10);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(typingText);
        });