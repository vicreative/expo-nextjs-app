import env from 'app/config/env';

export default function postCrossDomainMessage(msg) {
  let win = document.getElementById('ifr').contentWindow;
  win.postMessage(msg, env.WEBSITE_URL);
}
