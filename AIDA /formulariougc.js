// Variables globales
let currentStep = 1;
let socialNetworkCount = 1;
let selectedInterests = [];
const maxInterests = 5;
const minInterests = 1;
const maxSocialNetworks = 4;

// Datos para los selects
const countries = [
    'Chile',
    'Argentina', 'Bolivia', 'Brasil', 'Colombia', 'Ecuador', 'Paraguay', 'Perú', 'Uruguay', 'Venezuela',
    'Estados Unidos', 'Canadá', 'México',
    'España', 'Francia', 'Italia', 'Alemania', 'Reino Unido', 'Portugal',
    'Otros'
];

const chileanRegions = [
    'Región Metropolitana',
    'Región de Arica y Parinacota',
    'Región de Tarapacá',
    'Región de Antofagasta',
    'Región de Atacama',
    'Región de Coquimbo',
    'Región de Valparaíso',
    'Región del Libertador General Bernardo O\'Higgins',
    'Región del Maule',
    'Región de Ñuble',
    'Región del Biobío',
    'Región de La Araucanía',
    'Región de Los Ríos',
    'Región de Los Lagos',
    'Región de Aysén del General Carlos Ibáñez del Campo',
    'Región de Magallanes y de la Antártica Chilena'
];

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    populateSelects();
    setupEventListeners();
});

// Inicializar formulario
function initializeForm() {
    updateStepIndicator();
    updateProgressBar();
}

// Poblar selects con datos
function populateSelects() {
    // Años de nacimiento (1950 - 2010)
    const birthYearSelect = document.getElementById('birthYear');
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 15; year >= 1950; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        birthYearSelect.appendChild(option);
    }
    
    // Nacionalidades
    const nationalitySelect = document.getElementById('nationality');
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.toLowerCase().replace(/\s+/g, '-');
        option.textContent = country;
        nationalitySelect.appendChild(option);
    });
    
    // Regiones de Chile
    const locationSelect = document.getElementById('location');
    chileanRegions.forEach(region => {
        const option = document.createElement('option');
        option.value = region.toLowerCase().replace(/\s+/g, '-');
        option.textContent = region;
        locationSelect.appendChild(option);
    });
}

// Configurar event listeners
function setupEventListeners() {
    // Intereses
    const interestTags = document.querySelectorAll('.interest-tag');
    interestTags.forEach(tag => {
        tag.addEventListener('click', function() {
            toggleInterest(this);
        });
    });
    
    // Validación en tiempo real
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// Navegación entre pasos
function nextStep() {
    console.log('nextStep() llamado, paso actual:', currentStep);
    
    if (validateCurrentStep()) {
        if (currentStep < 5) {
            currentStep++;
            console.log('Avanzando al paso:', currentStep);
            showStep(currentStep);
            updateStepIndicator();
            updateProgressBar();
        }
    } else {
        console.log('Validación falló para el paso:', currentStep);
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateStepIndicator();
        updateProgressBar();
    }
}

function showStep(step) {
    console.log('Mostrando paso:', step); // Para debugging
    
    // Ocultar todos los pasos
    const allSteps = document.querySelectorAll('.form-step');
    allSteps.forEach(stepEl => {
        stepEl.classList.remove('active');
        stepEl.style.display = 'none'; // Forzar ocultar
    });
    
    // Mostrar paso actual
    const currentStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
    if (currentStepEl) {
        currentStepEl.classList.add('active');
        currentStepEl.style.display = 'block'; // Forzar mostrar
        console.log('Paso mostrado:', currentStepEl); // Para debugging
    } else {
        console.error('No se encontró el paso:', step);
    }
    
    // Manejar la visibilidad del step indicator
    const formContainer = document.querySelector('.form-container');
    if (step === 5) {
        formContainer.classList.add('step-5');
    } else {
        formContainer.classList.remove('step-5');
    }
}

function updateStepIndicator() {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber === currentStep) {
            step.classList.add('active');
        } else if (stepNumber < currentStep) {
            step.classList.add('completed');
        }
    });
}

