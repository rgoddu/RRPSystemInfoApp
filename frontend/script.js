function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = 2; // decimal points
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

window.onload = async function() {
    try {
        const response = await fetch('/api/system-info'); // Make an API request to get system info
        const data = await response.json();  // Parse the JSON response
        console.log(data)
        const systemInfoDiv = document.getElementById('systemInfo');
        
        // Create content for the system information
        systemInfoDiv.innerHTML = `
            <div class="info">
                <strong>Hostname:</strong> ${data.hostname}
            </div>
            <div class="info">
                <strong>Platform:</strong> ${data.platform}
            </div>
            <div class="info">
                <strong>Architecture:</strong> ${data.architecture}
            </div>
            <div class="info">
                <strong>CPU:</strong> ${data.cpu[0].model}
            </div>
            <div class="info">
                <strong>CPU Temperature:</strong> ${data.temperature ? data.temperature + ' °F' : 'N/A'}
            </div>
            <div class="info">
                <strong>Total Memory:</strong> ${formatBytes(data.memory.total)}
            </div>
            <div class="info">
                <strong>Free Memory:</strong> ${formatBytes(data.memory.free)}
            </div>
            <div class="info">
                <strong>Used Memory:</strong> ${formatBytes(data.memory.used)}
            </div>
            <div class="info">
                <strong><a href=https://github.com/rgoddu/RRPSystemInfoApp>Check out the code<a></strong>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching system info:', error);
    }
};