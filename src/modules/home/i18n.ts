export type Language = "zh" | "zh-Hant" | "en" | "ja" | "ko" | "de";

export const LANGUAGES: { code: Language; label: string; html: string }[] = [
  { code: "zh", label: "简体中文", html: "zh-Hans" },
  { code: "zh-Hant", label: "繁體中文", html: "zh-Hant" },
  { code: "en", label: "English", html: "en" },
  { code: "ja", label: "日本語", html: "ja" },
  { code: "ko", label: "한국어", html: "ko" },
  { code: "de", label: "Deutsch", html: "de" },
];

export const LANGUAGE_STORAGE_KEY = "aduoer-language";

export function isLanguage(value: unknown): value is Language {
  return LANGUAGES.some((item) => item.code === value);
}

export function detectLanguage(candidates: readonly string[]): Language {
  for (const raw of candidates) {
    const tag = raw.toLowerCase();
    if (tag.startsWith("zh")) {
      return /hant|tw|hk|mo/.test(tag) ? "zh-Hant" : "zh";
    }
    if (tag.startsWith("ja")) return "ja";
    if (tag.startsWith("ko")) return "ko";
    if (tag.startsWith("de")) return "de";
    if (tag.startsWith("en")) return "en";
  }
  return "en";
}

export type SourceGroup = {
  title: string;
  note: string;
  items: string[];
};

export type Copy = {
  meta: { title: string; description: string };
  nav: {
    features: string;
    sources: string;
    devices: string;
    docs: string;
    download: string;
    menu: string;
    closeMenu: string;
    language: string;
    theme: string;
    themeLight: string;
    themeDark: string;
    themeSystem: string;
    github: string;
  };
  hero: {
    status: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    appStore: string;
    docs: string;
    platforms: string[];
  };
  demo: {
    label: string;
    title: string;
    steps: { title: string; text: string }[];
    replay: string;
    reset: string;
    playing: string;
    done: string;
    note: string;
    hotspotMini: string;
    hotspotLyrics: string;
    hotspotSwipe: string;
    collapse: string;
  };
  sources: {
    heading: string;
    title: string;
    subtitle: string;
    groups: SourceGroup[];
    keychain: string;
  };
  features: {
    heading: string;
    title: string;
    subtitle: string;
    cards: { title: string; text: string }[];
  };
  devices: {
    heading: string;
    title: string;
    subtitle: string;
    items: { name: string; text: string }[];
    macCaption: string;
    ipadCaption: string;
  };
  privacy: {
    title: string;
    text: string;
    link: string;
  };
  closing: {
    title: string;
    subtitle: string;
    appStore: string;
    github: string;
  };
  footer: {
    tagline: string;
    product: string;
    legal: string;
    support: string;
    privacy: string;
    terms: string;
    cookies: string;
    copyright: string;
    platforms: string;
  };
};

