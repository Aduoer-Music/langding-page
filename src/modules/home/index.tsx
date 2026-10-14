import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  Bars3Icon,
  CloudIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  FolderIcon,
  LockClosedIcon,
  MicrophoneIcon,
  MoonIcon,
  MusicalNoteIcon,
  ServerStackIcon,
  SunIcon,
  TagIcon,
  TvIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import { APP_STORE_URL, getLocalizedAppStoreUrl } from "../../lib/appStore";
import PhoneDemo from "./PhoneDemo";
import {
  LANGUAGES,
  LANGUAGE_STORAGE_KEY,
  copy,
  detectLanguage,
  isLanguage,
  type Language,
} from "./i18n";

type Theme = "light" | "dark" | "system";
type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const GITHUB_URL = "https://github.com/Aduoer-Music";
const DOCUMENTATION_URL = "https://docs.aduoer.app";
const THEME_STORAGE_KEY = "aduoer-theme";
const BASE_URL = import.meta.env.BASE_URL;
const normalizedBaseUrl = `${BASE_URL.replace(/\/+$/, "")}/`;
const assetUrl = (path: string) =>
  `${normalizedBaseUrl}${path.replace(/^\/+/, "")}`;

const sourceIcons: Icon[] = [
  ServerStackIcon,
  FolderIcon,
  CloudIcon,
  MusicalNoteIcon,
];
const featureIcons: Icon[] = [
  MusicalNoteIcon,
  MicrophoneIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  TagIcon,
  CloudIcon,
];
const deviceIcons: Icon[] = [
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  TvIcon,
  CarIcon,
];

function CarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 11l1.6-4.2A2 2 0 0 1 8.5 5.5h7a2 2 0 0 1 1.9 1.3L19 11" />
      <path d="M3.5 11h17a1.5 1.5 0 0 1 1.5 1.5V17a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1H5.5v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4.5A1.5 1.5 0 0 1 3.5 11z" />
      <path d="M6.5 14h1M16.5 14h1" />
    </svg>
  );
}

function AppleMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.9-3-.8c-1.6 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.8 3-.8s1.8.8 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.5-3.7zM14.1 5.8c.6-.8 1.1-1.9.9-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1.1.1 2.1-.5 2.8-1.3z" />
    </svg>
  );
}

function resolveTheme(theme: Theme): "light" | "dark" {
  if (theme !== "system") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const resolved = resolveTheme(theme);
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta)
    meta.setAttribute("content", resolved === "dark" ? "#0b0f17" : "#f8fafc");
}

