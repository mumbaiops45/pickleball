/**
 * Name and email rules shared by every form on the site — login, register,
 * checkout address, contact, forgot password and the newsletter — so a value
 * one form accepts is never rejected by another. The backend repeats them in
 * src/utils/validators.js.
 */

export const NAME_MIN = 2;
export const NAME_MAX = 50;

/** Letters, spaces and the punctuation real names carry. `\p{L}\p{M}` rather
 *  than A-Z, so Devanagari and Telugu names pass — their vowel signs are marks,
 *  not letters. Both apostrophes are allowed because phones substitute the
 *  curly one. Digits and symbols fail. */
export const NAME_REGEX = /^[\p{L}][\p{L}\p{M}\s.'’-]*$/u;

/** Drops what a name can never contain, as it is typed, so a digit simply
 *  does not appear in the box. */
export function cleanName(value) {
  return value.replace(/[^\p{L}\p{M}\s.'’-]/gu, "").replace(/\s{2,}/g, " ");
}

/** "" when the name is fine, otherwise the message to show. */
export function nameError(value) {
  const name = String(value ?? "").trim();
  if (!name) return "Please enter your full name.";
  if (/\d/.test(name)) return "Name cannot contain numbers.";
  if (!NAME_REGEX.test(name)) return "Use letters only — no numbers or symbols.";
  if (name.replace(/[^\p{L}]/gu, "").length < NAME_MIN)
    return "Please enter your full name.";
  if (name.length > NAME_MAX) return `Name must be under ${NAME_MAX} characters.`;
  return "";
}

/**
 * name@domain.tld: the local part and each domain label start and end with a
 * letter or digit, no two dots in a row, and the top-level domain is at least
 * two letters. So `asha@gmail` and `asha@gmail.c` fail, `asha@gmail.com` and
 * `asha.rao@company.co.in` pass.
 */
export const EMAIL_REGEX =
  /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,62}[A-Za-z0-9])?@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;

/** Misspellings of the big providers that are still valid-looking addresses —
 *  mail sent to them bounces, so they are caught with a suggestion. */
const DOMAIN_TYPOS = {
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "gmail.cm": "gmail.com",
  "gmail.om": "gmail.com",
  "gmail.cmo": "gmail.com",
  "gmail.in": "gmail.com",
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gnail.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "gmal.com": "gmail.com",
  "yahoo.con": "yahoo.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "hotmail.con": "hotmail.com",
  "hotmial.com": "hotmail.com",
  "outlook.con": "outlook.com",
  "outlok.com": "outlook.com",
  "rediffmail.con": "rediffmail.com",
};

/**
 * "" when the email is fine, otherwise the message to show.
 *
 * `typos: false` skips the misspelt-domain check — used where the address
 * must match an existing account (login, password reset), since an account
 * created before this rule may genuinely use one of those domains.
 */
export function emailError(value, { typos = true } = {}) {
  const email = String(value ?? "").trim();
  if (!email) return "Please enter your email address.";
  if (/\s/.test(email)) return "Email address cannot contain spaces.";
  if (email.length > 254) return "That email address is too long.";
  if (!email.includes("@")) return "Email address must include @, like name@gmail.com.";
  if (email.includes("..")) return "Please enter a valid email address, like name@gmail.com.";
  if (!EMAIL_REGEX.test(email))
    return "Please enter a valid email address, like name@gmail.com.";

  if (!typos) return "";

  const [local, domain] = email.toLowerCase().split("@");
  const fix = DOMAIN_TYPOS[domain] ?? (domain.endsWith(".con") ? `${domain.slice(0, -4)}.com` : null);
  if (fix) return `Did you mean ${local}@${fix}?`;

  return "";
}