const en: Copy = {
  meta: {
    title: "Aduoer Music – One player for all the music you own",
    description:
      "Aduoer brings Wow sources, Jellyfin, Navidrome, Plex, NAS folders, cloud drives and local files into one native player for iPhone, iPad, Mac and Apple TV.",
  },
  nav: {
    features: "Features",
    sources: "Sources",
    devices: "Devices",
    docs: "Docs",
    download: "App Store",
    menu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    theme: "Appearance",
    themeLight: "Light",
    themeDark: "Dark",
    themeSystem: "System",
    github: "GitHub",
  },
  hero: {
    status: "On the App Store for iPhone, iPad, Mac and Apple TV",
    title: "One player for all the",
    titleAccent: "music you own.",
    subtitle:
      "Aduoer connects Wow sources, media servers like Jellyfin and Navidrome, NAS folders and cloud drives into a single native player. Synced lyrics, downloads, Siri and CarPlay come built in.",
    appStore: "Download on the App Store",
    docs: "Read the docs",
    platforms: ["iPhone", "iPad", "Mac", "Apple TV", "CarPlay"],
  },
  demo: {
    label: "Interactive preview",
    title: "Try the player",
    steps: [
      {
        title: "Tap the mini player",
        text: "The now-playing sheet rises from the bottom, exactly as it does in the app.",
      },
      {
        title: "Tap the lyrics button",
        text: "The artwork tucks into the corner and synced lyrics fill the page.",
      },
      {
        title: "Swipe down to close",
        text: "Drag the sheet down on either page to return to the library.",
      },
    ],
    replay: "Play the tour",
    reset: "Start over",
    playing: "Playing…",
    done: "That is the whole flow. Try it yourself or play it again.",
    note: "Screens captured from Aduoer for iPhone.",
    hotspotMini: "Open the player",
    hotspotLyrics: "Show lyrics",
    hotspotSwipe: "Swipe down",
    collapse: "Close the player",
  },
  sources: {
    heading: "Sources",
    title: "Fourteen kinds of sources. One familiar library.",
    subtitle:
      "Add as many sources as you like. Albums, artists, playlists and search work the same way on every one of them, and you can merge them into a single aggregated library.",
    groups: [
      {
        title: "Media servers",
        note: "Streams straight from the server you already run.",
        items: [
          "Wow",
          "Jellyfin",
          "Emby",
          "Navidrome",
          "Subsonic",
          "Plex",
          "fnOS",
        ],
      },
      {
        title: "Files and NAS",
        note: "Scans folders, reads tags and matches missing metadata.",
        items: ["Local files", "WebDAV", "SMB"],
      },
      {
        title: "Cloud drives",
        note: "Signs in with the official login and reads only the folder you pick.",
        items: ["Baidu Netdisk", "OneDrive", "Google Drive"],
      },
      {
        title: "Apple Music",
        note: "Plays your Apple Music library on iPhone and iPad.",
        items: [],
      },
    ],
    keychain:
      "Passwords and tokens are stored in the system Keychain on your device. Aduoer never stores your credentials.",
  },
  features: {
    heading: "Features",
    title: "Everything a player should do, done quietly.",
    subtitle:
      "No feed, no ads and nothing deciding for you. Aduoer organizes the music you already have and gets out of the way.",
    cards: [
      {
        title: "Synced lyrics",
        text: "Line-by-line and word-by-word lyrics in a full-screen page that keeps pace with the song.",
      },
      {
        title: "All your sources, together",
        text: "Add as many sources as you like and switch between them in one tap, or turn on the aggregated library to search every source at once and mix their songs into your favourites and playlists.",
      },
      {
        title: "Offline downloads",
        text: "Download tracks, albums or whole playlists, manage the queue and keep listening with no connection.",
      },
      {
        title: "Singing mode (Karaoke)",
        text: "Separate vocals and accompaniment on your device, adjust the vocal volume and sing along to your favourite songs.",
      },
      {
        title: "Metadata matching",
        text: "Fill in missing tags, covers and lyrics for your files, and write them back to the file when you choose.",
      },
      {
        title: "iCloud, Siri and CarPlay",
        text: "Sources, favourites and playlists sync through your private iCloud. Ask Siri to play, build Shortcuts and keep browsing in the car.",
      },
    ],
  },
  devices: {
    heading: "Devices",
    title: "Native on every Apple screen.",
    subtitle:
      "Built with SwiftUI for iPhone, iPad, Mac and Apple TV, with CarPlay for the road. Each device gets its own layout instead of a stretched phone app.",
    items: [
      { name: "iPhone and iPad", text: "iOS and iPadOS 17 or later" },
      { name: "Mac", text: "macOS 14 or later, as a native Mac app" },
      { name: "Apple TV", text: "tvOS 17 or later, with Top Shelf" },
      { name: "CarPlay", text: "Now Playing, favourites, playlists and queue" },
    ],
    macCaption: "Aduoer for Mac, now playing with lyrics",
    ipadCaption: "Aduoer for iPad, now playing",
  },
  privacy: {
    title: "Private by design",
    text: "Your library, play history and credentials stay on your device. There is no Aduoer account, no advertising and no cross-app tracking.",
    link: "Read the privacy policy",
  },
  closing: {
    title: "Bring your libraries together.",
    subtitle:
      "Free to download. Aduoer is in active development and the project is open on GitHub.",
    appStore: "Download on the App Store",
    github: "Follow on GitHub",
  },
  footer: {
    tagline: "Made for the music you own.",
    product: "Product",
    legal: "Legal",
    support: "Support",
    privacy: "Privacy policy",
    terms: "Terms of service",
    cookies: "Cookie policy",
    copyright: "Aduoer Music. All rights reserved.",
    platforms: "iPhone, iPad, Mac, Apple TV and CarPlay",
  },
};

