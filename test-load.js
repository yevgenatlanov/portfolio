const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Check scroll position
  const scrollY = await page.evaluate(() => window.scrollY);
  console.log('scrollY:', scrollY);
  
  // Check if intro sections are visible
  const lightIntro = await page.$('#sect-intro');
  const darkIntro = await page.$('#sect-intro-dark');
  console.log('light intro exists:', !!lightIntro);
  console.log('dark intro exists:', !!darkIntro);
  
  // Check bounding boxes
  if (lightIntro) {
    const box = await lightIntro.boundingBox();
    console.log('light intro box:', box);
  }
  if (darkIntro) {
    const box = await darkIntro.boundingBox();
    console.log('dark intro box:', box);
  }
  
  // Check transforms
  const leftTransform = await page.evaluate(() => {
    const el = document.querySelector('.panel-light .panel-inner');
    return el ? window.getComputedStyle(el).transform : 'not found';
  });
  const rightTransform = await page.evaluate(() => {
    const el = document.querySelector('.panel-dark .panel-inner-desktop');
    return el ? window.getComputedStyle(el).transform : 'not found';
  });
  console.log('left transform:', leftTransform);
  console.log('right transform:', rightTransform);
  
  // Check for console errors
  const logs = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      logs.push(msg.text());
    }
  });
  
  await page.waitForTimeout(1000);
  console.log('console errors:', logs);
  
  await browser.close();
})();
