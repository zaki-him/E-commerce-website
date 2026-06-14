import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { cookies } from "next/headers";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = routing.defaultLocale;

  try {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
    if (cookieLocale && hasLocale(routing.locales, cookieLocale)) {
      locale = cookieLocale;
    }
  } catch {
    // cookies() may throw during static generation
  }

  const requested = await requestLocale;
  if (hasLocale(routing.locales, requested)) {
    locale = requested;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
