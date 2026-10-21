// =========================================================
// Validación del formulario de solicitud de propuesta — TrackFlow
// Reglas documentadas en README.md (tabla "Campos del formulario").
// =========================================================

const form = document.getElementById('proposal-form');
const successMessage = document.getElementById('form-success');

// ---------- Mostrar / limpiar errores ----------
// Cada campo tiene un <p id="<idDelCampo>-error"> debajo, donde va el mensaje.

function showError(field, message) {
  const errorElement = document.getElementById(`${field.id}-error`);
  errorElement.textContent = message;
  field.setAttribute('aria-invalid', 'true'); // borde rojo (Tailwind) + aviso a lectores de pantalla
}

function clearError(field) {
  const errorElement = document.getElementById(`${field.id}-error`);
  errorElement.textContent = '';
  field.removeAttribute('aria-invalid');
}

// ---------- Reglas por campo ----------
// Cada regla recibe el valor y devuelve '' si es válido,
// o el mensaje de error si no lo es.

const validators = {
companyName: (value) => {
  if (value.trim().length < 2) return 'El nombre de la empresa debe tener al menos 2 caracteres';
  return '';
},

  contactPerson: (value) => {
    if (value.trim().split(/\s+/).length < 2) return 'Ingresa nombre y apellido del contacto';
    return '';
  },

  email: (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) return 'Ingresa un email corporativo válido (ejemplo: nombre@empresa.com)';
    return '';
  },

  website: (value) => {
    if (value.trim() === '') return '';
    if (!value.startsWith('http://') && !value.startsWith('https://')) return 'La URL debe empezar con http:// o https://';
    return '';
  },

  country: (value) => {
    if (value.trim() === '') return 'Selecciona el país de operación principal';
    return '';
  },

  phone: (value) => {
    if (value.trim().match(/^\+\d{1,3}[\s\d]{6,}$/) === null) return 'El teléfono debe incluir código de país (ejemplo: +1 213 555 0147)';
    return '';
  },
  
  productType: (value) => {
    if (value.trim() === '') return 'Selecciona el tipo de producto que manejas';
    return '';
  },
  
  shippingVolume: (value) => {
    if (value.trim() === '') return 'Selecciona el volumen mensual estimado';
    return '';
  },

  comments: (value) => {
    if (value.length > 500) return 'Los comentarios no pueden exceder 500 caracteres';
    return `Quedan ${500 - value.length} caracteres.`;
  }
};

// ---------- Validar un campo ----------

function validateField(field) {
  const validator = validators[field.id];
  if (!validator) return true; // campos sin regla (ej. los checkboxes) se validan aparte

  const message = validator(field.value);
  if (message) {
    showError(field, message);
    return false;
  }
  clearError(field);
  return true;
}

function validateServices() {
  const checked = form.querySelectorAll('input[name="services"]:checked').length;
  const errorElement = document.getElementById('services-error');
  if (checked === 0) {
    errorElement.textContent = 'Selecciona al menos un servicio de interés';
    return false;
  }
  errorElement.textContent = '';
  return true;
}

// ---------- Validación en tiempo real ----------

const fields = form.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]), select, textarea');

fields.forEach((field) => {
  // Al salir del campo: valida siempre
  field.addEventListener('blur', () => validateField(field));

  // Mientras escribe: solo re-valida si ya tenía error (para no molestar antes de tiempo)
  field.addEventListener('input', () => {
    if (field.getAttribute('aria-invalid') === 'true') validateField(field);
  });
});

// ---------- Envío ----------

form.addEventListener('submit', (event) => {
  event.preventDefault(); // no hay backend: simulamos el envío
  successMessage.classList.add('hidden');

  let isValid = true;
  fields.forEach((field) => {
    if (!validateField(field)) isValid = false;
  });
  if (!validateServices()) isValid = false;

  if (!isValid) {
    // Lleva el foco al primer campo con error (accesibilidad por teclado)
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  form.reset();
  successMessage.classList.remove('hidden');
  successMessage.focus();
});


form.addEventListener('reset', () => {
  fields.forEach((field) => clearError(field));
  document.getElementById('services-error').textContent = '';
  successMessage.classList.add('hidden');
});