function updateProgressBar() {
    const progressBar = document.querySelector('.step-line-progress');
    const progressPercentage = ((currentStep - 1) / 3) * 100; // 4 pasos = 100%
    progressBar.style.width = `${progressPercentage}%`;
}

// Validaciones
function validateCurrentStep() {
    switch (currentStep) {
        case 1:
            return validateStep1();
        case 2:
            return validateStep2();
        case 3:
            return validateStep3();
        case 4:
            return validateStep4();
        default:
            return true;
    }
}

function validateStep1() {
    // Por ahora, validación menos estricta para testing
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!fullName) {
        alert('Por favor ingresa tu nombre');
        return false;
    }
    
    if (!email) {
        alert('Por favor ingresa tu email');
        return false;
    }
    
    // Si hay valores básicos, permitir continuar
    return true;
}

function validateStep2() {
    const socialNetworks = document.querySelectorAll('.social-network');
    let isValid = true;
    
    socialNetworks.forEach((network, index) => {
        const platform = network.querySelector(`[name="platform_${index}"]`);
        const followers = network.querySelector(`[name="followers_${index}"]`);
        const profileLink = network.querySelector(`[name="profileLink_${index}"]`);
        
        if (platform && !validateField(platform)) isValid = false;
        if (followers && !validateField(followers)) isValid = false;
        if (profileLink && !validateField(profileLink)) isValid = false;
    });
    
    return isValid;
}

function validateStep3() {
    if (selectedInterests.length < minInterests) {
        alert(`Debes seleccionar al menos ${minInterests} interés`);
        return false;
    }
    return true;
}

function validateStep4() {
    const location = document.getElementById('location');
    const modality = document.getElementById('modality');
    
    return validateField(location) && validateField(modality);
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name || field.id;
    
    clearFieldError(field);
    
    // Campo requerido
    if (field.required && !value) {
        showFieldError(field, 'Este campo es requerido');
        return false;
    }
    
    // Validación por tipo
    switch (fieldType) {
        case 'email':
            if (value && !isValidEmail(value)) {
                showFieldError(field, 'Ingresa un email válido');
                return false;
            }
            break;
            
        case 'tel':
            if (value && !isValidPhone(value)) {
                showFieldError(field, 'Ingresa un teléfono válido');
                return false;
            }
            break;
            
        case 'url':
            if (value && !isValidURL(value)) {
                showFieldError(field, 'Ingresa una URL válida');
                return false;
            }
            break;
    }
    
    return true;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Funciones de validación específicas
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{8,}$/;
    return phoneRegex.test(phone);
}

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Manejo de redes sociales
function addSocialNetwork() {
    if (socialNetworkCount >= maxSocialNetworks) {
        return;
    }
    
    const socialNetworksContainer = document.getElementById('socialNetworks');
    const newNetwork = createSocialNetworkElement(socialNetworkCount);
    
    socialNetworksContainer.appendChild(newNetwork);
    socialNetworkCount++;
    
    // Ocultar botón si llegamos al máximo
    if (socialNetworkCount >= maxSocialNetworks) {
        document.getElementById('addSocialBtn').style.display = 'none';
    }
    
    // Animar la entrada
    newNetwork.style.opacity = '0';
    newNetwork.style.transform = 'translateY(20px)';
    setTimeout(() => {
        newNetwork.style.transition = 'all 0.3s ease';
        newNetwork.style.opacity = '1';
        newNetwork.style.transform = 'translateY(0)';
    }, 10);
}

