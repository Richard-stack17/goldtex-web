import puppeteer from 'puppeteer-core';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUTPUT = '/Users/jhon151/.gemini/antigravity-ide/brain/d37e78dc-3d71-489d-927e-e7e9bd37d01b/historia_current.png';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 25000 });
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

    const target = document.getElementById('historia');
    if (target) {
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
  await new Promise(r => setTimeout(r, 1500));

  // scroll a little bit down to trigger pinning
  await page.evaluate(() => {
    window.scrollBy(0, 400);
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ path: OUTPUT });
  console.log('Saved historia_current.png');
  await browser.close();
}

main().catch(console.error);
