/**
 * The "live presentation" transcript shown in the simulated video player.
 *
 * These lines are cycled on a fixed cadence while the player is "playing".
 * There is no audio track; the player is a *simulation* of a live broadcast,
 * and the transcript is its performance. The cadence (see Hero.tsx) is
 * deliberately regular and unhurried — a monotone that reads as authority.
 */
export const HERO_TRANSCRIPT: string[] = [
  "...and by the time you finish watching this, you'll already believe it worked...",
  "...I'm not selling you a product. I'm selling you the feeling of having wanted one...",
  "...this presentation has never been watched live. It has also never not been live...",
  "...somewhere, a version of you already bought this. You're just catching up to her...",
  "...the results are real. The reality behind the results is optional...",
];

/**
 * The fake "elapsed" clock horizon. The player's remaining time is computed
 * against a mod-90 window, so the displayed countdown recedes toward a
 * horizon that moves away exactly as fast as the visitor approaches it.
 * `TOTAL_SECONDS` (17:42) is the illusion's base duration; `WINDOW_SECONDS`
 * (90) is the cycle the progress bar and remainder are computed against.
 */
export const TOTAL_SECONDS = 17 * 60 + 42;
export const WINDOW_SECONDS = 90;

/** How often a transcript line advances while playing, in ms. */
export const LINE_ADVANCE_MS = 3200;
