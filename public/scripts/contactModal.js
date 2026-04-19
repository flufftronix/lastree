// Modal functionality
(function() {
  // Wait for DOM to be ready
  function init() {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const modalHeader = document.getElementById('modalHeader');
    const closeBtn = document.getElementById('closeModal');
    const form = document.querySelector('#modal form');
    const formContainer = document.getElementById('formContainer');
    const successPanel = document.getElementById('successPanel');
    
    let autoCloseTimeout;

    function resetModalToFormState() {
      if (autoCloseTimeout) clearTimeout(autoCloseTimeout);
      if (form) form.reset();
      
      if (modalHeader) {
        modalHeader.style.opacity = '';
        modalHeader.classList.remove('opacity-0', 'hidden');
      }
      
      if (formContainer) {
        formContainer.classList.remove('hidden');
        formContainer.style.opacity = '';
        formContainer.classList.remove('opacity-0');
      }
      
      if (successPanel) {
        successPanel.classList.add('hidden');
        successPanel.style.opacity = '';
        successPanel.classList.remove('opacity-100', 'opacity-0');
      }
    }

    window.openModal = function() {
      resetModalToFormState();
      if (!modal) return;
      
      modal.classList.remove('pointer-events-none');
      
      requestAnimationFrame(() => {
        modal.classList.remove('opacity-0', 'bg-black/0');
        modal.classList.add('opacity-100', 'bg-black/60');
        if (modalContent) {
          modalContent.classList.remove('scale-95', 'opacity-0');
          modalContent.classList.add('scale-100', 'opacity-100');
        }
      });
    }

    function closeModal() {
      if (autoCloseTimeout) clearTimeout(autoCloseTimeout);
      if (!modal) return;
      
      modal.classList.remove('opacity-100', 'bg-black/60');
      modal.classList.add('opacity-0', 'bg-black/0');
      if (modalContent) {
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
      }
      
      setTimeout(() => {
        modal.classList.add('pointer-events-none');
        resetModalToFormState();
      }, 300);
    }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get the name value from the form
        const nameInput = form.querySelector('input[name="name"]');
        const nameValue = nameInput ? nameInput.value.trim() : 'Someone';
        
        // Set the subject field dynamically with domain prefix
        const subjectField = form.querySelector('input[name="subject"]');
        if (subjectField) {
          const domain = window.location.hostname;
          subjectField.value = `[${domain}] New message from ${nameValue}`;
        }
        
        const data = new FormData(form);

        try {
          const res = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(data).toString(),
          });

          if (res.ok) {
            if (modalHeader) modalHeader.style.opacity = '0';
            if (formContainer) formContainer.style.opacity = '0';

            setTimeout(() => {
              if (modalHeader) modalHeader.classList.add('hidden');
              if (formContainer) formContainer.classList.add('hidden');
              
              if (successPanel) {
                successPanel.classList.remove('hidden');
                successPanel.style.opacity = '0';
              }
              
              requestAnimationFrame(() => {
                if (successPanel) successPanel.style.opacity = '1';
              });

              autoCloseTimeout = setTimeout(() => {
                closeModal();
              }, 2500);
            }, 200);
          } else {
            throw new Error("Failed");
          }
        } catch (err) {
          alert("Something went wrong. Try again.");
        }
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();