function createSocialNetworkElement(index) {
    const div = document.createElement('div');
    div.className = 'social-network';
    div.setAttribute('data-index', index);
    
    div.innerHTML = `
        <button type="button" class="remove-social" onclick="removeSocialNetwork(${index})">&times;</button>
        <div class="form-grid three-col">
            <div class="form-group">
                <select name="platform_${index}" required>
                    <option value="">Plataforma</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">YouTube</option>
                    <option value="otra">Otra</option>
                </select>
            </div>
            
            <div class="form-group">
                <select name="followers_${index}" required>
                    <option value="">Seguidores</option>
                    <option value="menos-1000">Menos de 1.000 seguidores</option>
                    <option value="1000-4999">Entre 1.000 y 4.999 seguidores</option>
                    <option value="5000-9999">Entre 5.000 y 9.999 seguidores</option>
                    <option value="10000-24999">Entre 10.000 y 24.999 seguidores</option>
                    <option value="25000-49999">Entre 25.000 y 49.999 seguidores</option>
                    <option value="mas-50000">Más de 50.000 seguidores</option>
                </select>
            </div>
            
            <div class="form-group">
                <input type="url" name="profileLink_${index}" placeholder="Link del perfil" required>
            </div>
        </div>
    `;
    
    return div;
}

function removeSocialNetwork(index) {
    const networkToRemove = document.querySelector(`[data-index="${index}"]`);
    if (networkToRemove && socialNetworkCount > 1) {
        // Animar la salida
        networkToRemove.style.transition = 'all 0.3s ease';
        networkToRemove.style.opacity = '0';
        networkToRemove.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            networkToRemove.remove();
            socialNetworkCount--;
            
            // Mostrar botón agregar si no estamos en el máximo
            if (socialNetworkCount < maxSocialNetworks) {
                document.getElementById('addSocialBtn').style.display = 'flex';
            }
            
            // Reindexar elementos restantes
            reindexSocialNetworks();
        }, 300);
    }
}

function reindexSocialNetworks() {
    const networks = document.querySelectorAll('.social-network');
    networks.forEach((network, index) => {
        network.setAttribute('data-index', index);
        
        // Actualizar nombres de campos
        const platform = network.querySelector('select[name*="platform"]');
        const followers = network.querySelector('select[name*="followers"]');
        const profileLink = network.querySelector('input[name*="profileLink"]');
        const removeBtn = network.querySelector('.remove-social');
        
        if (platform) platform.name = `platform_${index}`;
        if (followers) followers.name = `followers_${index}`;
        if (profileLink) profileLink.name = `profileLink_${index}`;
        if (removeBtn) removeBtn.setAttribute('onclick', `removeSocialNetwork(${index})`);
    });
}

// Manejo de intereses
function toggleInterest(element) {
    const interest = element.getAttribute('data-interest');
    const isSelected = element.classList.contains('selected');
    
    if (isSelected) {
        // Deseleccionar
        element.classList.remove('selected');
        selectedInterests = selectedInterests.filter(item => item !== interest);
        
        // Habilitar otros botones si estaban deshabilitados
        enableInterestButtons();
    } else {
        // Verificar si podemos seleccionar más
        if (selectedInterests.length >= maxInterests) {
            return;
        }
        
        // Seleccionar
        element.classList.add('selected');
        selectedInterests.push(interest);
        
        // Deshabilitar otros botones si llegamos al máximo
        if (selectedInterests.length >= maxInterests) {
            disableUnselectedInterests();
        }
    }
    
    updateInterestsCounter();
}

function enableInterestButtons() {
    const interestTags = document.querySelectorAll('.interest-tag');
    interestTags.forEach(tag => {
        tag.disabled = false;
    });
}

function disableUnselectedInterests() {
    const interestTags = document.querySelectorAll('.interest-tag:not(.selected)');
    interestTags.forEach(tag => {
        tag.disabled = true;
    });
}

function updateInterestsCounter() {
    const counter = document.getElementById('selectedCount');
    counter.textContent = selectedInterests.length;
    
    // Cambiar color basado en el estado
    const counterElement = counter.parentElement;
    if (selectedInterests.length === 0) {
        counterElement.style.color = '#ff4757';
    } else if (selectedInterests.length >= minInterests) {
        counterElement.style.color = '#4CAF50';
    } else {
        counterElement.style.color = '#666';
    }
}

