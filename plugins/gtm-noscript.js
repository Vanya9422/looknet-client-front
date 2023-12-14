export default ({ app }) => {
    if (process.client) {
        const noscript = document.createElement('noscript');

        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', 'https://www.googletagmanager.com/ns.html?id=GTM-MMKSW4HS');
        iframe.setAttribute('height', '0');
        iframe.setAttribute('width', '0');
        iframe.style.display = 'none';
        iframe.style.visibility = 'hidden';

        noscript.appendChild(iframe);

        document.body.prepend(noscript);
    }
};
