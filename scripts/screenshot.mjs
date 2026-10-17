import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUTPUT_DIR = '/Users/jhon151/.gemini/antigravity-ide/brain/e4d60a2b-0eca-4502-8473-58038f32b561';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 600));

  // Dismiss intro curtain completely
  await page.evaluate(() => {
    const btn = document.getElementById('skip-intro-btn');
    if (btn) btn.click();
    const curtain = document.getElementById('cinematic-curtain');
    if (curtain) {
      curtain.style.display = 'none';
      curtain.style.opacity = '0';
      curtain.style.pointerEvents = 'none';
    }
    const introVid = document.getElementById('intro-brand-video');
    if (introVid) introVid.pause();
    document.body.classList.remove('intro-locked');
    document.documentElement.classList.remove('intro-locked');
  });
  await new Promise(r => setTimeout(r, 1200));

  const sections = [
    { id: 'hero-section', name: '01_hero' },
    { id: 'evidencia-1', name: '02_evidencia1' },
    { id: 'evidencia-2', name: '03_evidencia2' },
    { id: 'evidencia-3', name: '04_evidencia3' },
    { id: 'evidencia-4', name: '05_evidencia4' },
    { id: 'decoracion-tendencias', name: '06_decoracion' },
    { id: 'experience-configurator', name: '07_configurator' },
    { id: 'audiovisual', name: '08_audiovisual' },
    { id: 'equipo', name: '09_equipo' },
  ];

  for (const s of sections) {
    await page.evaluate((targetId) => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    }, s.id);
    await new Promise(r => setTimeout(r, 800));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `screen_${s.name}.png`) });
    console.log(`Captured ${s.name}`);
  }

  await browser.close();
  console.log('All section screenshots captured successfully!');
}

main().catch(err => {
  console.error('Puppeteer error:', err);
  process.exit(1);
});