// Envío del formulario
function submitForm() {
    if (!validateCurrentStep()) {
        return;
    }
    
    const formData = collectFormData();
    
    // Mostrar estado de carga
    const submitBtn = event.target;
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simular envío (aquí integrarías con tu backend)
    setTimeout(() => {
        console.log('Datos del formulario:', formData);
        
        // Ir al paso de confirmación
        currentStep = 5;
        showStep(currentStep);
        updateStepIndicator();
        updateProgressBar();
        
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 2000);
}

function collectFormData() {
    const formData = {
        personalInfo: {
            fullName: document.getElementById('fullName').value,
            gender: document.getElementById('gender').value,
            birthYear: document.getElementById('birthYear').value,
            nationality: document.getElementById('nationality').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        },
        socialNetworks: [],
        interests: selectedInterests,
        finalInfo: {
            location: document.getElementById('location').value,
            modality: document.getElementById('modality').value
        },
        timestamp: new Date().toISOString()
    };
    
    // Recopilar redes sociales
    const networks = document.querySelectorAll('.social-network');
    networks.forEach((network, index) => {
        const platform = network.querySelector(`[name="platform_${index}"]`);
        const followers = network.querySelector(`[name="followers_${index}"]`);
        const profileLink = network.querySelector(`[name="profileLink_${index}"]`);
        
        if (platform && followers && profileLink) {
            formData.socialNetworks.push({
                platform: platform.value,
                followers: followers.value,
                profileLink: profileLink.value
            });
        }
    });
    
    return formData;
}

// Funciones de navegación
function goToHome() {
    window.location.href = 'https://aidadigital.cl';
}

// Funciones utilitarias
function resetForm() {
    currentStep = 1;
    selectedInterests = [];
    socialNetworkCount = 1;
    
    // Limpiar formulario
    document.getElementById('ugcForm').reset();
    
    // Remover redes sociales adicionales
    const additionalNetworks = document.querySelectorAll('.social-network[data-index]:not([data-index="0"])');
    additionalNetworks.forEach(network => network.remove());
    
    // Limpiar intereses seleccionados
    const interestTags = document.querySelectorAll('.interest-tag');
    interestTags.forEach(tag => {
        tag.classList.remove('selected');
        tag.disabled = false;
    });
    
    // Mostrar botón agregar red social
    document.getElementById('addSocialBtn').style.display = 'flex';
    
    // Volver al primer paso
    showStep(1);
    updateStepIndicator();
    updateProgressBar();
    updateInterestsCounter();
    
    // Limpiar errores
    const errorGroups = document.querySelectorAll('.form-group.error');
    errorGroups.forEach(group => {
        group.classList.remove('error');
    });
}

// Manejo de eventos del teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        
        // Si estamos en el último paso, enviar formulario
        if (currentStep === 4) {
            submitForm();
        } else if (currentStep < 4) {
            nextStep();
        }
    }
    
    // Navegación con flechas (opcional)
    if (e.altKey) {
        if (e.key === 'ArrowRight' && currentStep < 4) {
            nextStep();
        } else if (e.key === 'ArrowLeft' && currentStep > 1) {
            prevStep();
        }
    }
});

// Auto-guardar en localStorage (opcional)
function autoSave() {
    const formData = collectFormData();
    localStorage.setItem('ugc_form_draft', JSON.stringify(formData));
}

function loadDraft() {
    const draft = localStorage.getItem('ugc_form_draft');
    if (draft) {
        const data = JSON.parse(draft);
        // Implementar carga de datos guardados
        console.log('Draft encontrado:', data);
    }
}

// Inicializar auto-guardado
setInterval(autoSave, 30000); // Guardar cada 30 segundos