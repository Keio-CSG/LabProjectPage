const fs = require('fs');
const matter = require('gray-matter');
const { marked } = require('marked');
const { globSync } = require('glob');

const ICONS = {
  paper: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8.5 15.5h-1v-4h1.3c.8 0 1.2.5 1.2 1.1 0 .7-.5 1.1-1.3 1.1H8.5v1.8zm0-2.6h.2c.3 0 .5-.1.5-.4 0-.3-.2-.4-.5-.4H8.5v.8zm3.5 2.6h-1v-4h1c1.1 0 1.8.7 1.8 2s-.7 2-1.8 2zm0-3.2h-.1v2.4h.1c.5 0 .9-.3.9-1.2 0-.9-.4-1.2-.9-1.2zm3.5 3.2h-1v-4h2.3v.8H15v.9h1.2v.7H15v1.6z"/></svg>`,
  arxiv: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><text x="1" y="17" font-family="serif" font-size="13" font-weight="bold" fill="white">ar</text></svg>`,
  code: `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  project: `<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  slides: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 0 0 0 2h1v11a2 2 0 0 0 2 2h4l-1 2H7a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2h-1l-1-2h4a2 2 0 0 0 2-2V5h1a1 1 0 1 0 0-2H2zm3 2h14v11H5V5z"/></svg>`,
  poster: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-7 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5 12H7v-.5c0-2.5 2.5-4 5-4s5 1.5 5 4V18z"/></svg>`,
  video: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>`,
};

const LINK_LABELS = { paper: 'Paper', arxiv: 'arXiv', code: 'Code', project: 'Project Page', slides: 'Slides', poster: 'Poster', video: 'Video' };
const STATUS_LABELS = { published: 'Published', accepted: 'Accepted', 'under-review': 'Under Review', preprint: 'Preprint' };
const SECTION_ORDER = ['Sensor', 'Circuit'];

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderAuthors(authors) {
  if (!authors || !Array.isArray(authors)) return '';
  return authors.map(a => a.me ? `<strong>${escapeHtml(a.name)}</strong>` : escapeHtml(a.name)).join(', ');
}

function renderTags(tags) {
  if (!tags || !Array.isArray(tags)) return '';
  return tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
}

function renderLinks(links) {
  if (!links || typeof links !== 'object') return '';
  return Object.entries(links)
    .filter(([type]) => LINK_LABELS[type])
    .map(([type, url]) => {
      const label = LINK_LABELS[type];
      const icon = ICONS[type] || '';
      return `<a href="${escapeHtml(url)}" class="link-badge link-${escapeHtml(type)}" target="_blank" rel="noopener" aria-label="${escapeHtml(label)}"><span class="badge-icon">${icon}</span><span class="badge-label">${escapeHtml(label)}</span></a>`;
    }).join('');
}

function renderDescription(content) {
  const html = marked.parse(content.trim());
  return html.replace(/^<p>([\s\S]*?)<\/p>\s*$/, '$1').trim();
}

function buildCard(data, content) {
  const title = data.title || '';
  const shortTitle = data.short_title || title;
  const venue = data.venue || '';
  const venueLower = venue.toLowerCase().replace(/[^a-z0-9]/g, '');
  const year = data.year || '';
  const status = data.status || 'published';
  const statusLabel = STATUS_LABELS[status] || status;
  const teaser = data.teaser || '';
  const tags = data.tags || [];
  const tagsStr = tags.join(', ');
  const authorsHtml = renderAuthors(data.authors);
  const tagsHtml = renderTags(tags);
  const linksHtml = renderLinks(data.links);
  const descHtml = renderDescription(content);
  const descJa = data.description_ja ? `<p class="card-description-ja">${escapeHtml(data.description_ja)}</p>` : '';

  return `<article class="project-card" data-tags="${escapeHtml(tagsStr)}" data-venue="${escapeHtml(venue)}">
  <div class="card-teaser">
    <img src="${escapeHtml(teaser)}" alt="${escapeHtml(title)} teaser" loading="lazy" />
  </div>
  <div class="card-body">
    <div class="card-meta">
      <span class="badge badge-venue badge-${escapeHtml(venueLower)}">${escapeHtml(venue)} ${escapeHtml(String(year))}</span>
      <span class="badge badge-status badge-${escapeHtml(status)}">${escapeHtml(statusLabel)}</span>
    </div>
    <h2 class="card-title">${escapeHtml(shortTitle)}</h2>
    <p class="card-authors">${authorsHtml}</p>
    <p class="card-description">${descHtml}</p>
    ${descJa}
    <div class="card-tags">${tagsHtml}</div>
    <div class="card-links">${linksHtml}</div>
  </div>
</article>`;
}

function buildVenueButtons(projects) {
  // Collect venues in section order to group them naturally
  const seen = new Set();
  const venues = [];
  for (const secName of [...SECTION_ORDER, '__rest__']) {
    for (const p of projects) {
      const v = p.data.venue;
      if (!v || seen.has(v)) continue;
      const sec = p.data.section;
      if (secName === '__rest__' ? !SECTION_ORDER.includes(sec) : sec === secName) {
        seen.add(v);
        venues.push(v);
      }
    }
  }
  const btns = [`<button class="filter-btn active" data-venue="all">All</button>`];
  for (const v of venues) {
    btns.push(`<button class="filter-btn" data-venue="${escapeHtml(v)}">${escapeHtml(v)}</button>`);
  }
  return btns.join('\n    ');
}

function main() {
  const files = globSync('projects/*.md');
  const projects = files.map(file => {
    const raw = fs.readFileSync(file, 'utf8');
    const { data, content } = matter(raw);
    return { data, content };
  });

  projects.sort((a, b) => {
    const ao = a.data.order != null ? a.data.order : Infinity;
    const bo = b.data.order != null ? b.data.order : Infinity;
    if (ao !== bo) return ao - bo;
    return (b.data.year || 0) - (a.data.year || 0);
  });

  // Group by section
  const sections = {};
  const noSection = [];
  for (const p of projects) {
    const sec = p.data.section;
    if (sec) {
      if (!sections[sec]) sections[sec] = [];
      sections[sec].push(p);
    } else {
      noSection.push(p);
    }
  }

  let cardsHtml = '';
  const orderedSections = SECTION_ORDER.filter(s => sections[s]);
  for (const secName of orderedSections) {
    const cards = sections[secName].map(p => buildCard(p.data, p.content)).join('\n');
    cardsHtml += `<section class="project-section" data-section="${escapeHtml(secName)}">
  <h2 class="section-heading">${escapeHtml(secName)}</h2>
  <div class="section-grid">
${cards}
  </div>
</section>\n`;
  }
  for (const secName of Object.keys(sections).filter(s => !SECTION_ORDER.includes(s))) {
    const cards = sections[secName].map(p => buildCard(p.data, p.content)).join('\n');
    cardsHtml += `<section class="project-section" data-section="${escapeHtml(secName)}">
  <h2 class="section-heading">${escapeHtml(secName)}</h2>
  <div class="section-grid">
${cards}
  </div>
</section>\n`;
  }
  if (noSection.length > 0) {
    const cards = noSection.map(p => buildCard(p.data, p.content)).join('\n');
    cardsHtml += `<div class="section-grid">\n${cards}\n</div>\n`;
  }

  const venueButtons = buildVenueButtons(projects);

  let output = fs.readFileSync('template.html', 'utf8');
  output = output.replace('<!--CARDS-->', cardsHtml);
  output = output.replace('<!--VENUE-FILTERS-->', venueButtons);

  fs.writeFileSync('index.html', output, 'utf8');
  console.log(`Built index.html with ${projects.length} projects in ${orderedSections.length} sections.`);
}

main();