function AppStoreLink({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  const [url, setUrl] = useState(APP_STORE_URL);
  useEffect(() => setUrl(getLocalizedAppStoreUrl()), []);
  return (
    <a className={className} href={url} target="_blank" rel="noreferrer">
      <AppleMark />
      <span>{label}</span>
    </a>
  );
}

function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("system");
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = copy[language];

  useEffect(() => {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    const fromQuery = new URLSearchParams(window.location.search).get("lang");
    const detected = isLanguage(fromQuery)
      ? fromQuery
      : isLanguage(saved)
        ? saved
        : detectLanguage(
            window.navigator.languages?.length
              ? window.navigator.languages
              : [window.navigator.language],
          );
    setLanguage(detected);

    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    const initialTheme: Theme =
      savedTheme === "light" || savedTheme === "dark" ? savedTheme : "system";
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  useEffect(() => {
    const entry = LANGUAGES.find((item) => item.code === language);
    document.documentElement.lang = entry?.html ?? "en";
    document.title = t.meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", t.meta.description);
  }, [language, t]);

  useEffect(() => {
    if (theme !== "system") return;
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => applyTheme("system");
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [theme]);

  const changeLanguage = (next: Language) => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    setLanguage(next);
  };

  const changeTheme = (next: Theme) => {
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
    setTheme(next);
    applyTheme(next);
  };

  const closeMobile = () => setMobileOpen(false);

  const navLinks = [
    { href: "#features", label: t.nav.features },
    { href: "#sources", label: t.nav.sources },
    { href: "#devices", label: t.nav.devices },
    { href: DOCUMENTATION_URL, label: t.nav.docs, external: true },
  ];

  const themeOptions: { value: Theme; label: string; Icon: Icon }[] = [
    { value: "system", label: t.nav.themeSystem, Icon: ComputerDesktopIcon },
    { value: "light", label: t.nav.themeLight, Icon: SunIcon },
    { value: "dark", label: t.nav.themeDark, Icon: MoonIcon },
  ];

  const languageSelect = (
    <label className="lang">
      <span className="sr-only">{t.nav.language}</span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3.5 12h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
      <select
        value={language}
        onChange={(event) => changeLanguage(event.target.value as Language)}
      >
        {LANGUAGES.map((item) => (
          <option key={item.code} value={item.code} lang={item.html}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );

  const themeSwitch = (
    <div className="theme" role="group" aria-label={t.nav.theme}>
      {themeOptions.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          aria-pressed={theme === value}
          aria-label={label}
          title={label}
          onClick={() => changeTheme(value)}
        >
          <Icon aria-hidden="true" />
        </button>
      ))}
    </div>
  );

  return (
    <div className="site">
      <div className="site__light" aria-hidden="true" />

      <header className="site-header">
        <nav className="navbar glass" aria-label="Primary">
          <a className="brand" href="#top" onClick={closeMobile}>
            <img src={assetUrl("app-icon.png")} alt="" width={36} height={36} />
            <span>Aduoer</span>
          </a>

          <div className="navbar__links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="navbar__actions">
            {languageSelect}
            {themeSwitch}
            <AppStoreLink
              className="button button--primary button--small navbar__store"
              label={t.nav.download}
            />
            <button
              type="button"
              className="navbar__menu"
              onClick={() => setMobileOpen((current) => !current)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? t.nav.closeMenu : t.nav.menu}
            >
              {mobileOpen ? (
                <XMarkIcon aria-hidden="true" />
              ) : (
                <Bars3Icon aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        <div
          id="mobile-nav"
          className={`mobile-nav glass ${mobileOpen ? "is-open" : ""}`}
          hidden={!mobileOpen}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
          <div className="mobile-nav__row">
            {languageSelect}
            {themeSwitch}
          </div>
          <AppStoreLink
            className="button button--primary"
            label={t.hero.appStore}
          />
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="page-width hero__copy">
            <p className="hero__status">
              <span className="hero__dot" aria-hidden="true" />
              {t.hero.status}
            </p>
            <h1>
              <span>{t.hero.title}</span> <em>{t.hero.titleAccent}</em>
            </h1>
            <p className="hero__subtitle">{t.hero.subtitle}</p>
            <div className="hero__actions">
              <AppStoreLink
                className="button button--primary"
                label={t.hero.appStore}
              />
              <a
                className="button button--glass"
                href={DOCUMENTATION_URL}
                target="_blank"
                rel="noreferrer"
              >
                {t.hero.docs}
              </a>
            </div>
            <ul className="hero__platforms" aria-label={t.footer.platforms}>
              {t.hero.platforms.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="page-width">
            <div className="stage glass">
              <PhoneDemo t={t.demo} assetUrl={assetUrl} />
            </div>
          </div>
        </section>

        <section className="section sources" id="sources">
          <div className="page-width sources__layout">
            <div className="section-copy">
              <p className="section-heading">{t.sources.heading}</p>
              <h2>{t.sources.title}</h2>
              <p>{t.sources.subtitle}</p>
              <p className="sources__keychain">
                <LockClosedIcon aria-hidden="true" />
                {t.sources.keychain}
              </p>
            </div>
            <div className="source-grid">
              {t.sources.groups.map((group, index) => {
                const Icon = sourceIcons[index];
                return (
                  <article
                    className="source-card glass"
                    key={group.title}
                    data-group={index}
                  >
                    <div className="source-card__head">
                      <Icon aria-hidden="true" />
                      <h3>{group.title}</h3>
                    </div>
                    <p>{group.note}</p>
                    {group.items.length > 0 && (
                      <ul className="chips">
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section features" id="features">
          <div className="page-width">
            <div className="section-copy section-copy--center">
              <p className="section-heading">{t.features.heading}</p>
              <h2>{t.features.title}</h2>
              <p>{t.features.subtitle}</p>
            </div>
            <div className="feature-grid">
              {t.features.cards.map((card, index) => {
                const Icon = featureIcons[index];
                return (
                  <article className="feature-card glass" key={card.title}>
                    <span className="feature-card__icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section devices" id="devices">
          <div className="page-width">
            <div className="section-copy section-copy--center">
              <p className="section-heading">{t.devices.heading}</p>
              <h2>{t.devices.title}</h2>
              <p>{t.devices.subtitle}</p>
            </div>
            <div className="devices__layout">
              <figure className="mac-window">
                <img
                  src={assetUrl("screenshots/mac-player.webp")}
                  alt={t.devices.macCaption}
                  width={1600}
                  height={1064}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure className="ipad-frame">
                <img
                  src={assetUrl("screenshots/ipad-player.webp")}
                  alt={t.devices.ipadCaption}
                  width={1600}
                  height={1199}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <ul className="device-list">
                {t.devices.items.map((item, index) => {
                  const Icon = deviceIcons[index];
                  return (
                    <li key={item.name} className="glass">
                      <Icon aria-hidden="true" />
                      <span>
                        <strong>{item.name}</strong>
                        <span>{item.text}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <section className="section privacy">
          <div className="page-width">
            <div className="privacy__card glass">
              <LockClosedIcon aria-hidden="true" />
              <div>
                <h2>{t.privacy.title}</h2>
                <p>{t.privacy.text}</p>
              </div>
              <a
                className="button button--glass"
                href={`${normalizedBaseUrl}privacy-policy`}
              >
                {t.privacy.link}
              </a>
            </div>
          </div>
        </section>

        <section className="section closing">
          <div className="page-width">
            <div className="closing__panel">
              <img
                src={assetUrl("app-icon.png")}
                alt=""
                width={88}
                height={88}
              />
              <h2>{t.closing.title}</h2>
              <p>{t.closing.subtitle}</p>
              <div className="closing__actions">
                <AppStoreLink
                  className="button button--primary"
                  label={t.closing.appStore}
                />
                <a
                  className="button button--glass"
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.closing.github}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="page-width footer__grid">
          <div className="footer__brand">
            <a className="brand" href="#top">
              <img
                src={assetUrl("app-icon.png")}
                alt=""
                width={36}
                height={36}
              />
              <span>Aduoer</span>
            </a>
            <p>{t.footer.tagline}</p>
          </div>
          <div className="footer__column">
            <strong>{t.footer.product}</strong>
            <a href="#features">{t.nav.features}</a>
            <a href="#sources">{t.nav.sources}</a>
            <a href={DOCUMENTATION_URL} target="_blank" rel="noreferrer">
              {t.nav.docs}
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              {t.nav.github}
            </a>
          </div>
          <div className="footer__column">
            <strong>{t.footer.legal}</strong>
            <a href={`${normalizedBaseUrl}support`}>{t.footer.support}</a>
            <a href={`${normalizedBaseUrl}privacy-policy`}>
              {t.footer.privacy}
            </a>
            <a href={`${normalizedBaseUrl}terms-and-conditions`}>
              {t.footer.terms}
            </a>
            <a href={`${normalizedBaseUrl}cookies-policy`}>
              {t.footer.cookies}
            </a>
          </div>
        </div>
        <div className="page-width footer__bottom">
          <span>
            © {new Date().getFullYear()} {t.footer.copyright}
          </span>
          <span>{t.footer.platforms}</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
