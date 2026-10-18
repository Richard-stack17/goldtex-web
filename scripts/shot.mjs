import puppeteer from 'puppeteer-core';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUTPUT = '/Users/jhon151/.gemini/antigravity-ide/brain/30c2b649-194f-4646-85a9-4480ca392ef6/current_view.png';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 20000 });
  await page.evaluate(() => {
    const btn = document.getElementById('skip-intro-btn');
    if (btn) btn.click();
    const curtain = document.getElementById('cinematic-curtain');
    if (curtain) {
      curtain.style.display = 'none';
      curtain.style.opacity = '0';
    }
    document.body.classList.remove('intro-locked');
    document.documentElement.classList.remove('intro-locked');

    const target = document.getElementById('ev4-contexto');
    if (target) {
      target.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: OUTPUT });
  console.log('Saved current_view.png');
  await browser.close();
}

main().catch(console.error);