const zh: Copy = {
  meta: {
    title: "Aduoer Music – 你所有的音乐，一个播放器就够了",
    description:
      "Aduoer 把 Wow 源、Jellyfin、Navidrome、Plex、NAS 共享、云盘与本地文件接入同一个原生播放器，支持 iPhone、iPad、Mac 与 Apple TV。",
  },
  nav: {
    features: "功能",
    sources: "音乐源",
    devices: "设备",
    docs: "文档",
    download: "App Store",
    menu: "打开菜单",
    closeMenu: "关闭菜单",
    language: "语言",
    theme: "外观",
    themeLight: "浅色",
    themeDark: "深色",
    themeSystem: "跟随系统",
    github: "GitHub",
  },
  hero: {
    status: "已上架 App Store，支持 iPhone、iPad、Mac 与 Apple TV",
    title: "你所有的音乐，",
    titleAccent: "一个播放器就够了。",
    subtitle:
      "Aduoer 把 Wow 源、Jellyfin 与 Navidrome 等媒体服务器、NAS 共享和云盘接入同一个原生播放器。同步歌词、离线下载、Siri 与 CarPlay 都已内置。",
    appStore: "在 App Store 下载",
    docs: "阅读文档",
    platforms: ["iPhone", "iPad", "Mac", "Apple TV", "CarPlay"],
  },
  demo: {
    label: "可交互预览",
    title: "试试播放器",
    steps: [
      {
        title: "点一下迷你播放器",
        text: "正在播放页会从底部升起，和 App 里的动画完全一致。",
      },
      {
        title: "点一下歌词按钮",
        text: "封面缩进左上角，同步歌词铺满整页。",
      },
      {
        title: "向下滑动收起",
        text: "在封面页或歌词页向下拖动，就能回到曲库。",
      },
    ],
    replay: "自动演示",
    reset: "重新开始",
    playing: "演示中…",
    done: "这就是完整流程。你可以自己再试一遍，或者重新播放。",
    note: "画面取自 iPhone 版 Aduoer。",
    hotspotMini: "打开播放器",
    hotspotLyrics: "显示歌词",
    hotspotSwipe: "向下滑动",
    collapse: "收起播放器",
  },
  sources: {
    heading: "音乐源",
    title: "十四种音乐源，同一套熟悉的曲库。",
    subtitle:
      "想加多少源都可以。专辑、歌手、歌单和搜索在每个源里的用法完全一样，还能把它们合并成一个聚合曲库。",
    groups: [
      {
        title: "媒体服务器",
        note: "直接从你已经在运行的服务器串流。",
        items: [
          "Wow",
          "Jellyfin",
          "Emby",
          "Navidrome",
          "Subsonic",
          "Plex",
          "飞牛 fnOS",
        ],
      },
      {
        title: "文件与 NAS",
        note: "扫描文件夹、读取标签，并自动补全缺失的元数据。",
        items: ["本地文件", "WebDAV", "SMB"],
      },
      {
        title: "云盘",
        note: "通过官方登录授权，只读取你选定的文件夹。",
        items: ["百度网盘", "OneDrive", "Google Drive"],
      },
      {
        title: "Apple Music",
        note: "在 iPhone 和 iPad 上播放你的 Apple Music 资料库。",
        items: [],
      },
    ],
    keychain: "密码与令牌保存在设备的系统钥匙串中，Aduoer 不存储你的任何凭证。",
  },
  features: {
    heading: "功能",
    title: "播放器该做的事，安静地做好。",
    subtitle:
      "没有信息流，没有广告，也不替你做决定。Aduoer 只把你已有的音乐整理好，然后退到一边。",
    cards: [
      {
        title: "同步歌词",
        text: "逐行与逐字歌词，在全屏歌词页里跟着歌曲一起走。",
      },
      {
        title: "多个音乐源，一起听",
        text: "想加多少源都可以，一键切换；开启聚合源后还能一次搜索全部音乐源，把不同源的歌曲放进同一个收藏和歌单。",
      },
      {
        title: "离线下载",
        text: "下载单曲、专辑或整个歌单，管理下载队列，没有网络也照常播放。",
      },
      {
        title: "演唱模式（卡拉 OK）",
        text: "本地分离人声与伴奏，自由调节人声音量，跟着喜欢的歌曲开唱。",
      },
      {
        title: "元数据匹配",
        text: "为你的文件补全标签、封面和歌词，并在你需要时写回原文件。",
      },
      {
        title: "iCloud、Siri 与 CarPlay",
        text: "音乐源、收藏和歌单通过你的私有 iCloud 同步。让 Siri 播放、用快捷指令组合，开车时也能继续浏览。",
      },
    ],
  },
  devices: {
    heading: "设备",
    title: "每一块 Apple 屏幕上，都是原生体验。",
    subtitle:
      "使用 SwiftUI 为 iPhone、iPad、Mac 和 Apple TV 构建，车上还有 CarPlay。每种设备都有自己的布局，而不是被拉伸的手机界面。",
    items: [
      { name: "iPhone 与 iPad", text: "iOS 与 iPadOS 17 及以上" },
      { name: "Mac", text: "macOS 14 及以上，原生 Mac 应用" },
      { name: "Apple TV", text: "tvOS 17 及以上，支持 Top Shelf" },
      { name: "CarPlay", text: "正在播放、收藏、歌单与待播队列" },
    ],
    macCaption: "Mac 版 Aduoer 的播放与歌词页",
    ipadCaption: "iPad 版 Aduoer 的播放页",
  },
  privacy: {
    title: "隐私优先的设计",
    text: "曲库、播放记录和凭据都留在你的设备上。没有 Aduoer 账号，没有广告，也没有跨 App 追踪。",
    link: "阅读隐私政策",
  },
  closing: {
    title: "把散落各处的音乐，收回到一起。",
    subtitle: "免费下载。Aduoer 仍在持续开发，项目在 GitHub 上公开。",
    appStore: "在 App Store 下载",
    github: "在 GitHub 关注",
  },
  footer: {
    tagline: "为你自己的音乐而做。",
    product: "产品",
    legal: "法律",
    support: "用户支持",
    privacy: "隐私政策",
    terms: "服务条款",
    cookies: "Cookie 政策",
    copyright: "Aduoer Music. 保留所有权利。",
    platforms: "iPhone、iPad、Mac、Apple TV 与 CarPlay",
  },
};

