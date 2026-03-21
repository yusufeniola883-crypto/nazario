/* ============================================
   LUXURY PROPERTY PRESENTATION
   Complete Interactive JavaScript
============================================ */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initNavigation();
    initHeroSlider();
    initCurrencyConverter();
    initLiveViewers();
    initDubaiTime();
    initFeatureTabs();
    initScrollAnimations();
    initCalculators();
    initContactForm();
    initBackToTop();
    initSmoothScroll();
    initMobileMenu();
});

/* ============================================
   PRELOADER
============================================ */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 1500);
    });
    
    // Fallback - hide after 3 seconds max
    setTimeout(function() {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 3000);
}

/* ============================================
   NAVIGATION
============================================ */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/* ============================================
   HERO SLIDER
============================================ */
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
let slideInterval;

function initHeroSlider() {
    if (slides.length === 0) return;
    
    // Start auto-slide
    startSlideshow();
    
    // Pause on hover
    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', stopSlideshow);
    hero.addEventListener('mouseleave', startSlideshow);
}

function startSlideshow() {
    slideInterval = setInterval(function() {
        changeSlide(1);
    }, 6000);
}

function stopSlideshow() {
    clearInterval(slideInterval);
}

function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide += direction;
    
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Reset interval
    stopSlideshow();
    startSlideshow();
}

/* ============================================
   CURRENCY CONVERTER
============================================ */
const currencyRates = {
    AED: 1,
    USD: 0.2722,
    GBP: 0.2155,
    EUR: 0.2517
};

const currencySymbols = {
    AED: 'AED',
    USD: '$',
    GBP: '£',
    EUR: '€'
};

let basePrice = 85000000; // AED

function initCurrencyConverter() {
    const currencyBtns = document.querySelectorAll('.currency-btn');
    
    currencyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active from all
            currencyBtns.forEach(b => b.classList.remove('active'));
            
            // Add active to clicked
            this.classList.add('active');
            
            // Get currency and convert
            const currency = this.getAttribute('data-currency');
            updatePrice(currency);
        });
    });
}

function updatePrice(currency) {
    const priceElement = document.getElementById('heroPrice');
    const currencyElement = document.querySelector('.price-currency');
    
    const convertedPrice = Math.round(basePrice * currencyRates[currency]);
    
    // Animate the price change
    animateValue(priceElement, convertedPrice);
    currencyElement.textContent = currencySymbols[currency];
}

