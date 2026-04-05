// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');


hamburger.addEventListener('click', () => {
   hamburger.classList.toggle('active');
   navMenu.classList.toggle('active');
});


navLinks.forEach(n => n.addEventListener('click', () => {
   hamburger.classList.remove('active');
   navMenu.classList.remove('active');
}));


// Sticky Navbar
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
   if(window.scrollY > 50) {
       header.classList.add('scrolled');
   } else {
       header.classList.remove('scrolled');
   }
});


// Update active nav link
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
   let scrollY = window.pageYOffset;
   sections.forEach(current => {
       const sectionHeight = current.offsetHeight;
       const sectionTop = current.offsetTop - 100;
       const sectionId = current.getAttribute('id');
       const link = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
      
       if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
           if(link) link.classList.add('active');
       } else {
           if(link) link.classList.remove('active');
       }
   });
});


// Intersection Observer for Animations
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };


const appearOnScroll = new IntersectionObserver(function(entries, observer) {
   entries.forEach(entry => {
       if (!entry.isIntersecting) return;
       entry.target.classList.add('appear');
       observer.unobserve(entry.target);
   });
}, appearOptions);


faders.forEach(fader => appearOnScroll.observe(fader));




// Form Validation
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('form-success');


function isRequired(value) { return value.trim() !== ''; }
function isEmailValid(email) {
   const re = /^[^@]+@[^@]+\.[^@]+$/;
   return re.test(email);
}


function checkField(input, validationFn, blankMsg, invalidMsg) {
   const value = input.value.trim();
   const formGroup = input.parentElement;
   const errorText = formGroup.querySelector('.error-text');
  
   if (!isRequired(value)) {
       formGroup.classList.add('error');
       errorText.innerText = blankMsg;
       return false;
   } else if (validationFn && !validationFn(value)) {
       formGroup.classList.add('error');
       errorText.innerText = invalidMsg;
       return false;
   } else {
       formGroup.classList.remove('error');
       return true;
   }
}


form.addEventListener('submit', function(e) {
   e.preventDefault();
  
   let isNameValid = checkField(nameInput, null, 'Name cannot be blank.', '');
   let isEmailValid = checkField(emailInput, isEmailValid, 'Email cannot be blank.', 'Email is not valid.');
   let isMessageValid = checkField(messageInput, null, 'Message cannot be blank.', '');


   if (isNameValid && isEmailValid && isMessageValid) {
       successMessage.classList.remove('hidden');
       form.reset();
       setTimeout(() => successMessage.classList.add('hidden'), 5000);
   }
});


nameInput.addEventListener('input', () => checkField(nameInput, null, 'Name cannot be blank.', ''));
emailInput.addEventListener('input', () => checkField(emailInput, isEmailValid, 'Email cannot be blank.', 'Email is not valid.'));
messageInput.addEventListener('input', () => checkField(messageInput, null, 'Message cannot be blank.', ''));


// Update Footer Year
document.getElementById('year').textContent = new Date().getFullYear();