const zhHant: Copy = {
  meta: {
    title: "Aduoer Music – 你所有的音樂，一個播放器就夠了",
    description:
      "Aduoer 將 Wow 來源、Jellyfin、Navidrome、Plex、NAS 共享、雲端硬碟與本機檔案接入同一個原生播放器，支援 iPhone、iPad、Mac 與 Apple TV。",
  },
  nav: {
    features: "功能",
    sources: "音樂來源",
    devices: "裝置",
    docs: "文件",
    download: "App Store",
    menu: "開啟選單",
    closeMenu: "關閉選單",
    language: "語言",
    theme: "外觀",
    themeLight: "淺色",
    themeDark: "深色",
    themeSystem: "跟隨系統",
    github: "GitHub",
  },
  hero: {
    status: "已上架 App Store，支援 iPhone、iPad、Mac 與 Apple TV",
    title: "你所有的音樂，",
    titleAccent: "一個播放器就夠了。",
    subtitle:
      "Aduoer 將 Wow 來源、Jellyfin 與 Navidrome 等媒體伺服器、NAS 共享和雲端硬碟接入同一個原生播放器。同步歌詞、離線下載、Siri 與 CarPlay 都已內建。",
    appStore: "在 App Store 下載",
    docs: "閱讀文件",
    platforms: ["iPhone", "iPad", "Mac", "Apple TV", "CarPlay"],
  },
  demo: {
    label: "可互動預覽",
    title: "試試播放器",
    steps: [
      {
        title: "點一下迷你播放器",
        text: "正在播放頁會從底部升起，和 App 裡的動畫完全一致。",
      },
      {
        title: "點一下歌詞按鈕",
        text: "封面縮進左上角，同步歌詞鋪滿整頁。",
      },
      {
        title: "向下滑動收起",
        text: "在封面頁或歌詞頁向下拖曳，就能回到資料庫。",
      },
    ],
    replay: "自動示範",
    reset: "重新開始",
    playing: "示範中…",
    done: "這就是完整流程。你可以自己再試一遍，或者重新播放。",
    note: "畫面取自 iPhone 版 Aduoer。",
    hotspotMini: "開啟播放器",
    hotspotLyrics: "顯示歌詞",
    hotspotSwipe: "向下滑動",
    collapse: "收起播放器",
  },
  sources: {
    heading: "音樂來源",
    title: "十四種音樂來源，同一套熟悉的資料庫。",
    subtitle:
      "想加多少來源都可以。專輯、歌手、播放清單和搜尋在每個來源裡的用法完全一樣，還能把它們合併成一個聚合資料庫。",
    groups: [
      {
        title: "媒體伺服器",
        note: "直接從你已經在運行的伺服器串流。",
        items: [
          "Wow",
          "Jellyfin",
          "Emby",
          "Navidrome",
          "Subsonic",
          "Plex",
          "飛牛 fnOS",
        ],
      },
      {
        title: "檔案與 NAS",
        note: "掃描資料夾、讀取標籤，並自動補齊缺少的中繼資料。",
        items: ["本機檔案", "WebDAV", "SMB"],
      },
      {
        title: "雲端硬碟",
        note: "透過官方登入授權，只讀取你選定的資料夾。",
        items: ["百度網盤", "OneDrive", "Google Drive"],
      },
      {
        title: "Apple Music",
        note: "在 iPhone 和 iPad 上播放你的 Apple Music 資料庫。",
        items: [],
      },
    ],
    keychain: "密碼與權杖保存在裝置的系統鑰匙圈中，Aduoer 不儲存你的任何憑證。",
  },
  features: {
    heading: "功能",
    title: "播放器該做的事，安靜地做好。",
    subtitle:
      "沒有動態消息，沒有廣告，也不替你做決定。Aduoer 只把你已有的音樂整理好，然後退到一旁。",
    cards: [
      {
        title: "同步歌詞",
        text: "逐行與逐字歌詞，在全螢幕歌詞頁裡跟著歌曲一起走。",
      },
      {
        title: "多個音樂來源，一起聽",
        text: "想加多少來源都可以，一鍵切換；開啟聚合來源後還能一次搜尋全部音樂來源，把不同來源的歌曲放進同一個收藏和播放清單。",
      },
      {
        title: "離線下載",
        text: "下載單曲、專輯或整個播放清單，管理下載佇列，沒有網路也照常播放。",
      },
      {
        title: "演唱模式（卡拉 OK）",
        text: "在裝置上分離人聲與伴奏，自由調整人聲音量，跟著喜歡的歌曲開唱。",
      },
      {
        title: "中繼資料比對",
        text: "為你的檔案補齊標籤、封面和歌詞，並在你需要時寫回原始檔案。",
      },
      {
        title: "iCloud、Siri 與 CarPlay",
        text: "音樂來源、收藏和播放清單透過你的私人 iCloud 同步。讓 Siri 播放、用捷徑組合，開車時也能繼續瀏覽。",
      },
    ],
  },
  devices: {
    heading: "裝置",
    title: "每一塊 Apple 螢幕上，都是原生體驗。",
    subtitle:
      "使用 SwiftUI 為 iPhone、iPad、Mac 和 Apple TV 打造，車上還有 CarPlay。每種裝置都有自己的版面，而不是被拉伸的手機介面。",
    items: [
      { name: "iPhone 與 iPad", text: "iOS 與 iPadOS 17 及以上" },
      { name: "Mac", text: "macOS 14 及以上，原生 Mac 應用程式" },
      { name: "Apple TV", text: "tvOS 17 及以上，支援 Top Shelf" },
      { name: "CarPlay", text: "正在播放、收藏、播放清單與待播佇列" },
    ],
    macCaption: "Mac 版 Aduoer 的播放與歌詞頁",
    ipadCaption: "iPad 版 Aduoer 的播放頁",
  },
  privacy: {
    title: "隱私優先的設計",
    text: "資料庫、播放記錄和憑證都留在你的裝置上。沒有 Aduoer 帳號，沒有廣告，也沒有跨 App 追蹤。",
    link: "閱讀隱私政策",
  },
  closing: {
    title: "把散落各處的音樂，收回到一起。",
    subtitle: "免費下載。Aduoer 仍在持續開發，專案在 GitHub 上公開。",
    appStore: "在 App Store 下載",
    github: "在 GitHub 關注",
  },
  footer: {
    tagline: "為你自己的音樂而做。",
    product: "產品",
    legal: "法律",
    support: "使用者支援",
    privacy: "隱私政策",
    terms: "服務條款",
    cookies: "Cookie 政策",
    copyright: "Aduoer Music. 保留所有權利。",
    platforms: "iPhone、iPad、Mac、Apple TV 與 CarPlay",
  },
};

