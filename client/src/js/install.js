// Get a reference to the "Install" button element and assign it to the variable butInstall.
const butInstall = document.getElementById("buttonInstall");

// Listen for the 'beforeinstallprompt' event, which is triggered when a PWA installation is possible.
window.addEventListener('beforeinstallprompt', (event) => {

    // Store the event object for later use.
    window.deferredPrompt = event;

    // Display the "Install" button by removing the 'hidden' class.
    butInstall.classList.toggle('hidden', false);
});

// Listen for a click event on the "Install" button.
butInstall.addEventListener('click', async () => {
  
  // Retrieve the stored 'beforeinstallprompt' event object.
  const promptEvent = window.deferredPrompt;

  // If the event object doesn't exist, do nothing and return.
  if (!promptEvent) {
    return;
  }

  // Trigger the installation prompt for the Progressive Web App.
  promptEvent.prompt();
  
  // Reset the deferred prompt variable to null as it can only be used once.
  window.deferredPrompt = null;
  
  // Hide the "Install" button by adding the 'hidden' class.
  butInstall.classList.toggle('hidden', true);
});

// Listen for the 'appinstalled' event, indicating that the app has been successfully installed.
window.addEventListener('appinstalled', (event) => {

  // Clear the stored deferred prompt to prevent further installations.
  window.deferredPrompt = null;
});
