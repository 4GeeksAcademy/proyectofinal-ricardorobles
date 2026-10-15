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
  // ✅ Ejemplos resueltos (fieldset "Datos de contacto")
  contactName: (value) => {
    if (value.trim() === '') return 'Escribe tu nombre y apellido.';
    if (value.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres.';
    return '';
  },

  contactRole: (value) => {
    if (value.trim() === '') return 'Indica tu cargo en la empresa.';
    return '';
  },

  email: (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.trim() === '') return 'Escribe tu email.';
    if (!emailPattern.test(value)) return 'El email no es válido. Ejemplo: nombre@empresa.com';
    return '';
  },

  // ✏️ TODO 1 — brandName: obligatorio.
  //    Pista: igual que contactRole.

  // ✏️ TODO 2 — website: obligatorio y debe empezar con http:// o https://
  //    Pista: value.startsWith('https://')

  // ✏️ TODO 3 — country: debe elegir una opción (el value vacío "" no vale).

  // ✏️ TODO 4 — phone: regla de dominio según el país elegido.
  //    US   → +1 seguido de 10 dígitos      (/^\+1\d{10}$/)
  //    ES   → +34 seguido de 9 dígitos, que empiezan con 6, 7, 8 o 9 (/^\+34[6-9]\d{8}$/)
  //    BOTH → acepta cualquiera de los dos
  //    Pistas: quita espacios antes de probar → value.replace(/\s/g, '')
  //            el país está en document.getElementById('country').value

  // ✏️ TODO 5 — monthlyOrders: obligatorio, número entero y mínimo 100.
  //    Pista: Number(value), Number.isInteger(...)

  // ✏️ TODO 6 — returnRate: obligatorio, entre 0 y 100.

  // ✏️ TODO 7 — warehouse: debe elegir una opción.

  // ✏️ TODO 8 — startDate: obligatoria y en el futuro (posterior a hoy).
  //    Pista: new Date(value) > new Date()

  // ✏️ TODO 9 — message: opcional, pero máximo 500 caracteres.
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

// ✏️ TODO 10 — Servicios: al menos un checkbox marcado.
//    Escribe una función validateServices() que devuelva true/false
//    y muestre el error en el <p id="services-error">.
//    Pista: form.querySelectorAll('input[name="services"]:checked').length

// ---------- Validación en tiempo real ----------

const fields = form.querySelectorAll('input:not([type="checkbox"]), select, textarea');

fields.forEach((field) => {
  // Al salir del campo: valida siempre
  field.addEventListener('blur', () => validateField(field));

  // Mientras escribe: solo re-valida si ya tenía error (para no molestar antes de tiempo)
  field.addEventListener('input', () => {
    if (field.getAttribute('aria-invalid') === 'true') validateField(field);
  });
});

// ✏️ TODO 11 — Cuando cambie el país, re-valida el teléfono si ya tiene algo escrito.
//    Pista: escucha el evento 'change' de #country.

// ---------- Envío ----------

form.addEventListener('submit', (event) => {
  event.preventDefault(); // no hay backend: simulamos el envío
  successMessage.classList.add('hidden');

  let isValid = true;
  fields.forEach((field) => {
    if (!validateField(field)) isValid = false;
  });
  // ✏️ TODO 10 (parte 2): suma aquí validateServices()

  if (!isValid) {
    // Lleva el foco al primer campo con error (accesibilidad por teclado)
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  // Primero reset y después mostrar el éxito: form.reset() dispara el evento 'reset' (TODO 12),
  // que oculta el mensaje de éxito. En el orden inverso, el mensaje se ocultaría al instante.
  form.reset();
  successMessage.classList.remove('hidden');
  successMessage.focus();
});

// ✏️ TODO 12 — Botón "Limpiar formulario": al hacer reset, borra también
//    todos los mensajes de error y oculta el mensaje de éxito.
//    Pista: escucha el evento 'reset' del form y usa clearError() en cada campo.
