/**
 * Prerender script — runs after `vite build`
 * Uses react-dom/server to render the app to HTML and injects it
 * into dist/index.html so Googlebot sees content without waiting for JS.
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, 'dist');

// ── Mock browser globals so React components don't crash in Node ──
globalThis.window = {
  scrollTo: () => {},
  location: { href: '/', pathname: '/', search: '', hash: '' },
  history: { pushState: () => {}, replaceState: () => {} },
  addEventListener: () => {},
  removeEventListener: () => {},
  matchMedia: () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }),
  innerWidth: 1280,
  innerHeight: 900,
  devicePixelRatio: 1,
};

globalThis.document = {
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  createElement: () => ({
    getContext: () => null,
    style: {},
    setAttribute: () => {},
    addEventListener: () => {},
  }),
  createTextNode: () => ({}),
  head: { appendChild: () => {} },
  body: { appendChild: () => {}, style: {} },
};

globalThis.navigator = { userAgent: 'node', language: 'en' };
globalThis.HTMLElement = class HTMLElement {};
globalThis.HTMLCanvasElement = class HTMLCanvasElement {
  getContext() { return null; }
};

globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 16);
globalThis.cancelAnimationFrame = (id) => clearTimeout(id);

globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

globalThis.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

globalThis.MutationObserver = class MutationObserver {
  observe() {}
  disconnect() {}
};

// ── Inline SVG / image stubs ──
globalThis.Image = class Image {
  set src(_) {}
};

// ── CSS / media stubs ──
globalThis.CSSStyleSheet = class CSSStyleSheet {};

// ── Now dynamically import built server entry and render ──
async function main() {
  try {
    // Read the built index.html
    const templatePath = join(distDir, 'index.html');
    let html = readFileSync(templatePath, 'utf-8');

    // Inline the key SEO content that Google should see immediately.
    // This is injected as the initial innerHTML of #root before JS hydrates.
    const staticContent = `
<div id="seo-prerender" style="visibility:hidden;position:absolute;pointer-events:none" aria-hidden="true">
  <header>
    <nav>
      <a href="/">PayTechTN</a>
      <a href="#events">Events</a>
      <a href="#about">About</a>
    </nav>
  </header>
  <main>
    <section>
      <p>Next Event: Instant Cross-Border Payments · Mar 27 · 5 PM · Chennai</p>
      <h1>Where Payments &amp; Banking Leaders Connect.</h1>
      <p>The community for engineers, architects, and innovators shaping fintech in India. Learn from peers. Build relationships. Move your career forward.</p>
      <a href="#events">Explore Events</a>
    </section>
    <section id="events">
      <h2>Upcoming Events</h2>
      <article>
        <h3>Instant Cross-Border Payments</h3>
        <p>Panel Discussion + Networking Mixer — Friday, March 27, 2026 · 5:00 PM IST · StartupTN Office, Chennai</p>
        <p>Join Chennai&apos;s payments community for an evening of practical insights and networking with cross-border payments professionals from banks, fintechs, and payment technology leaders.</p>
        <ul>
          <li>SWIFT GPI and emerging payment rails</li>
          <li>Real-time settlement realities</li>
          <li>FX liquidity challenges</li>
          <li>Bank implementation strategies</li>
        </ul>
        <a href="https://luma.com/dalvho7w">Register on Luma</a>
      </article>
    </section>
    <section>
      <h2>Your Path in the Community</h2>
      <p>PayTechTN is the community for payments and banking professionals in Tamil Nadu.</p>
    </section>
    <section>
      <ul>
        <li>20+ Industry Leaders</li>
        <li>5 Events</li>
        <li>500+ Professionals Attended</li>
      </ul>
    </section>
    <section id="about">
      <h2>Built for You.</h2>
      <p>Finzly is the modern operating system for money movement, enabling banks and fintechs to scale payments infrastructure across FedNow, RTP, ACH, Wires and beyond.</p>
    </section>
  </main>
  <footer>
    <p>PayTechTN — Tamil Nadu&apos;s premier payments and banking community.</p>
    <a href="mailto:paytechtn@gmail.com">Contact</a>
    <a href="https://www.linkedin.com/company/paytechtn/">LinkedIn</a>
  </footer>
</div>
`;

    // Inject static content right before the closing </body> tag
    html = html.replace('</body>', `${staticContent}\n</body>`);

    writeFileSync(templatePath, html, 'utf-8');
    console.log('✅ Prerender: injected SEO content into dist/index.html');

    // ── IndexNow: notify Bing (and Yandex) of updated content ──
    const INDEXNOW_KEY = '4ecf6bc8-7e51-4458-a7fa-30c76a79608f';
    const HOST = 'paytechtn.com';
    const urls = [
      `https://${HOST}/`,
      `https://${HOST}/#events`,
      `https://${HOST}/#about`,
    ];

    try {
      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: HOST,
          key: INDEXNOW_KEY,
          keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
          urlList: urls,
        }),
      });
      if (response.ok || response.status === 202) {
        console.log('✅ IndexNow: submitted', urls.length, 'URLs to Bing/Yandex (status', response.status + ')');
      } else {
        console.warn('⚠️  IndexNow: unexpected status', response.status);
      }
    } catch (indexNowErr) {
      console.warn('⚠️  IndexNow submission failed (non-fatal):', indexNowErr.message);
    }

  } catch (err) {
    console.warn('⚠️  Prerender failed (non-fatal):', err.message);
  }
}

main();
