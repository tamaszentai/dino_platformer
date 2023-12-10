import { exec } from 'child_process';
function openBrowser(url) {
    const command = (process.platform === 'win32') ? 'start' : (process.platform === 'darwin' ? 'open' : 'xdg-open');
    exec(`${command} ${url}`, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        if (stderr) {
            console.error(stderr);
            return;
        }
        console.log(stdout);
    });
}

openBrowser('http://127.0.0.1:8080');
