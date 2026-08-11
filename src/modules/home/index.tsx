import {
  ArrowDownTrayIcon,
  ArrowUpRightIcon,
  Bars3Icon,
  CheckIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  MicrophoneIcon,
  MusicalNoteIcon,
  ServerStackIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import "devices.css/dist/devices.css";

type Language = "zh" | "en";

const GITHUB_URL = "https://github.com/Aduoer-Music";
const BASE_URL = import.meta.env.BASE_URL;
const normalizedBaseUrl = `${BASE_URL.replace(/\/+$/, "")}/`;
const assetUrl = (path: string) =>
  `${normalizedBaseUrl}${path.replace(/^\/+/, "")}`;

const content = {
  zh: {
    nav: {
      product: "产品",
      github: "GitHub",
    },
    hero: {
      eyebrow: "你的音乐，由你掌控",
      title: "听见你的每一种声音",
      subtitle:
        "Aduoer 把在线服务、自建媒体库与本地文件带进同一个原生播放器。发现、收藏、下载、听歌词，从此不必在多个 App 之间来回切换。",
      pending: "App Store 上线准备中",
      openSource: "在 GitHub 了解项目",
      note: "专为 Apple 平台打造 · 暂无 Android 版本",
      screenLabel: "Aduoer Music iOS 产品界面",
    },
    proof: [
      { value: "6+", label: "音乐源类型" },
      { value: "1", label: "统一曲库体验" },
      { value: "iOS", label: "原生播放器体验" },
    ],
    origins: {
      eyebrow: "ONE LIBRARY",
      title: "音乐散落各处，体验只需一个",
      subtitle:
        "从在线推荐到自建曲库，再到家中 NAS 与设备本地文件，Aduoer 用一致的浏览、搜索和播放体验连接你的全部音乐。",
      items: ["Wow", "Jellyfin", "Navidrome", "WebDAV", "SMB", "本地文件"],
    },
    features: {
      eyebrow: "BUILT FOR LISTENING",
      title: "播放器该做的，安静而完整",
      subtitle:
        "没有多余的信息流，也不替你决定要听什么。Aduoer 只把音乐整理好，让每一次播放自然发生。",
      cards: [
        {
          title: "多源统一曲库",
          text: "切换不同音乐源，仍然使用熟悉的专辑、歌手、歌单与搜索体验。",
        },
        {
          title: "离线也能继续",
          text: "下载专辑、歌单或单曲，管理下载队列，在没有网络时照常播放。",
        },
        {
          title: "歌词与演唱模式",
          text: "支持时间同步歌词，并在服务可用时进入演唱模式，单独调节人声。",
        },
        {
          title: "原生 Apple 体验",
          text: "为 iPhone 与 iPad 设计，并支持 Siri、Spotlight 与系统播放控制。",
        },
      ],
    },
    closing: {
      eyebrow: "ADUOER",
      title: "把音乐带回来，放在你手里",
      subtitle: "产品仍在持续开发。你可以在 GitHub 查看项目进展。",
      action: "前往 GitHub",
    },
    footer: {
      tagline: "为自己的音乐而做。",
      product: "产品",
      legal: "法律",
      support: "用户支持",
      privacy: "隐私政策",
      terms: "服务条款",
      cookies: "Cookie 政策",
      copyright: "Aduoer Music. 保留所有权利。",
    },
  },
  en: {
    nav: {
      product: "Product",
      github: "GitHub",
    },
    hero: {
      eyebrow: "YOUR MUSIC, YOUR WAY",
      title: "Hear every side of your music",
      subtitle:
        "Aduoer brings online services, self-hosted libraries, and local files into one native player. Discover, save, download, and follow the lyrics without jumping between apps.",
      pending: "Preparing for the App Store",
      openSource: "Explore the project on GitHub",
      note: "Built for Apple platforms · No Android version",
      screenLabel: "Aduoer Music for iOS",
    },
    proof: [
      { value: "6+", label: "source types" },
      { value: "1", label: "unified library" },
      { value: "iOS", label: "native player experience" },
    ],
    origins: {
      eyebrow: "ONE LIBRARY",
      title: "Your music lives everywhere. Your experience should not.",
      subtitle:
        "From online discovery and self-hosted libraries to a home NAS and files on your device, Aduoer connects it all through one familiar browsing, search, and playback experience.",
      items: ["Wow", "Jellyfin", "Navidrome", "WebDAV", "SMB", "Local files"],
    },
    features: {
      eyebrow: "BUILT FOR LISTENING",
      title: "Everything a player needs. Nothing in the way.",
      subtitle:
        "No noisy feeds and no algorithm deciding for you. Aduoer organizes your music and lets each listening session unfold naturally.",
      cards: [
        {
          title: "One library, many sources",
          text: "Move between music sources while keeping a familiar album, artist, playlist, and search experience.",
        },
        {
          title: "Keep listening offline",
          text: "Download albums, playlists, or tracks, manage the queue, and play without a network connection.",
        },
        {
          title: "Lyrics and singing mode",
          text: "Follow time-synced lyrics and, when the service is available, enter singing mode with vocal control.",
        },
        {
          title: "Native to Apple",
          text: "Designed for iPhone and iPad, with Siri, Spotlight, and system playback controls.",
        },
      ],
    },
    closing: {
      eyebrow: "ADUOER",
      title: "Bring your music back within reach",
      subtitle:
        "The product is in active development. Follow the work on GitHub.",
      action: "Visit GitHub",
    },
    footer: {
      tagline: "Made for the music you own.",
      product: "Product",
      legal: "Legal",
      support: "Support",
      privacy: "Privacy",
      terms: "Terms",
      cookies: "Cookies",
      copyright: "Aduoer Music. All rights reserved.",
    },
  },
} as const;

const featureIcons = [
  ServerStackIcon,
  ArrowDownTrayIcon,
  MicrophoneIcon,
  DevicePhoneMobileIcon,
];

const screenshots = [
  assetUrl("screenshots/ios-playlist-3.webp"),
  assetUrl("screenshots/ios-player-white.webp"),
  assetUrl("screenshots/ios-player-lyrics.webp"),
];

function LanguageSwitch({
  language,
  onChange,
}: {
  language: Language;
  onChange: (language: Language) => void;
}) {
  return (
    <div className="language-switch" aria-label="Language">
      <GlobeAltIcon aria-hidden="true" />
      <button
        type="button"
        aria-pressed={language === "zh"}
        onClick={() => onChange("zh")}
      >
        中文
      </button>
      <span aria-hidden="true" />
      <button
        type="button"
        aria-pressed={language === "en"}
        onClick={() => onChange("en")}
      >
        EN
      </button>
    </div>
  );
}

function AppStoreButton({ label }: { label: string }) {
  return (
    <button className="store-button" type="button" disabled title={label}>
      <ClockIcon aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

function PhoneShot({
  src,
  label,
  className = "",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  return (
    <figure className={`phone-shot ${className}`}>
      <div className="device device-iphone-14-pro" aria-hidden={!label}>
        <div className="device-frame">
          <img
            className="device-screen"
            src={src}
            alt={label}
            loading="eager"
          />
        </div>
        <div className="device-stripe" aria-hidden="true" />
        <div className="device-btns" aria-hidden="true" />
        <div className="device-power" aria-hidden="true" />
      </div>
    </figure>
  );
}

function Home() {
  const [language, setLanguage] = useState<Language>("zh");
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = content[language];

  useEffect(() => {
    const saved = window.localStorage.getItem("aduoer-language");
    const detected: Language =
      saved === "zh" || saved === "en"
        ? saved
        : window.navigator.language.toLowerCase().startsWith("zh")
          ? "zh"
          : "en";
    setLanguage(detected);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-Hans" : "en";
    document.title =
      language === "zh"
        ? "Aduoer Music - 听见你的每一种声音"
        : "Aduoer Music - Hear every side of your music";
  }, [language]);

  const changeLanguage = (next: Language) => {
    window.localStorage.setItem("aduoer-language", next);
    setLanguage(next);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <main className="site-shell">
      <header className="site-header">
        <nav className="navbar" aria-label="Primary navigation">
          <a className="brand" href="#top" onClick={closeMobile}>
            <img src={assetUrl("app-icon.png")} alt="" />
            <span>Aduoer</span>
          </a>

          <div className="desktop-nav">
            <a href="#product">{t.nav.product}</a>
          </div>

          <div className="navbar-actions">
            <LanguageSwitch language={language} onChange={changeLanguage} />
            <a
              className="icon-link"
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label={`${t.nav.github} (opens in a new tab)`}
            >
              <ArrowUpRightIcon aria-hidden="true" />
            </a>
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setMobileOpen((current) => !current)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <XMarkIcon aria-hidden="true" />
              ) : (
                <Bars3Icon aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div className="mobile-nav">
            <a href="#product" onClick={closeMobile}>
              {t.nav.product}
            </a>
          </div>
        )}
      </header>

      <section className="hero" id="top">
        <div className="hero__signal" aria-hidden="true">
          {Array.from({ length: 22 }).map((_, index) => (
            <span key={index} />
          ))}
        </div>
        <div className="hero__screens" aria-hidden="true">
          <PhoneShot
            src={screenshots[2]}
            label=""
            className="phone-shot--lyrics"
          />
          <PhoneShot
            src={screenshots[1]}
            label=""
            className="phone-shot--player"
          />
          <PhoneShot
            src={screenshots[0]}
            label=""
            className="phone-shot--library"
          />
        </div>

        <div className="hero__content">
          <p className="eyebrow">
            <SparklesIcon aria-hidden="true" />
            {t.hero.eyebrow}
          </p>
          <h1>{t.hero.title}</h1>
          <p className="hero__subtitle">{t.hero.subtitle}</p>
          <div className="hero__actions">
            <AppStoreButton label={t.hero.pending} />
            <a
              className="text-link"
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
            >
              {t.hero.openSource}
              <ArrowUpRightIcon aria-hidden="true" />
            </a>
          </div>
          <p className="hero__note">
            <span aria-hidden="true" />
            {t.hero.note}
          </p>
        </div>
        <p className="hero__product-note">
          <CheckIcon aria-hidden="true" />
          {t.hero.screenLabel}
        </p>
      </section>

      <section className="proof-strip" aria-label="Product facts">
        <div className="page-width proof-strip__inner">
          {t.proof.map((item) => (
            <div className="proof-item" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
          <div className="proof-wave" aria-hidden="true">
            {Array.from({ length: 34 }).map((_, index) => (
              <i key={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="origins section" id="product">
        <div className="page-width origins__layout">
          <div className="section-copy">
            <p className="eyebrow">{t.origins.eyebrow}</p>
            <h2>{t.origins.title}</h2>
            <p>{t.origins.subtitle}</p>
          </div>
          <div className="origin-map">
            <div className="origin-map__core">
              <img src={assetUrl("app-icon.png")} alt="" />
              <span>Aduoer</span>
            </div>
            <div className="origin-map__list">
              {t.origins.items.map((item, index) => (
                <div className="origin-pill" key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="features section">
        <div className="page-width">
          <div className="section-heading">
            <p className="eyebrow">{t.features.eyebrow}</p>
            <h2>{t.features.title}</h2>
            <p>{t.features.subtitle}</p>
          </div>
          <div className="feature-grid">
            {t.features.cards.map((feature, index) => {
              const Icon = featureIcons[index];
              return (
                <article className="feature-card" key={feature.title}>
                  <div className="feature-card__topline">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="closing__mark" aria-hidden="true">
          <MusicalNoteIcon />
        </div>
        <div className="page-width closing__content">
          <p className="eyebrow">{t.closing.eyebrow}</p>
          <h2>{t.closing.title}</h2>
          <p>{t.closing.subtitle}</p>
          <a
            className="closing__link"
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
          >
            {t.closing.action}
            <ArrowUpRightIcon aria-hidden="true" />
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="page-width footer__grid">
          <div>
            <a className="brand brand--footer" href="#top">
              <img src={assetUrl("app-icon.png")} alt="" />
              <span>Aduoer</span>
            </a>
            <p>{t.footer.tagline}</p>
          </div>
          <div className="footer__column">
            <strong>{t.footer.product}</strong>
            <a href="#product">{t.nav.product}</a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              GitHub
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
          <span className="footer__status">
            <i aria-hidden="true" />
            iOS · iPadOS
          </span>
        </div>
      </footer>
    </main>
  );
}

export default Home;
