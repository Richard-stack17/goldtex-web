import puppeteer from 'puppeteer-core';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUTPUT = '/Users/jhon151/.gemini/antigravity-ide/brain/4dd8a7c1-594c-480c-a17b-61f7d9d0ebf4/key_visual_stage.png';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3006', { waitUntil: 'networkidle0', timeout: 30000 });
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

    const target = document.querySelector('.diorama-stage-wrapper');
    if (target) {
      target.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  });
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({ path: OUTPUT });
  console.log('Saved key_visual_stage.png');
  await browser.close();
}

main().catch(console.error);