const ja: Copy = {
  meta: {
    title: "Aduoer Music – 持っている音楽すべてを、ひとつのプレーヤーで",
    description:
      "Aduoer は Wow ソース、Jellyfin、Navidrome、Plex、NAS フォルダ、クラウドドライブ、ローカルファイルを iPhone、iPad、Mac、Apple TV 向けのネイティブプレーヤーひとつにまとめます。",
  },
  nav: {
    features: "機能",
    sources: "ソース",
    devices: "デバイス",
    docs: "ドキュメント",
    download: "App Store",
    menu: "メニューを開く",
    closeMenu: "メニューを閉じる",
    language: "言語",
    theme: "外観",
    themeLight: "ライト",
    themeDark: "ダーク",
    themeSystem: "システムに合わせる",
    github: "GitHub",
  },
  hero: {
    status: "App Store で配信中。iPhone、iPad、Mac、Apple TV に対応",
    title: "持っている音楽すべてを、",
    titleAccent: "ひとつのプレーヤーで。",
    subtitle:
      "Aduoer は Wow ソース、Jellyfin や Navidrome などのメディアサーバー、NAS の共有フォルダ、クラウドドライブをひとつのネイティブプレーヤーにつなぎます。同期歌詞、ダウンロード、Siri、CarPlay も最初から使えます。",
    appStore: "App Store からダウンロード",
    docs: "ドキュメントを読む",
    platforms: ["iPhone", "iPad", "Mac", "Apple TV", "CarPlay"],
  },
  demo: {
    label: "インタラクティブプレビュー",
    title: "プレーヤーを試す",
    steps: [
      {
        title: "ミニプレーヤーをタップ",
        text: "再生中の画面がアプリと同じ動きで下から現れます。",
      },
      {
        title: "歌詞ボタンをタップ",
        text: "アートワークが左上に収まり、同期歌詞が画面いっぱいに表示されます。",
      },
      {
        title: "下にスワイプして閉じる",
        text: "どちらの画面でも下にドラッグするとライブラリに戻ります。",
      },
    ],
    replay: "自動で再生",
    reset: "最初から",
    playing: "再生中…",
    done: "これで一連の流れは終わりです。自分で試すか、もう一度再生できます。",
    note: "画面は iPhone 版 Aduoer から取得したものです。",
    hotspotMini: "プレーヤーを開く",
    hotspotLyrics: "歌詞を表示",
    hotspotSwipe: "下にスワイプ",
    collapse: "プレーヤーを閉じる",
  },
  sources: {
    heading: "ソース",
    title: "14 種類のソース、ひとつの見慣れたライブラリ。",
    subtitle:
      "ソースはいくつでも追加できます。アルバム、アーティスト、プレイリスト、検索の使い方はどのソースでも同じで、まとめてひとつの統合ライブラリにもできます。",
    groups: [
      {
        title: "メディアサーバー",
        note: "すでに運用しているサーバーからそのままストリーミング。",
        items: [
          "Wow",
          "Jellyfin",
          "Emby",
          "Navidrome",
          "Subsonic",
          "Plex",
          "fnOS",
        ],
      },
      {
        title: "ファイルと NAS",
        note: "フォルダをスキャンしてタグを読み取り、足りないメタデータを補完します。",
        items: ["ローカルファイル", "WebDAV", "SMB"],
      },
      {
        title: "クラウドドライブ",
        note: "公式のログインで認証し、選んだフォルダだけを読み取ります。",
        items: ["Baidu Netdisk", "OneDrive", "Google Drive"],
      },
      {
        title: "Apple Music",
        note: "iPhone と iPad で Apple Music のライブラリを再生します。",
        items: [],
      },
    ],
    keychain:
      "パスワードとトークンはデバイスのシステムキーチェーンに保存されます。Aduoer があなたの認証情報を保存することはありません。",
  },
  features: {
    heading: "機能",
    title: "プレーヤーに必要なことを、静かにこなす。",
    subtitle:
      "フィードも広告もなく、何を聴くかを勝手に決めることもありません。Aduoer はあなたの音楽を整えて、あとは邪魔をしません。",
    cards: [
      {
        title: "同期歌詞",
        text: "行単位と単語単位の歌詞を、曲に合わせて進む全画面ページで表示します。",
      },
      {
        title: "複数のソースをひとつに",
        text: "ソースはいくつでも追加でき、ワンタップで切り替え。統合ライブラリをオンにすれば、すべてのソースをまとめて検索し、異なるソースの曲を同じお気に入りやプレイリストに入れられます。",
      },
      {
        title: "オフラインダウンロード",
        text: "曲、アルバム、プレイリストごとダウンロードしてキューを管理。通信がなくても聴き続けられます。",
      },
      {
        title: "歌唱モード（カラオケ）",
        text: "デバイス上でボーカルと伴奏を分離。ボーカルの音量を調整して、好きな曲を一緒に歌えます。",
      },
      {
        title: "メタデータの照合",
        text: "ファイルに足りないタグ、カバー、歌詞を補い、必要なときだけ元のファイルに書き戻します。",
      },
      {
        title: "iCloud、Siri、CarPlay",
        text: "ソース、お気に入り、プレイリストはプライベートな iCloud で同期。Siri に再生を頼み、ショートカットを組み、車の中でも操作できます。",
      },
    ],
  },
  devices: {
    heading: "デバイス",
    title: "どの Apple デバイスでもネイティブ。",
    subtitle:
      "SwiftUI で iPhone、iPad、Mac、Apple TV 向けに作られ、車では CarPlay が使えます。それぞれのデバイスに合わせたレイアウトで、引き伸ばしたスマホ画面ではありません。",
    items: [
      { name: "iPhone と iPad", text: "iOS / iPadOS 17 以降" },
      { name: "Mac", text: "macOS 14 以降、ネイティブ Mac アプリ" },
      { name: "Apple TV", text: "tvOS 17 以降、Top Shelf 対応" },
      { name: "CarPlay", text: "再生中、お気に入り、プレイリスト、キュー" },
    ],
    macCaption: "Mac 版 Aduoer の再生画面と歌詞",
    ipadCaption: "iPad 版 Aduoer の再生画面",
  },
  privacy: {
    title: "プライバシーを前提に",
    text: "ライブラリ、再生履歴、認証情報はデバイスの中に留まります。Aduoer のアカウントも、広告も、アプリをまたぐトラッキングもありません。",
    link: "プライバシーポリシーを読む",
  },
  closing: {
    title: "ばらばらのライブラリを、ひとつに。",
    subtitle:
      "ダウンロードは無料です。Aduoer は開発を続けており、プロジェクトは GitHub で公開しています。",
    appStore: "App Store からダウンロード",
    github: "GitHub でフォロー",
  },
  footer: {
    tagline: "自分の音楽のために。",
    product: "プロダクト",
    legal: "法的情報",
    support: "サポート",
    privacy: "プライバシーポリシー",
    terms: "利用規約",
    cookies: "Cookie ポリシー",
    copyright: "Aduoer Music. All rights reserved.",
    platforms: "iPhone、iPad、Mac、Apple TV、CarPlay",
  },
};

