export const APP_STORE_URL =
  "https://apps.apple.com/cn/app/id6794036425";

const APP_STORE_URL_WITHOUT_REGION =
  "https://apps.apple.com/app/id6794036425";

export function getLocalizedAppStoreUrl(): string {
  if (typeof navigator === "undefined") return APP_STORE_URL;

  const locales = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const locale of locales) {
    try {
      const region = new Intl.Locale(locale).maximize().region;

      if (region && /^[A-Z]{2}$/.test(region)) {
        return `https://apps.apple.com/${region.toLowerCase()}/app/id6794036425`;
      }
    } catch {
      const region = locale.match(/[-_]([A-Za-z]{2})(?:$|[-_])/u)?.[1];

      if (region) {
        return `https://apps.apple.com/${region.toLowerCase()}/app/id6794036425`;
      }
    }
  }

  // Apple 会根据访问者的 storefront 处理无地区链接。
  return APP_STORE_URL_WITHOUT_REGION;
}
