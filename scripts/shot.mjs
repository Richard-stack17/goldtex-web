import puppeteer from 'puppeteer-core';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_MOBILE = '/Users/jhon151/.gemini/antigravity-ide/brain/30c2b649-194f-4646-85a9-4480ca392ef6/ev4_mobile.png';
const OUT_TABLET = '/Users/jhon151/.gemini/antigravity-ide/brain/30c2b649-194f-4646-85a9-4480ca392ef6/ev4_tablet.png';

async function testViewport(w, h, outPath) {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
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

    const target = document.getElementById('ev4-contexto');
    if (target) {
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({ path: outPath });
  console.log(`Saved ${outPath}`);
  await browser.close();
}

async function main() {
  await testViewport(390, 844, OUT_MOBILE);
  await testViewport(768, 1024, OUT_TABLET);
}

main().catch(console.error);
