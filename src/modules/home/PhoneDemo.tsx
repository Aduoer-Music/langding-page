import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { Copy } from "./i18n";

/**
 * Interactive reproduction of the iPhone player flow.
 *
 * Timings mirror the app:
 *  - sheet presentation / dismissal  → SwiftUI .smooth(duration: 0.35)
 *  - drag release that stays open    → .snappy(duration: 0.5)
 *  - cover ⇄ lyrics artwork morph    → .smooth(duration: 0.45)
 *  - reduced motion                  → .easeOut(duration: 0.12) cross-fades
 */

// Geometry measured on a 402 × 874 pt iPhone screen.
const SCREEN_W = 402;
const SCREEN_H = 874;
const ART_H = 434.7; // 1206 × 1304 artwork, drawn edge to edge
const COMPACT = { x: 28, y: 97.3, size: 64, radius: 12 };
const DRAG_THRESHOLD = 150; // pt, same as FullPlayerGestureModifier
const FLICK_VELOCITY = 3500; // pt/s

type Tab = "cover" | "lyrics";
type Motion = "smooth" | "snappy" | "none";

type Props = {
  t: Copy["demo"];
  assetUrl: (path: string) => string;
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

export default function PhoneDemo({ t, assetUrl }: Props) {
  const reducedMotion = useReducedMotion();
  const screenRef = useRef<HTMLDivElement>(null);
  const lyricsButtonRef = useRef<HTMLButtonElement>(null);

  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState<Tab>("cover");
  const [sawLyrics, setSawLyrics] = useState(false);
  const [dragY, setDragY] = useState<number | null>(null);
  const [motion, setMotion] = useState<Motion>("smooth");
  const [playing, setPlaying] = useState(false);

  const drag = useRef<{
    id: number;
    startX: number;
    startY: number;
    lastY: number;
    lastT: number;
    velocity: number;
    locked: "none" | "vertical" | "horizontal";
  } | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const scale = () => {
    const el = screenRef.current;
    return el ? el.clientHeight / SCREEN_H : 1;
  };

  const open = useCallback(() => {
    setMotion("smooth");
    setDragY(null);
    setTab("cover");
    setExpanded(true);
  }, []);

  const close = useCallback(() => {
    setMotion("smooth");
    setDragY(null);
    setExpanded(false);
    setTab("cover");
  }, []);

  const showLyrics = useCallback((next: Tab) => {
    setTab(next);
    if (next === "lyrics") setSawLyrics(true);
  }, []);

  const reset = () => {
    clearTimers();
    setPlaying(false);
    setExpanded(false);
    setTab("cover");
    setSawLyrics(false);
    setDragY(null);
    setMotion("smooth");
  };

  // Guided tour: performs the three steps on its own.
  const playTour = () => {
    clearTimers();
    setPlaying(true);
    setExpanded(false);
    setTab("cover");
    setSawLyrics(false);
    setDragY(null);
    const at = (ms: number, fn: () => void) =>
      timers.current.push(window.setTimeout(fn, ms));
    at(500, open);
    at(1900, () => showLyrics("lyrics"));
    at(3500, () => {
      // Mimic a finger pulling the sheet down before letting go.
      setMotion("smooth");
      setDragY(190 * scale());
    });
    at(4050, close);
    at(4700, () => setPlaying(false));
  };

  // Drag to dismiss, mirroring FullPlayerGestureModifier.
  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (playing || !expanded) return;
    if ((event.target as HTMLElement).closest("button")) return;
    drag.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastY: event.clientY,
      lastT: performance.now(),
      velocity: 0,
      locked: "none",
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;
    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;
    if (state.locked === "none") {
      if (Math.hypot(dx, dy) < 10) return;
      state.locked = Math.abs(dy) >= Math.abs(dx) ? "vertical" : "horizontal";
    }
    if (state.locked !== "vertical") return;
    const now = performance.now();
    const dt = Math.max(1, now - state.lastT);
    state.velocity = ((event.clientY - state.lastY) / dt) * 1000;
    state.lastY = event.clientY;
    state.lastT = now;
    setMotion("none");
    setDragY(Math.min(1000, Math.max(0, dy)));
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state || state.id !== event.pointerId) return;
    drag.current = null;
    const dy = event.clientY - state.startY;
    const s = scale();
    if (
      state.locked === "vertical" &&
      (dy > DRAG_THRESHOLD * s || state.velocity > FLICK_VELOCITY * s)
    ) {
      close();
      return;
    }
    // Let go without dismissing: spring back with .snappy(0.5).
    setMotion("snappy");
    setDragY(null);
  };

  // Escape closes the sheet from anywhere on the page.
  useEffect(() => {
    if (!expanded) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded, close]);

  const step = !expanded ? (sawLyrics ? 3 : 0) : tab === "cover" ? 1 : 2;

  const durations = useMemo(
    () =>
      reducedMotion
        ? { sheet: "120ms", art: "120ms", ease: "ease-out" }
        : {
            sheet: motion === "snappy" ? "600ms" : "500ms",
            art: "650ms",
            ease:
              motion === "snappy" ? "var(--ease-snappy)" : "var(--ease-smooth)",
          },
    [reducedMotion, motion],
  );

  const sheetStyle: CSSProperties = reducedMotion
    ? {
        transform: "none",
        opacity: expanded ? 1 : 0,
        pointerEvents: expanded ? "auto" : "none",
        transition: `opacity ${durations.sheet} ${durations.ease}`,
      }
    : {
        transform:
          dragY !== null
            ? `translate3d(0, ${dragY}px, 0)`
            : expanded
              ? "translate3d(0, 0, 0)"
              : "translate3d(0, 102%, 0)",
        transition:
          motion === "none"
            ? "none"
            : `transform ${durations.sheet} ${durations.ease}`,
      };

  const compact = tab === "lyrics";
  const artStyle: CSSProperties = {
    left: compact ? `calc(${COMPACT.x} * var(--u))` : 0,
    top: compact ? `calc(${COMPACT.y} * var(--u))` : 0,
    width: compact
      ? `calc(${COMPACT.size} * var(--u))`
      : `calc(${SCREEN_W} * var(--u))`,
    height: compact
      ? `calc(${COMPACT.size} * var(--u))`
      : `calc(${ART_H} * var(--u))`,
    borderRadius: compact ? `calc(${COMPACT.radius} * var(--u))` : 0,
    transition: reducedMotion
      ? "opacity 120ms ease-out"
      : `left ${durations.art} var(--ease-smooth), top ${durations.art} var(--ease-smooth), width ${durations.art} var(--ease-smooth), height ${durations.art} var(--ease-smooth), border-radius ${durations.art} var(--ease-smooth)`,
  };
  const fade = (visible: boolean): CSSProperties => ({
    opacity: visible ? 1 : 0,
    transition: reducedMotion
      ? "opacity 120ms ease-out"
      : `opacity ${durations.art} var(--ease-smooth)`,
  });

  return (
    <div className={`demo ${playing ? "demo--playing" : ""}`}>
      <div className="demo__stage">
        <div className="phone" aria-label={t.title}>
          <div className="phone__frame">
            <div className="phone__island" aria-hidden="true" />
            <div
              className={`phone__screen ${expanded ? "is-expanded" : ""} step-${step}`}
              ref={screenRef}
              data-tab={tab}
            >
              <img
                className="screen__home screen__home--light"
                src={assetUrl("screenshots/iphone-home-light.webp")}
                alt=""
                width={900}
                height={1957}
                decoding="async"
              />
              <img
                className="screen__home screen__home--dark"
                src={assetUrl("screenshots/iphone-home-dark.webp")}
                alt=""
                width={900}
                height={1957}
                decoding="async"
              />

              <button
                type="button"
                className="screen__hotspot screen__hotspot--mini"
                onClick={(event) => {
                  open();
                  // Keyboard activation: move focus into the sheet.
                  if (event.detail === 0) {
                    window.setTimeout(
                      () => lyricsButtonRef.current?.focus(),
                      50,
                    );
                  }
                }}
                disabled={expanded || playing}
                aria-label={t.hotspotMini}
                tabIndex={expanded ? -1 : 0}
              >
                <span className="hotspot__ring" aria-hidden="true" />
              </button>

              <div
                className="sheet"
                style={sheetStyle}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                aria-hidden={!expanded}
              >
                <img
                  className="sheet__page"
                  src={assetUrl("screenshots/iphone-player.webp")}
                  alt=""
                  width={900}
                  height={1957}
                  decoding="async"
                  style={fade(!compact)}
                />
                <img
                  className="sheet__page"
                  src={assetUrl("screenshots/iphone-lyrics.webp")}
                  alt=""
                  width={900}
                  height={1957}
                  decoding="async"
                  style={fade(compact)}
                />
                <div className="sheet__art" style={artStyle}>
                  <img
                    src={assetUrl("screenshots/iphone-artwork.webp")}
                    alt=""
                    width={900}
                    height={973}
                    decoding="async"
                  />
                </div>
                <img
                  className="sheet__status"
                  src={assetUrl("screenshots/iphone-status.png")}
                  alt=""
                  width={900}
                  height={112}
                  decoding="async"
                />

                <button
                  ref={lyricsButtonRef}
                  type="button"
                  className="screen__hotspot screen__hotspot--lyrics"
                  onClick={() => showLyrics(compact ? "cover" : "lyrics")}
                  disabled={!expanded || playing}
                  aria-label={t.hotspotLyrics}
                  aria-pressed={compact}
                  tabIndex={expanded ? 0 : -1}
                >
                  <span className="hotspot__ring" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className="sheet__collapse"
                  onClick={close}
                  disabled={!expanded || playing}
                  aria-label={t.collapse}
                  tabIndex={expanded ? 0 : -1}
                />

                <div className="screen__swipe" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 4v14" />
                    <path d="m6 13 6 6 6-6" />
                  </svg>
                  <span>{t.hotspotSwipe}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="demo__caption" aria-hidden="true">
        <span className="demo__step-index">
          {step === 3 ? (
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3.5 8.5 3 3 6-7" />
            </svg>
          ) : (
            step + 1
          )}
        </span>
        <span>{step === 3 ? t.done : t.steps[step].title}</span>
      </p>

      <div className="demo__guide">
        <p className="demo__label">{t.label}</p>
        <h2 className="demo__title">{t.title}</h2>
        <ol className="demo__steps">
          {t.steps.map((item, index) => {
            const state =
              step === 3 || index < step
                ? "done"
                : index === step
                  ? "current"
                  : "todo";
            return (
              <li key={item.title} className={`demo__step is-${state}`}>
                <span className="demo__step-index" aria-hidden="true">
                  {state === "done" ? (
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m3.5 8.5 3 3 6-7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>
                <span className="demo__step-body">
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </span>
              </li>
            );
          })}
        </ol>
        <p className="demo__status" aria-live="polite">
          {playing ? t.playing : step === 3 ? t.done : " "}
        </p>
        <div className="demo__actions">
          <button
            type="button"
            className="button button--glass"
            onClick={playTour}
            disabled={playing}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M6.5 4.3a1 1 0 0 1 1.52-.85l8.2 5.7a1 1 0 0 1 0 1.7l-8.2 5.7A1 1 0 0 1 6.5 15.7z" />
            </svg>
            {t.replay}
          </button>
          <button
            type="button"
            className="button button--text"
            onClick={reset}
            disabled={playing || (!expanded && !sawLyrics)}
          >
            {t.reset}
          </button>
        </div>
        <p className="demo__note">{t.note}</p>
      </div>
    </div>
  );
}
