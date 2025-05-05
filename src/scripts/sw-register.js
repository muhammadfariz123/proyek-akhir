const publicVapidKey = 'BC50Uxr2pmV5IjEXyL5XQ-OVoWarCVVkNehvA1xCDALad38bjxo2YIYNkn8QZXXczoyTJT7OsTcwdzYeKpae3eM'; // Ganti sesuai kebutuhan

async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.register('/service-worker.js');
    
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    console.log('Push subscription:', JSON.stringify(subscription));
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default registerServiceWorker;
