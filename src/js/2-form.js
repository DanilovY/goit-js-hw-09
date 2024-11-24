'use strict';
const storageKey = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

function saveToLocalStorage() {
  localStorage.setItem(storageKey, JSON.stringify(formData));
}

function loadFromLocalStorage() {
  const savedData = localStorage.getItem(storageKey);

  if (savedData) {
    const parsedData = JSON.parse(savedData);

    formData.email = parsedData.email || '';
    formData.message = parsedData.message || '';

    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
}

form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value;

  saveToLocalStorage();
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Fill please all fields');
    return;
  }

  console.log('Submitted data:', formData);

  localStorage.removeItem(storageKey);

  formData.email = '';
  formData.message = '';

  form.reset();
});

loadFromLocalStorage();
