import {
  ArrowDownTrayIcon,
  ArrowUpRightIcon,
  Bars3Icon,
  CheckIcon,
  ChevronDownIcon,
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
      experience: "体验",
      pricing: "价格",
      faq: "常见问题",
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
      screenLabel: "完全使用 mock 数据的产品画面",
    },
    proof: [
      { value: "6+", label: "音乐源类型" },
      { value: "1", label: "统一曲库体验" },
      { value: "100%", label: "mock 截图内容" },
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
    experience: {
      eyebrow: "A QUIET INTERFACE",
      title: "让界面退后，让音乐靠前",
      subtitle:
        "首页、播放器、歌词与歌单详情均来自 iOS 模拟器，并由本地 WoW mock 服务提供完全虚构的数据。",
      labels: ["首页", "正在播放", "全屏歌词", "歌单详情"],
    },
    pricing: {
      eyebrow: "LAUNCH PLAN",
      title: "先把体验做好，再公布价格",
      subtitle:
        "Aduoer 尚未上架 App Store。正式价格与可用地区会在上线前公布，我们不会在信息不完整时展示虚构套餐。",
      plan: "Aduoer for Apple",
      price: "待公布",
      priceNote: "上线前更新",
      included: "当前计划包含",
      features: [
        "iPhone 与 iPad 原生体验",
        "多音乐源接入与统一曲库",
        "离线下载、歌词与播放队列",
        "持续更新，不设 Android 版本入口",
      ],
      status: "App Store 上线准备中",
    },
    faq: {
      eyebrow: "FAQ",
      title: "你可能想知道",
      items: [
        {
          question: "Aduoer 支持哪些音乐来源？",
          answer:
            "当前项目支持 Wow、Jellyfin、Navidrome、本地文件、WebDAV 与 SMB。不同音乐源的能力会略有差异。",
        },
        {
          question: "可以离线听歌吗？",
          answer:
            "可以。Aduoer 支持下载专辑、歌单与单曲，并提供独立的下载队列和本地内容管理。",
        },
        {
          question: "网站中的歌曲和封面是真的吗？",
          answer:
            "不是。为了避免音乐版权风险，网站中的产品截图全部使用骨架屏、几何封面与 mock 文案，不包含真实歌曲内容。",
        },
        {
          question: "什么时候可以从 App Store 下载？",
          answer:
            "目前还没有确定的上架日期，因此网站不会跳转到无效商店地址。上线后会第一时间更新下载入口。",
        },
        {
          question: "会推出 Android 版本吗？",
          answer:
            "目前没有 Android App，Aduoer 现阶段专注于 Apple 平台，因此页面不展示 Google Play 入口。",
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
      privacy: "隐私政策",
      terms: "服务条款",
      cookies: "Cookie 政策",
      copyright: "Aduoer Music. 保留所有权利。",
    },
  },
  en: {
    nav: {
      product: "Product",
      experience: "Experience",
      pricing: "Pricing",
      faq: "FAQ",
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
      screenLabel: "Product visuals made entirely with mock data",
    },
    proof: [
      { value: "6+", label: "source types" },
      { value: "1", label: "unified library" },
      { value: "100%", label: "mock screenshots" },
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
    experience: {
      eyebrow: "A QUIET INTERFACE",
      title: "The interface steps back. Your music moves forward.",
      subtitle:
        "Home, player, lyrics, and playlist screens come from the iOS Simulator, backed by a local WoW mock service with entirely fictional data.",
      labels: ["Home", "Now Playing", "Full-screen lyrics", "Playlist detail"],
    },
    pricing: {
      eyebrow: "LAUNCH PLAN",
      title: "Experience first. Pricing when it is ready.",
      subtitle:
        "Aduoer is not yet available on the App Store. Final pricing and regions will be published before launch, so there are no invented plans here.",
      plan: "Aduoer for Apple",
      price: "To be announced",
      priceNote: "Updated before launch",
      included: "Planned to include",
      features: [
        "Native iPhone and iPad experience",
        "Multiple sources in one music library",
        "Offline downloads, lyrics, and playback queue",
        "Ongoing updates, with no Android entry point",
      ],
      status: "Preparing for the App Store",
    },
    faq: {
      eyebrow: "FAQ",
      title: "A few useful answers",
      items: [
        {
          question: "Which music sources does Aduoer support?",
          answer:
            "The current project supports Wow, Jellyfin, Navidrome, local files, WebDAV, and SMB. Available features can vary by source.",
        },
        {
          question: "Can I listen offline?",
          answer:
            "Yes. Aduoer can download albums, playlists, and tracks, with a dedicated download queue and local content management.",
        },
        {
          question: "Are the songs and covers on this site real?",
          answer:
            "No. To avoid music copyright risk, every product screenshot uses skeleton states, geometric covers, and mock labels only.",
        },
        {
          question: "When will it be available on the App Store?",
          answer:
            "There is no confirmed release date yet, so the site does not link to an invalid store page. The download entry will be updated at launch.",
        },
        {
          question: "Is there an Android version?",
          answer:
            "There is currently no Android app. Aduoer is focused on Apple platforms, so no Google Play entry is shown.",
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
  assetUrl("screenshots/aduoer-library.png"),
  assetUrl("screenshots/aduoer-player.png"),
  assetUrl("screenshots/aduoer-lyrics.png"),
  assetUrl("screenshots/aduoer-playlist.png"),
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

function AppStoreButton({
  label,
  compact = false,
}: {
  label: string;
  compact?: boolean;
}) {
  return (
    <button
      className={`store-button${compact ? " store-button--compact" : ""}`}
      type="button"
      disabled
      title={label}
    >
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
  const [openFaq, setOpenFaq] = useState<number | null>(0);
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
            <a href="#experience">{t.nav.experience}</a>
            <a href="#pricing">{t.nav.pricing}</a>
            <a href="#faq">{t.nav.faq}</a>
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
            <a href="#experience" onClick={closeMobile}>
              {t.nav.experience}
            </a>
            <a href="#pricing" onClick={closeMobile}>
              {t.nav.pricing}
            </a>
            <a href="#faq" onClick={closeMobile}>
              {t.nav.faq}
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
        <p className="hero__mock-note">
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

      <section className="experience section" id="experience">
        <div className="page-width">
          <div className="section-heading section-heading--light">
            <p className="eyebrow">{t.experience.eyebrow}</p>
            <h2>{t.experience.title}</h2>
            <p>{t.experience.subtitle}</p>
          </div>
          <div className="experience__stage">
            {screenshots.map((src, index) => (
              <div className="experience-shot" key={src}>
                <span>{t.experience.labels[index]}</span>
                <PhoneShot src={src} label={t.experience.labels[index]} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing section" id="pricing">
        <div className="page-width pricing__layout">
          <div className="section-copy section-copy--light">
            <p className="eyebrow">{t.pricing.eyebrow}</p>
            <h2>{t.pricing.title}</h2>
            <p>{t.pricing.subtitle}</p>
          </div>

          <article className="price-panel">
            <div className="price-panel__header">
              <div>
                <span>{t.pricing.plan}</span>
                <strong>{t.pricing.price}</strong>
              </div>
              <img src={assetUrl("app-icon.png")} alt="" />
            </div>
            <p className="price-panel__note">{t.pricing.priceNote}</p>
            <div className="price-panel__body">
              <span>{t.pricing.included}</span>
              <ul>
                {t.pricing.features.map((feature) => (
                  <li key={feature}>
                    <CheckIcon aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <AppStoreButton label={t.pricing.status} compact />
          </article>
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="page-width faq__layout">
          <div className="section-copy">
            <p className="eyebrow">{t.faq.eyebrow}</p>
            <h2>{t.faq.title}</h2>
          </div>
          <div className="faq-list">
            {t.faq.items.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <article className="faq-item" key={item.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item.question}</strong>
                    <ChevronDownIcon aria-hidden="true" />
                  </button>
                  {isOpen && <p>{item.answer}</p>}
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
            <a href="#experience">{t.nav.experience}</a>
            <a href="#pricing">{t.nav.pricing}</a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <div className="footer__column">
            <strong>{t.footer.legal}</strong>
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
