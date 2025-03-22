let formData = { email: '', message: '' };
const formDataKey = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('input', saveFormData);

let storageData = JSON.parse(localStorage.getItem(formDataKey));
    if (storageData) {
        try {
            form.elements.email.value = storageData.email;
            form.elements.message.value = storageData.message;
            formData.email = storageData.email;
            formData.message = storageData.message;
        } catch {
            console.log('Error');
       }       
    }

function saveFormData(event) {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem(formDataKey, JSON.stringify(formData));
}

form.addEventListener('submit', runForm);

function runForm(event) {
    event.preventDefault();
    if (!form.elements.email.value.trim() || !form.elements.message.value.trim()) {
        console.log('Fill in all fields.');
        return;
    }
    console.log(formData);
    localStorage.removeItem(formDataKey);
    form.reset();
    formData = { email: '', message: '' };
}

