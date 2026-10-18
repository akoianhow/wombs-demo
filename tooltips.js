/* Demo guidance follows dynamically rendered controls without changing their actions. */
(()=>{
const selector='button, a[href], summary';
const descriptions={
'Register patient':'Open the form to create a patient chart in the clinic directory.',
'Open chart':'Open this patient’s medical chart.',
'View consultation':'Open this consultation to read its clinical notes.',
'View record':'Open this clinical record to view its details.',
'Update contact information':'Edit this patient’s contact and personal information.',
'Add report':'Enter a laboratory or ultrasound report for doctor review.',
'New document':'Prepare a clinical document as a draft for doctor approval.',
'Approve & release':'Approve this document and share it with the patient after confirmation.',
'Review & release':'Mark this result as reviewed and share it with the patient after confirmation.',
'Record payment':'Open the form to record a payment method and any required reference.',
'Confirm payment':'Save this payment and mark the charge as paid.',
'Receipt':'View the demo payment acknowledgment for this charge.',
'Print':'Open this document in a printable format.',
'Export demo data':'Download a JSON copy of the clinic’s demo records.',
'Reset seed data':'Restore the fictional seed records after confirmation, replacing existing demo changes.',
'Keep appointment':'Close the cancellation window and keep this appointment.',
'Request new schedule':'Save the requested date and time for this appointment.',
'Confirm cancellation':'Cancel this appointment and update its status.',
'Sign consultation':'Sign and lock this consultation after confirmation.',
'Send for doctor review':'Save these notes and send them to the doctor for review.',
'Save amendment':'Save the correction and reason alongside the original signed record.',
'Save for review':'Save this report for doctor review before patient release.',
'Save':'Save the details entered in this form.',
'Overview':'View the clinic overview and appointment summary.',
'Appointments':'View bookings and appointment statuses.',
'Patients':'Find a patient and open their medical chart.',
'My records':'View your medical records and instructions shared by the doctor.',
'Review queue':'Review clinical records awaiting the doctor’s signature.',
'Results':'View and manage patient investigation results.',
'Documents':'View and manage patient documents.',
'Billing':'View charges and record patient payments.',
'Services':'Browse the clinic’s available services.',
'Settings':'View prototype settings and demo data controls.',
'Chart':'Open this patient’s complete medical chart.',
'Book an appointment':'Choose a service, date, and time to request an appointment.',
'New appointment':'Open the appointment form to choose a patient, service, and schedule.',
'Request appointment':'Submit your appointment request for clinic confirmation.',
'Create appointment':'Save this appointment in the clinic schedule.',
'Confirm':'Confirm this appointment request.',
'Check in':'Mark the patient as arrived and waiting for consultation.',
'Start':'Mark this appointment as an ongoing consultation.',
'Complete':'Mark this consultation appointment as completed.',
'Manage':'Open options to reschedule or cancel this appointment.',
'All dates':'Clear the date filter and show appointments across all dates.',
'View schedule':'Open the full appointment schedule.',
'Cancel':'Close this form without submitting changes.',
'Close':'Close this window and return to the previous screen.',
'Log out':'End this account’s session and return to the login page.',
'Save draft':'Save an editable draft without submitting it for signature.',
'Send for review':'Save this record and send it to the doctor for review and signature.',
'Sign record':'Sign and lock this clinical record. Later corrections require an amendment.',
'Review & sign':'Open this clinical record for the doctor to review before signing.',
'Release to patient':'Make this signed record visible in the patient’s account.',
'Share instructions':'Make these follow-up instructions visible in the patient’s account.',
'Print prescription':'Open a printable version of this prescription.',
'Add amendment':'Record a correction and reason while preserving the original signed record.',
'Save history':'Save this patient’s OB-GYNE history.',
'Save record':'Save the information entered in this record.',
'Mark completed':'Mark this follow-up as completed after confirmation.',
'Create booking request':'Create an appointment request linked to this follow-up.',
'Book visit':'Choose a schedule for this follow-up and link the appointment.',
'View booking':'Open the appointment schedule for this follow-up.',
'Timeline':'View this patient’s care history in date order.',
'Consultations':'View consultation notes, assessments, and care plans.',
'OB-GYNE history':'View menstrual, gynecologic, medical, and reproductive history.',
'Pregnancy history':'View previous pregnancies and their outcomes.',
'Prenatal visits':'View prenatal assessments and pregnancy monitoring visits.',
'Ultrasound':'View ultrasound reports and findings.',
'Prescriptions':'View medication prescriptions and their signing status.',
'Follow-ups':'View follow-up plans, instructions, and linked appointments.',
'Profile':'View this patient’s contact and personal information.',
'New consultation':'Start a consultation note for this patient.',
'Update history':'Edit this patient’s OB-GYNE history.',
'Update contact':'Edit this patient’s contact information.',
'New patient':'Register a patient in the clinic directory.',
'Reset demo data':'Restore the fictional seed records after confirmation. Existing demo changes will be replaced.'
};
function describe(el){
 const label=(el.textContent||'').replace(/[↗→←◫▦♧✓⌁▤₱✧⚙]/g,'').replace(/\s+/g,' ').trim();
 if(el.dataset.demoRole)return `Automatically log in to the fictional ${el.dataset.demoRole} demo account.`;
 if(el.id==='show-password')return `${el.textContent.trim()==='Show'?'Show':'Hide'} the password entered in this form.`;
 if(el.id==='login-tab')return 'Switch to the login form for an existing account.';
 if(el.id==='register-tab')return 'Switch to the patient registration form to create a local account.';
 if(el.id==='auth-submit')return label.startsWith('Create')?'Create your local patient account using the details entered.':'Log in using the email address and password entered.';
 if(el.matches('.service-choice'))return `Select ${label} for this appointment.`;
 if(el.tagName==='SUMMARY'){
  if(el.id==='service-picker-trigger')return 'Open or close the service list, then choose a service within a group.';
  if(el.closest('.service-group'))return `${el.parentElement.open?'Collapse':'Expand'} this service group. Select an individual service to book.`;
  return `${el.parentElement.open?'Hide':'Read'} the answer to this question.`;
 }
 if(el.dataset.service)return `Start an appointment request for ${el.dataset.service}. Log in or create an account to continue.`;
 const action=el.getAttribute('onclick')||'';
 if(/viewDoc/.test(action))return 'Open this document to read its contents.';
 if(/openChart/.test(action))return descriptions.Chart;
 if(/editChartEntry/.test(action))return `${/^(View|Open)$/.test(label)?'Open':'Create or edit'} this ${el.closest('section')?.querySelector('h2')?.textContent?.toLowerCase()||'clinical record'}.`;
 if(action.includes('pendingAction'))return 'Confirm the action described in this dialog.';
 if(action.includes("filter="))return label==='All'?'Show services from every category.':`Show only ${label.toLowerCase()} services.`;
 if(descriptions[label])return descriptions[label];
 if(el.tagName==='A'){
  const href=el.getAttribute('href');
  if(href.includes('mode=staff'))return 'Open the login form and demo account details for clinic staff.';
  if(href.includes('account.html'))return href.includes('register')?'Open patient registration to create an account.':'Open the account page to log in or create a patient account.';
  if(href.includes('clinic.html'))return 'Open your clinic workspace. Log in first if you are signed out.';
  if(href.includes('index.html')||href==='#home')return 'Return to the WOMBS website home page.';
  if(href.startsWith('#'))return `Go to the ${label.toLowerCase()} section of this page.`;
  if(href.startsWith('tel:'))return 'Open your phone app to call the clinic.';
  if(href.startsWith('mailto:'))return 'Open your email app to contact the clinic.';
 }
 if(/^Save/.test(label))return `Save the ${label.replace(/^Save\s*/,'').toLowerCase()||'information entered in this form'}.`;
 if(/^Add |^New |^Create |^Record |^Upload /.test(label))return `Open or submit the form to ${label.charAt(0).toLowerCase()+label.slice(1)}.`;
 if(/cancel.*appointment/i.test(label))return 'Cancel this appointment after confirmation.';
 if(/reschedule/i.test(label))return 'Choose a new date and time for this appointment.';
 if(/sign/i.test(label))return 'Review and sign this clinical record, locking its original contents.';
 if(/^Print/.test(label))return 'Open this document in a printable format.';
 if(/^(Open|View|Edit|Review)$/.test(label)){
  const context=el.closest('tr,.row,section')?.querySelector('h2,h3,td:nth-child(2)')?.textContent?.trim();
  return `${label} ${context||'the selected record'}${label==='Edit'?' to update its details':''}.`;
 }
 if(el.closest('.tabs'))return `Show the ${label.toLowerCase()} records in this patient chart.`;
 if(el.closest('nav'))return `Open ${label.toLowerCase()}.`;
 if(/confirm|yes|continue/i.test(label))return 'Confirm the action described in this dialog.';
 return `${label}: ${el.type==='submit'?'submit the details entered in this form':'open the related options or information'}.`;
}
let active,tip,timer;
function hide(){clearTimeout(timer);if(active&&tip){const ids=(active.getAttribute('aria-describedby')||'').split(' ').filter(id=>id&&id!==tip.id);if(ids.length)active.setAttribute('aria-describedby',ids.join(' '));else active.removeAttribute('aria-describedby');}tip?.remove();tip=null;active=null;}
function show(el){hide();if(el.disabled)return;active=el;tip=document.createElement('div');tip.id='wombs-demo-tooltip';tip.className='demo-tooltip';tip.setAttribute('role','tooltip');tip.textContent=describe(el);(el.closest('dialog[open]')||document.body).append(tip);el.setAttribute('aria-describedby',`${el.getAttribute('aria-describedby')||''} ${tip.id}`.trim());const r=el.getBoundingClientRect(),t=tip.getBoundingClientRect();const left=Math.max(8,Math.min(innerWidth-t.width-8,r.left+(r.width-t.width)/2));let top=r.bottom+9;if(top+t.height>innerHeight-8)top=Math.max(8,r.top-t.height-9);tip.style.left=`${left}px`;tip.style.top=`${top}px`;}
document.addEventListener('pointerover',e=>{const el=e.target.closest(selector);if(!el||el.contains(e.relatedTarget))return;clearTimeout(timer);timer=setTimeout(()=>{if(el.isConnected)show(el);},350);});
document.addEventListener('pointerout',e=>{const el=e.target.closest(selector);if(el&&!el.contains(e.relatedTarget))hide();});
document.addEventListener('focusin',e=>{const el=e.target.closest(selector);if(el)show(el);});
document.addEventListener('focusout',hide);
document.addEventListener('click',hide);
document.addEventListener('keydown',e=>{if(e.key==='Escape')hide();});
document.addEventListener('scroll',hide,true);window.addEventListener('resize',hide);
new MutationObserver(()=>{if(active&&!active.isConnected)hide();}).observe(document.body,{childList:true,subtree:true});
})();
