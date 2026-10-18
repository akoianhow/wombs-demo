role = window.wombsRole;
page = 'Overview';
selected = mine() || db.patients[0].id;
tab = 'Timeline';
const roleSelect = document.getElementById('role');
roleSelect.value = role;
document.querySelector('label[for=role]').textContent = 'Demo user';
roleSelect.disabled = true;
const logout = document.createElement('button');
logout.className = 'btn';
logout.type = 'button';
logout.textContent = 'Switch demo user';
logout.onclick = () => {
  try { sessionStorage.removeItem('wombs-pages-role'); } catch { /* No stored session. */ }
  location.href = 'account.html';
};
document.querySelector('header .role').appendChild(logout);
save = function (action) {
  db.audit.unshift({date: new Date().toLocaleString('en-PH', {timeZone: 'Asia/Manila'}), actor: role, action});
  try {
    localStorage.setItem('wombs-pages-demo-v1', JSON.stringify(db));
    toast('Demo change saved in this browser only');
  } catch {
    toast('Browser storage unavailable. Demo changes last until reload.');
  }
  render();
};
resetData = function () {
  ask('Restore fictional demo records? This removes demo changes in this browser.', () => {
    db = structuredClone(window.wombsDemoSeed);
    extendCharts();
    selected = mine() || db.patients[0].id;
    closeModal();
    save('Restored fictional demo records');
  });
};
render();
const requestedService = new URLSearchParams(location.search).get('book');
if (requestedService && role === 'Patient') {
  book();
  const index = services.findIndex(service => service[1] === requestedService);
  if (index >= 0) chooseService(index);
}