function animateValue(element, finalValue) {
    const duration = 1000;
    const startValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = Math.round(startValue + (finalValue - startValue) * easeOut);
        element.textContent = formatNumber(currentValue);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* ============================================
   LIVE VIEWERS COUNTER
============================================ */
function initLiveViewers() {
    const viewersElement = document.getElementById('viewersCount');
    if (!viewersElement) return;
    
    // Update randomly every 5-10 seconds
    function updateViewers() {
        const currentViewers = parseInt(viewersElement.textContent);
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        let newViewers = currentViewers + change;
        
        // Keep between 15 and 35
        newViewers = Math.max(15, Math.min(35, newViewers));
        
        // Animate the change
        viewersElement.style.transform = 'scale(1.2)';
        viewersElement.textContent = newViewers;
        
        setTimeout(() => {
            viewersElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Initial random value
    viewersElement.textContent = Math.floor(Math.random() * 15) + 18;
    
    // Update periodically
    setInterval(updateViewers, Math.random() * 5000 + 5000);
}

/* ============================================
   DUBAI TIME
============================================ */
function initDubaiTime() {
    const timeElement = document.getElementById('dubaiTime');
    if (!timeElement) return;
    
    function updateTime() {
        const dubaiTime = new Date().toLocaleTimeString('en-US', {
            timeZone: 'Asia/Dubai',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        timeElement.textContent = dubaiTime;
    }
    
    updateTime();
    setInterval(updateTime, 60000); // Update every minute
}

/* ============================================
   FEATURE TABS
============================================ */
function initFeatureTabs() {
    const tabs = document.querySelectorAll('.feature-tab');
    const panels = document.querySelectorAll('.feature-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-feature');
            
            // Remove active from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
            
            // Re-trigger animations for new panel
            const newCards = document.querySelectorAll(`#${target} .feature-card`);
            newCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
    });
}

/* ============================================
   SCROLL ANIMATIONS
============================================ */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/* ============================================
   CALCULATORS
============================================ */
function initCalculators() {
    // Slider value updates
    const sliders = [
        { id: 'appreciationRate', valueId: 'appreciationValue', suffix: '%' },
        { id: 'investmentPeriod', valueId: 'periodValue', suffix: ' Years' },
        { id: 'downPayment', valueId: 'downPaymentValue', suffix: '%' },
        { id: 'interestRate', valueId: 'interestValue', suffix: '%' },
        { id: 'loanPeriod', valueId: 'loanPeriodValue', suffix: ' Years' }
    ];
    
    sliders.forEach(slider => {
        const input = document.getElementById(slider.id);
        const value = document.getElementById(slider.valueId);
        
        if (input && value) {
            input.addEventListener('input', function() {
                value.textContent = this.value + slider.suffix;
            });
        }
    });
}

// ROI Calculator
function calculateROI() {
    const purchasePrice = 85000000;
    const monthlyRent = parseFloat(document.getElementById('monthlyRent').value.replace(/,/g, '')) || 350000;
    const appreciationRate = parseFloat(document.getElementById('appreciationRate').value) / 100;
    const years = parseInt(document.getElementById('investmentPeriod').value);
    
    // Calculations
    const annualRent = monthlyRent * 12;
    const totalRentalIncome = annualRent * years;
    const rentalYield = (annualRent / purchasePrice) * 100;
    
    const futureValue = purchasePrice * Math.pow(1 + appreciationRate, years);
    const capitalGain = futureValue - purchasePrice;
    
    const totalProfit = totalRentalIncome + capitalGain;
    const totalROI = (totalProfit / purchasePrice) * 100;
    
    // Display results
    const resultsDiv = document.getElementById('calculatorResults');
    resultsDiv.style.display = 'block';
    
    // Animate results appearance
    resultsDiv.style.opacity = '0';
    resultsDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        resultsDiv.style.transition = 'all 0.5s ease';
        resultsDiv.style.opacity = '1';
        resultsDiv.style.transform = 'translateY(0)';
    }, 100);
    
    // Update values with animation
    document.getElementById('totalROI').textContent = totalROI.toFixed(1) + '%';
    document.getElementById('rentalYield').textContent = rentalYield.toFixed(1) + '%';
    document.getElementById('futureValue').textContent = 'AED ' + formatNumber(Math.round(futureValue));
    document.getElementById('totalRental').textContent = 'AED ' + formatNumber(Math.round(totalRentalIncome));
    document.getElementById('capitalGain').textContent = 'AED ' + formatNumber(Math.round(capitalGain));
    document.getElementById('totalProfit').textContent = 'AED ' + formatNumber(Math.round(totalProfit));
    document.getElementById('yearsLabel').textContent = years;
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Mortgage Calculator
function calculateMortgage() {
    const propertyPrice = 85000000;
    const downPaymentPercent = parseFloat(document.getElementById('downPayment').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanYears = parseInt(document.getElementById('loanPeriod').value);
    
    // Calculations
    const downPaymentAmount = propertyPrice * (downPaymentPercent / 100);
    const loanAmount = propertyPrice - downPaymentAmount;
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanYears * 12;
    
    // Monthly payment formula
    const monthlyPayment = loanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;
    
    // Percentages for breakdown
    const principalPercent = (loanAmount / totalPayment) * 100;
    const interestPercent = (totalInterest / totalPayment) * 100;
    
    // Display results
    const resultsDiv = document.getElementById('mortgageResults');
    resultsDiv.style.display = 'block';
    
    // Animate results appearance
    resultsDiv.style.opacity = '0';
    resultsDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        resultsDiv.style.transition = 'all 0.5s ease';
        resultsDiv.style.opacity = '1';
        resultsDiv.style.transform = 'translateY(0)';
    }, 100);
    
    // Update values
    document.getElementById('monthlyPayment').textContent = 'AED ' + formatNumber(Math.round(monthlyPayment));
    document.getElementById('downPaymentAmount').textContent = 'AED ' + formatNumber(Math.round(downPaymentAmount));
    document.getElementById('loanAmount').textContent = 'AED ' + formatNumber(Math.round(loanAmount));
    document.getElementById('totalInterest').textContent = 'AED ' + formatNumber(Math.round(totalInterest));
    document.getElementById('totalPayment').textContent = 'AED ' + formatNumber(Math.round(totalPayment));
    
    // Update breakdown bar
    document.getElementById('principalBar').style.width = principalPercent + '%';
    document.getElementById('interestBar').style.width = interestPercent + '%';
    document.getElementById('principalPercent').textContent = principalPercent.toFixed(1);
    document.getElementById('interestPercent').textContent = interestPercent.toFixed(1);
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ============================================
   CONTACT FORM
============================================ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            
            // Show success state
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> <span>Message Sent!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
            
            // Create WhatsApp message
            const phoneNumber = '971501234567'; // Replace with actual number
            const message = `Hi, I'm interested in the AED 85M Palm Jumeirah Villa.

Name: ${form.querySelector('input[type="text"]').value}
Email: ${form.querySelector('input[type="email"]').value}
Phone: ${form.querySelector('.phone-number').value}

Please contact me to schedule a viewing.`;

            // Open WhatsApp after brief delay
            setTimeout(() => {
                window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
                
                // Reset form
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 1500);
        });
    }
}

