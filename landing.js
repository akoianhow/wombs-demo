for(const button of document.querySelectorAll('[data-service]'))button.addEventListener('click',()=>{location.href='clinic.html?book='+encodeURIComponent(button.dataset.service)});
