# Cutover checklist — aarianhealth.com.au

Work top to bottom. Nothing here is reversible by itself, but every step has a rollback.

## 0. Before you touch anything

- [ ] Export the current DNS zone file for `aarianhealth.com.au` and save it somewhere you can find under pressure. This is the rollback.
- [ ] Confirm you can log in to the pharmacy portal at `pharmacy.smaarthub.aarianhealth.com.au` right now, so you know what "working" looks like.
- [ ] Confirm `knowdiabetes.aarianhealth.com.au` resolves.
- [ ] Lower the TTL on the apex and `www` records to 300 seconds. Wait at least 24 hours before step 3.

## 1. Turn off staging mode

- [ ] Replace `robots.txt` with the contents of `robots.production.txt`, then delete `robots.production.txt`.
- [ ] Delete the `X-Robots-Tag` `[[headers]]` block from `netlify.toml`. It is the first headers block and is marked STAGING ONLY.
- [ ] Deploy and confirm `https://<site>.netlify.app/robots.txt` now says `Allow: /`.

If you skip either of these, the production site stays out of Google entirely.

## 2. DNS — the step that can take the pharmacy portal down

`pharmacy.smaarthub.aarianhealth.com.au` and `knowdiabetes.aarianhealth.com.au` are subdomains of
the domain you are pointing at Netlify. They are served from somewhere else and they must not move.

**Use external DNS. Do not let Netlify take over the nameservers.**

If Netlify DNS takes over, your existing zone is replaced with an empty Netlify zone, every
subdomain record disappears, and pharmacies cannot log in.

- [ ] Leave the nameservers exactly where they are.
- [ ] In the existing DNS zone, change ONLY these two records:
      - apex `aarianhealth.com.au` → the A record Netlify gives you for external DNS
      - `www` → CNAME to your Netlify site hostname
- [ ] Touch nothing else in the zone.
- [ ] In Netlify, add `aarianhealth.com.au` as a custom domain and let it issue the certificate.

## 3. Verify before you walk away

- [ ] Pharmacy portal login still works.
- [ ] KnowDiabetes still resolves.
- [ ] `https://aarianhealth.com.au/` serves the new site over HTTPS with a valid certificate.
- [ ] `www` redirects to the apex (or the other way, but pick one and be consistent).
- [ ] Spot check redirects, each should be a single 301 with no chain:
      - `/platforms/pharma-campaigns` → pharmacampaigns.com.au
      - `/platforms/smaart-hub` → `/services`
      - `/case-studies/accelerating-customer-acquisition-via-smart-hub` → the new slug
      - `/about` → `/about-us`

## 4. Search Console

- [ ] Submit `https://aarianhealth.com.au/sitemap.xml`.
- [ ] Export the Pages report first, so you have a record of what was indexed before the change.
- [ ] Use URL Inspection on the homepage and request indexing.
- [ ] Check the Coverage and 404 reports daily for the first week, weekly for a month.

## 5. Restore TTLs

- [ ] Once stable for 48 hours, put the apex and `www` TTLs back to their normal values.

---

## Still outstanding before this site should go live

- [ ] Four case studies contain visible `[PLACEHOLDER - confirm attribution]` text and one has a
      placeholder metrics note. These render on the page. They must be replaced with real numbers
      and real attributions, or the affected blocks removed.
- [ ] Homepage title and meta description still describe the previous positioning.
- [ ] `assets/img/og-default.jpg` is a generated placeholder: brand navy plus the logo. Replace it
      with a properly designed 1200x630 social card.
- [ ] The navy in that card is a guess. Swap it for the real brand value.