const ko: Copy = {
  meta: {
    title: "Aduoer Music – 내가 가진 모든 음악을 하나의 플레이어로",
    description:
      "Aduoer는 Wow 소스, Jellyfin, Navidrome, Plex, NAS 폴더, 클라우드 드라이브와 로컬 파일을 iPhone, iPad, Mac, Apple TV용 네이티브 플레이어 하나로 모읍니다.",
  },
  nav: {
    features: "기능",
    sources: "소스",
    devices: "기기",
    docs: "문서",
    download: "App Store",
    menu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    language: "언어",
    theme: "화면 모드",
    themeLight: "라이트",
    themeDark: "다크",
    themeSystem: "시스템 설정",
    github: "GitHub",
  },
  hero: {
    status: "App Store 출시. iPhone, iPad, Mac, Apple TV 지원",
    title: "내가 가진 모든 음악을",
    titleAccent: "하나의 플레이어로.",
    subtitle:
      "Aduoer는 Wow 소스, Jellyfin과 Navidrome 같은 미디어 서버, NAS 공유 폴더, 클라우드 드라이브를 하나의 네이티브 플레이어로 연결합니다. 싱크 가사, 다운로드, Siri, CarPlay가 기본으로 들어 있습니다.",
    appStore: "App Store에서 다운로드",
    docs: "문서 읽기",
    platforms: ["iPhone", "iPad", "Mac", "Apple TV", "CarPlay"],
  },
  demo: {
    label: "인터랙티브 미리보기",
    title: "플레이어 체험하기",
    steps: [
      {
        title: "미니 플레이어를 탭하세요",
        text: "지금 재생 중 화면이 앱과 똑같은 움직임으로 아래에서 올라옵니다.",
      },
      {
        title: "가사 버튼을 탭하세요",
        text: "앨범 아트가 왼쪽 위로 작아지고 싱크 가사가 화면을 채웁니다.",
      },
      {
        title: "아래로 쓸어내려 닫기",
        text: "어느 화면에서든 아래로 드래그하면 보관함으로 돌아갑니다.",
      },
    ],
    replay: "자동 재생",
    reset: "처음부터",
    playing: "재생 중…",
    done: "전체 흐름은 여기까지입니다. 직접 해 보거나 다시 재생할 수 있습니다.",
    note: "화면은 iPhone용 Aduoer에서 캡처했습니다.",
    hotspotMini: "플레이어 열기",
    hotspotLyrics: "가사 보기",
    hotspotSwipe: "아래로 쓸어내리기",
    collapse: "플레이어 닫기",
  },
  sources: {
    heading: "소스",
    title: "14가지 소스, 하나의 익숙한 보관함.",
    subtitle:
      "소스는 원하는 만큼 추가할 수 있습니다. 앨범, 아티스트, 재생목록, 검색은 어느 소스에서나 같은 방식으로 동작하고, 모두 합쳐 하나의 통합 보관함으로 볼 수도 있습니다.",
    groups: [
      {
        title: "미디어 서버",
        note: "이미 운영 중인 서버에서 바로 스트리밍합니다.",
        items: [
          "Wow",
          "Jellyfin",
          "Emby",
          "Navidrome",
          "Subsonic",
          "Plex",
          "fnOS",
        ],
      },
      {
        title: "파일과 NAS",
        note: "폴더를 스캔하고 태그를 읽어 빠진 메타데이터를 채웁니다.",
        items: ["로컬 파일", "WebDAV", "SMB"],
      },
      {
        title: "클라우드 드라이브",
        note: "공식 로그인으로 인증하고 선택한 폴더만 읽습니다.",
        items: ["Baidu Netdisk", "OneDrive", "Google Drive"],
      },
      {
        title: "Apple Music",
        note: "iPhone과 iPad에서 Apple Music 보관함을 재생합니다.",
        items: [],
      },
    ],
    keychain:
      "비밀번호와 토큰은 기기의 시스템 키체인에 저장됩니다. Aduoer는 사용자의 로그인 정보를 저장하지 않습니다.",
  },
  features: {
    heading: "기능",
    title: "플레이어가 해야 할 일을 조용히 해냅니다.",
    subtitle:
      "피드도, 광고도, 대신 결정해 주는 알고리즘도 없습니다. Aduoer는 이미 가진 음악을 정리해 두고 한발 물러섭니다.",
    cards: [
      {
        title: "싱크 가사",
        text: "줄 단위와 단어 단위 가사를 노래에 맞춰 흐르는 전체 화면 페이지로 보여 줍니다.",
      },
      {
        title: "여러 소스를 하나로",
        text: "소스는 원하는 만큼 추가하고 한 번의 탭으로 전환할 수 있습니다. 통합 보관함을 켜면 모든 소스를 한 번에 검색하고, 서로 다른 소스의 곡을 같은 즐겨찾기와 재생목록에 담을 수 있습니다.",
      },
      {
        title: "오프라인 다운로드",
        text: "곡, 앨범, 재생목록 전체를 다운로드하고 대기열을 관리해 연결 없이도 계속 들을 수 있습니다.",
      },
      {
        title: "노래 모드 (노래방)",
        text: "기기에서 보컬과 반주를 분리하고 보컬 음량을 조절해 좋아하는 노래를 따라 부르세요.",
      },
      {
        title: "메타데이터 매칭",
        text: "파일에 빠진 태그, 커버, 가사를 채우고 원할 때만 원본 파일에 기록합니다.",
      },
      {
        title: "iCloud, Siri, CarPlay",
        text: "소스, 즐겨찾기, 재생목록은 개인 iCloud로 동기화됩니다. Siri에게 재생을 부탁하고, 단축어를 만들고, 차 안에서도 탐색할 수 있습니다.",
      },
    ],
  },
  devices: {
    heading: "기기",
    title: "모든 Apple 화면에서 네이티브로.",
    subtitle:
      "SwiftUI로 iPhone, iPad, Mac, Apple TV용으로 만들었고, 차에서는 CarPlay를 지원합니다. 기기마다 고유한 레이아웃을 가지며 늘려 놓은 휴대폰 앱이 아닙니다.",
    items: [
      { name: "iPhone과 iPad", text: "iOS 및 iPadOS 17 이상" },
      { name: "Mac", text: "macOS 14 이상, 네이티브 Mac 앱" },
      { name: "Apple TV", text: "tvOS 17 이상, Top Shelf 지원" },
      { name: "CarPlay", text: "지금 재생 중, 즐겨찾기, 재생목록, 대기열" },
    ],
    macCaption: "Mac용 Aduoer의 재생 및 가사 화면",
    ipadCaption: "iPad용 Aduoer의 재생 화면",
  },
  privacy: {
    title: "처음부터 프라이버시를 생각한 설계",
    text: "보관함, 재생 기록, 로그인 정보는 기기 안에 남습니다. Aduoer 계정도, 광고도, 앱 간 추적도 없습니다.",
    link: "개인정보 처리방침 읽기",
  },
  closing: {
    title: "흩어진 보관함을 하나로.",
    subtitle:
      "무료로 다운로드할 수 있습니다. Aduoer는 계속 개발 중이며 프로젝트는 GitHub에 공개되어 있습니다.",
    appStore: "App Store에서 다운로드",
    github: "GitHub에서 팔로우",
  },
  footer: {
    tagline: "내가 가진 음악을 위해.",
    product: "제품",
    legal: "법적 고지",
    support: "지원",
    privacy: "개인정보 처리방침",
    terms: "서비스 약관",
    cookies: "쿠키 정책",
    copyright: "Aduoer Music. All rights reserved.",
    platforms: "iPhone, iPad, Mac, Apple TV, CarPlay",
  },
};