/* ============================================
   BACK TO TOP BUTTON
============================================ */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   SMOOTH SCROLL
============================================ */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   MOBILE MENU
============================================ */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.querySelector('.nav-menu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const links = menu.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', function() {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });
}

/* ============================================
   VIRTUAL TOUR BUTTON
============================================ */
const virtualTourBtn = document.getElementById('virtualTourBtn');
if (virtualTourBtn) {
    virtualTourBtn.addEventListener('click', function() {
        // You can replace this with actual virtual tour link
        alert('Virtual Tour Coming Soon!\n\nThis would open an immersive 3D walkthrough of the property.');
    });
}

const virtual360 = document.getElementById('virtual360');
if (virtual360) {
    virtual360.addEventListener('click', function() {
        alert('360° Virtual Tour Coming Soon!\n\nThis would open an interactive 360-degree experience.');
    });
}

/* ============================================
   OPEN IN MAPS
============================================ */
function openInMaps() {
    const lat = 25.112202;
    const lng = 55.138950;
    const label = 'Palm Jumeirah Villa';
    
    // Check if mobile
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // Mobile - open in native maps app
        window.open(`https://maps.google.com/maps?q=${lat},${lng}&label=${encodeURIComponent(label)}`, '_blank');
    } else {
        // Desktop - open Google Maps
        window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
    }
}

/* ============================================
   GALLERY LIGHTBOX (Simple Implementation)
============================================ */
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const src = img.src;
        const title = this.querySelector('.gallery-title')?.textContent || 'Property Image';
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <button class="lightbox-close">&times;</button>
                <img src="${src}" alt="${title}">
                <div class="lightbox-caption">${title}</div>
            </div>
        `;
        
        // Add styles dynamically
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;
        
        lightbox.querySelector('.lightbox-overlay').style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
        `;
        
        lightbox.querySelector('.lightbox-content').style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            z-index: 1;
        `;
        
        lightbox.querySelector('.lightbox-close').style.cssText = `
            position: absolute;
            top: -50px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 40px;
            cursor: pointer;
            z-index: 2;
        `;
        
        lightbox.querySelector('img').style.cssText = `
            max-width: 100%;
            max-height: 80vh;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;
        
        lightbox.querySelector('.lightbox-caption').style.cssText = `
            text-align: center;
            color: white;
            font-size: 18px;
            margin-top: 20px;
            font-weight: 600;
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close on click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-overlay') || e.target.classList.contains('lightbox-close')) {
                lightbox.remove();
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                lightbox.remove();
                document.body.style.overflow = 'auto';
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    });
});

/* ============================================
   PARALLAX EFFECT FOR HERO
============================================ */
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});

/* ============================================
   COUNTER ANIMATION FOR STATS
============================================ */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .highlight-stat, .spec-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/,/g, ''));
        if (isNaN(target)) return;
        
        const duration = 2000;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(target * easeOut);
            
            counter.textContent = formatNumber(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        // Only animate when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(update);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Initialize counter animations
animateCounters();

/* ============================================
   PAGE VISIBILITY API
   Pause animations when tab is not visible
============================================ */
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopSlideshow();
    } else {
        startSlideshow();
    }
});

/* ============================================
   CONSOLE LOG FOR AGENTS
============================================ */
console.log('%c✨ Luxury Property Presentation', 'font-size: 24px; font-weight: bold; color: #D4AF37;');
console.log('%cBuilt for premium real estate agents', 'font-size: 14px; color: #666;');
console.log('%cContact: [Your Name] | [Your WhatsApp]', 'font-size: 12px; color: #999;');