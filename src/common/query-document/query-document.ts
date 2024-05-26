export const q = <T = HTMLElement>(selector: string) => document.querySelector(selector) as T;
export const qq = <T = HTMLElement>(selector: string) => Array.from(document.querySelectorAll(selector)) as T[];
