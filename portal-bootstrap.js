(async () => {
  const main = document.getElementById('main');
  main.innerHTML = '<div class="portal-loading">Loading fictional demo records…</div>';
  try {
    const response = await fetch('seed-data.json');
    if (!response.ok) throw Error('Could not load demo records.');
    window.wombsDemoSeed = await response.json();
    let storedRole;
    try {
      storedRole = sessionStorage.getItem('wombs-pages-role');
      const stored = JSON.parse(localStorage.getItem('wombs-pages-demo-v1'));
      if (stored && Array.isArray(stored.patients) && stored.patients.some(patient => patient.id === 'WM-0001')) window.wombsData = stored;
    } catch { /* Demo works in memory when browser storage is unavailable. */ }
    window.wombsData ||= structuredClone(window.wombsDemoSeed);
    const requestedRole = new URLSearchParams(location.search).get('role') || storedRole;
    window.wombsRole = ['Doctor', 'Patient', 'Secretary'].includes(requestedRole) ? requestedRole : 'Patient';
    window.wombsUser = {role: window.wombsRole, patient_id: 'WM-0001'};
    for (const file of ['app.js', 'chart.js', 'clinic-entry.js']) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = file;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }
  } catch {
    main.innerHTML = '<div class="portal-loading"><h2>Could not load the demo</h2><p>Check your connection and reload this page.</p><a href="account.html">Back to demo login</a></div>';
  }
})();
