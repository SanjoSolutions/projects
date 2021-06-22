import { createPageWithHTML } from "../../../lib/createPageWithHTML.js";

export async function createFlatOfferElement(browser) {
  const page = await createPageWithHTML(
    browser,
    `
    <article class="article-list__item article-list__item--immosearch">
      <a target="_blank" href="/de/properties/1400-40137-0270">
        <div class="article-list__image">
          <div class="ratio-edison">
            <noscript>
              <img alt="/images/properties/thumbs/135x101/00056400/00056576.jpg" src="https://assets.degewo.de/images//images/properties/thumbs/135x101/00056400/00056576.jpg" />
            </noscript>
            <img class="lazyautosizes lazyloaded" srcset="/images/properties/thumbs/135x101/00056400/00056576.jpg 135w, /images/properties/full/760x570/00056400/00056576.jpg 760w" data-srcset="/images/properties/thumbs/135x101/00056400/00056576.jpg 135w, /images/properties/full/760x570/00056400/00056576.jpg 760w" data-sizes="auto" sizes="auto">
          </div>
        </div>
        <div class="article-list__content article-list__content--with-image">
          <div class="merken merken__article-list js-merken" data-objectid="1400-40137-0270">
            <div class="span btn__text merken__label">Merken</div>
          </div>
          <span class="article__meta">Alfred-Döblin-Straße 10 | Marzahn-Hellersdorf</span>
          <h2 class="article__title">Meine erste Wohnung!</h2>
          <ul class="article__tags">
            <li class="article__tags-item">Aufzug</li>
            <li class="article__tags-item">gefliestes Bad</li>
            <li class="article__tags-item">Fernwarmwasserversorgung</li>
            <li class="article__tags-item">Herd</li>
            <li class="article__tags-item">Fern-/Zentralheizung</li>
          </ul>
          <ul class="article__properties">
            <li class="article__properties-item">
              <svg class="symbol">
              <use xlink:href="#i-room"></use>
              </svg>
              
              <span class="text">1 Zimmer</span>
            </li>
            <li class="article__properties-item">
              <svg class="symbol">
              <use xlink:href="#i-squares"></use>
              </svg>
              
              <span class="text">29,5 m²</span>
            </li>
            <li class="article__properties-item">
              <svg class="symbol">
                <use xlink:href="#i-calendar2"></use>
              </svg>
              <span class="text">sofort</span>
            </li>
          </ul>
          <div class="article__price-tag">
            <span class="text">Kaltmiete:</span>
            <span class="price">178,06 €</span>
          </div>
        </div>
      </a>
    </article>
  `
  );
  return await page.$("article");
}
