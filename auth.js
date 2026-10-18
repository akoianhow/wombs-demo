// Public demo identities only. This is a role simulation, not authentication.
const demoUsers = [
  {email: 'sofia@wombs.demo', password: 'WombsDemo2026!', role: 'Patient', patient_id: 'WM-0001'},
  {email: 'doctor@wombs.demo', password: 'WombsDemo2026!', role: 'Doctor'},
  {email: 'secretary@wombs.demo', password: 'WombsDemo2026!', role: 'Secretary'},
];
const form = document.getElementById('auth-form');
const params = new URLSearchParams(location.search);
for (const id of ['registration-fields', 'registration-consent', 'confirm-field', 'password-help', 'linking-note', 'auth-tabs']) {
  document.getElementById(id).hidden = true;
}
document.getElementById('auth-title').textContent = 'Explore the WOMBS demo.';
document.getElementById('auth-subtitle').textContent = 'Choose a demo user below, or enter one of the public demo logins. No account is created.';
document.getElementById('auth-submit').innerHTML = 'Open demo <span>→</span>';
document.querySelector('.auth-panel > .small-text:not([id])').textContent = 'Demo only. Changes stay in this browser. Use fictional details only; no clinic receives your entries.';
document.getElementById('staff-help').hidden = false;
document.querySelector('.staff-access').hidden = true;
form.onsubmit = event => {
  event.preventDefault();
  const fields = new FormData(form);
  const user = demoUsers.find(user => user.email === String(fields.get('email')).trim().toLowerCase() && user.password === fields.get('password'));
  const error = document.getElementById('auth-error');
  if (!user) {
    error.textContent = 'Use one of the three demo buttons or the demo credentials shown below.';
    return;
  }
  try { sessionStorage.setItem('wombs-pages-role', user.role); } catch { /* The role is also carried in the URL. */ }
  const target = new URL('clinic.html', location.href);
  target.searchParams.set('role', user.role);
  if (params.get('book')) target.searchParams.set('book', params.get('book'));
  location.href = target.href;
};
document.getElementById('show-password').onclick = event => {
  const password = form.elements.password;
  password.type = password.type === 'password' ? 'text' : 'password';
  event.currentTarget.textContent = password.type === 'password' ? 'Show' : 'Hide';
  event.currentTarget.setAttribute('aria-label', password.type === 'password' ? 'Show password' : 'Hide password');
};
for (const button of document.querySelectorAll('[data-demo-role]')) {
  button.onclick = () => {
    const user = demoUsers.find(user => user.role.toLowerCase() === button.dataset.demoRole);
    form.elements.email.value = user.email;
    form.elements.password.value = user.password;
    form.requestSubmit();
  };
}
