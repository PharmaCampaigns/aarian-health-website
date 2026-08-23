# Aarian Health website

Static HTML site, no build step. Deployed to Netlify from the main branch of
PharmaCampaigns/aarian-health-website.

## Working rules

1. Never commit or push without my explicit confirmation. Make the change, show it
   to me, then wait. "Make the change" is not permission to push.
2. Always show me the change running locally first. Start the preview server with
   python3 dev_server.py and tell me which URL to open. Never tell me to open the
   HTML file directly: internal links are root relative and will not resolve.
3. Change only what I asked for. Do not tidy, reformat or improve anything else.
4. Ask before adding any dependency, build step or framework. This site is
   deliberately plain HTML and CSS.

## House style

- British and Australian English.
- Never frame anything negatively or against competitors. Say what we do and what
  the category needs, never what others get wrong.
- No dashes in body copy. Use commas, colons or full stops.
- The contact email is always info@aarianhealth.com.au, never hello@.

## Do not break

- privacy-policy/index.html must stay reachable at /privacy-policy/.
  PharmaCampaigns links to it from its footer and its newsletter consent line.
- robots.txt blocks all crawling on purpose while this is staging. See CUTOVER.md.
- _redirects maps every legacy URL from the old site. Do not remove rules.
- Internal links are root relative and extensionless: /about-us, not about-us.html.