const de: Copy = {
  meta: {
    title: "Aduoer Music – Ein Player für deine gesamte Musik",
    description:
      "Aduoer bringt Wow-Quellen, Jellyfin, Navidrome, Plex, NAS-Ordner, Cloud-Laufwerke und lokale Dateien in einen nativen Player für iPhone, iPad, Mac und Apple TV.",
  },
  nav: {
    features: "Funktionen",
    sources: "Quellen",
    devices: "Geräte",
    docs: "Doku",
    download: "App Store",
    menu: "Menü öffnen",
    closeMenu: "Menü schließen",
    language: "Sprache",
    theme: "Darstellung",
    themeLight: "Hell",
    themeDark: "Dunkel",
    themeSystem: "System",
    github: "GitHub",
  },
  hero: {
    status: "Im App Store für iPhone, iPad, Mac und Apple TV",
    title: "Ein Player für",
    titleAccent: "deine gesamte Musik.",
    subtitle:
      "Aduoer verbindet Wow-Quellen, Medienserver wie Jellyfin und Navidrome, NAS-Freigaben und Cloud-Laufwerke zu einem einzigen nativen Player. Synchrone Songtexte, Downloads, Siri und CarPlay sind schon eingebaut.",
    appStore: "Im App Store laden",
    docs: "Dokumentation lesen",
    platforms: ["iPhone", "iPad", "Mac", "Apple TV", "CarPlay"],
  },
  demo: {
    label: "Interaktive Vorschau",
    title: "Player ausprobieren",
    steps: [
      {
        title: "Auf den Mini-Player tippen",
        text: "Die Wiedergabeansicht fährt von unten herauf, genau wie in der App.",
      },
      {
        title: "Auf die Songtext-Taste tippen",
        text: "Das Cover rückt in die Ecke und die synchronen Songtexte füllen die Seite.",
      },
      {
        title: "Nach unten wischen",
        text: "Auf beiden Seiten lässt sich die Ansicht nach unten ziehen, zurück zur Bibliothek.",
      },
    ],
    replay: "Tour abspielen",
    reset: "Von vorn",
    playing: "Läuft …",
    done: "Das war der ganze Ablauf. Probier es selbst oder spiel die Tour noch einmal ab.",
    note: "Bildschirme aus Aduoer für iPhone.",
    hotspotMini: "Player öffnen",
    hotspotLyrics: "Songtext anzeigen",
    hotspotSwipe: "Nach unten wischen",
    collapse: "Player schließen",
  },
  sources: {
    heading: "Quellen",
    title: "Vierzehn Arten von Quellen. Eine vertraute Bibliothek.",
    subtitle:
      "Füge so viele Quellen hinzu, wie du möchtest. Alben, Künstler, Playlists und Suche funktionieren überall gleich, und alle Quellen lassen sich zu einer gemeinsamen Bibliothek zusammenführen.",
    groups: [
      {
        title: "Medienserver",
        note: "Streamt direkt vom Server, den du ohnehin betreibst.",
        items: [
          "Wow",
          "Jellyfin",
          "Emby",
          "Navidrome",
          "Subsonic",
          "Plex",
          "fnOS",
        ],
      },
      {
        title: "Dateien und NAS",
        note: "Scannt Ordner, liest Tags und ergänzt fehlende Metadaten.",
        items: ["Lokale Dateien", "WebDAV", "SMB"],
      },
      {
        title: "Cloud-Laufwerke",
        note: "Meldet sich über den offiziellen Login an und liest nur den gewählten Ordner.",
        items: ["Baidu Netdisk", "OneDrive", "Google Drive"],
      },
      {
        title: "Apple Music",
        note: "Spielt deine Apple-Music-Mediathek auf iPhone und iPad.",
        items: [],
      },
    ],
    keychain:
      "Passwörter und Tokens liegen im Schlüsselbund deines Geräts. Aduoer speichert deine Zugangsdaten nicht.",
  },
  features: {
    heading: "Funktionen",
    title: "Alles, was ein Player tun sollte. Ohne Aufhebens.",
    subtitle:
      "Kein Feed, keine Werbung und nichts, das für dich entscheidet. Aduoer ordnet die Musik, die du schon hast, und hält sich sonst zurück.",
    cards: [
      {
        title: "Synchrone Songtexte",
        text: "Zeilen- und wortgenaue Songtexte auf einer Vollbildseite, die mit dem Song Schritt hält.",
      },
      {
        title: "Alle Quellen, zusammen",
        text: "Füge beliebig viele Quellen hinzu und wechsle mit einem Tipp. Mit der zusammengeführten Bibliothek durchsuchst du alle Quellen auf einmal und mischst ihre Titel in deine Favoriten und Playlists.",
      },
      {
        title: "Offline-Downloads",
        text: "Lade Titel, Alben oder ganze Playlists, verwalte die Warteschlange und höre ohne Verbindung weiter.",
      },
      {
        title: "Gesangsmodus (Karaoke)",
        text: "Trenne Gesang und Begleitung direkt auf deinem Gerät, passe die Gesangslautstärke an und singe deine Lieblingslieder mit.",
      },
      {
        title: "Metadaten-Abgleich",
        text: "Ergänzt fehlende Tags, Cover und Songtexte für deine Dateien und schreibt sie auf Wunsch zurück in die Datei.",
      },
      {
        title: "iCloud, Siri und CarPlay",
        text: "Quellen, Favoriten und Playlists synchronisieren sich über deine private iCloud. Lass Siri abspielen, baue Kurzbefehle und stöbere im Auto weiter.",
      },
    ],
  },
  devices: {
    heading: "Geräte",
    title: "Nativ auf jedem Apple-Bildschirm.",
    subtitle:
      "Mit SwiftUI für iPhone, iPad, Mac und Apple TV gebaut, mit CarPlay für unterwegs. Jedes Gerät bekommt sein eigenes Layout statt einer gestreckten Telefon-App.",
    items: [
      { name: "iPhone und iPad", text: "iOS und iPadOS 17 oder neuer" },
      { name: "Mac", text: "macOS 14 oder neuer, als native Mac-App" },
      { name: "Apple TV", text: "tvOS 17 oder neuer, mit Top Shelf" },
      {
        name: "CarPlay",
        text: "Wiedergabe, Favoriten, Playlists und Warteschlange",
      },
    ],
    macCaption: "Aduoer für Mac mit Wiedergabe und Songtext",
    ipadCaption: "Aduoer für iPad, Wiedergabeansicht",
  },
  privacy: {
    title: "Privatsphäre von Anfang an",
    text: "Bibliothek, Wiedergabeverlauf und Zugangsdaten bleiben auf deinem Gerät. Es gibt kein Aduoer-Konto, keine Werbung und kein App-übergreifendes Tracking.",
    link: "Datenschutzerklärung lesen",
  },
  closing: {
    title: "Bring deine Bibliotheken zusammen.",
    subtitle:
      "Kostenlos zum Download. Aduoer wird aktiv weiterentwickelt, das Projekt ist auf GitHub offen.",
    appStore: "Im App Store laden",
    github: "Auf GitHub folgen",
  },
  footer: {
    tagline: "Gemacht für die Musik, die dir gehört.",
    product: "Produkt",
    legal: "Rechtliches",
    support: "Support",
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    cookies: "Cookie-Richtlinie",
    copyright: "Aduoer Music. Alle Rechte vorbehalten.",
    platforms: "iPhone, iPad, Mac, Apple TV und CarPlay",
  },
};

export const copy: Record<Language, Copy> = {
  en,
  zh,
  "zh-Hant": zhHant,
  ja,
  ko,
  de,
};
