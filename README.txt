================================================================================
  Sahithi & Mohan Varma - Cinematic Luxury Wedding Invitation (Demo)
================================================================================

  A beautiful, responsive, cinematic wedding invitation website you can open
  on your MacBook and show to your parents before the final wedding details are
  confirmed.

  This is a DEMO version. The venue is listed as "Venue details to be announced"
  and no real family names or addresses have been invented, as requested.

--------------------------------------------------------------------------------
  PROJECT FILES
--------------------------------------------------------------------------------

  sahithi-mohan-wedding-demo/     <- project folder
  |- index.html        <- website structure (HTML)
  |- style.css         <- all styling and responsive layout (CSS)
  |- script.js         <- animations, countdown, music, sharing (JavaScript)
  |- README.txt        <- this file

  A ZIP archive (sahithi_mohan_wedding_demo.zip) containing the whole folder
  is also provided.

--------------------------------------------------------------------------------
  1. HOW TO DOWNLOAD AND EXTRACT THE ZIP ON macOS
--------------------------------------------------------------------------------

  a. Download the file "sahithi_mohan_wedding_demo.zip" to your MacBook
     (usually it lands in your "Downloads" folder).

  b. Open "Downloads" in Finder and double-click "sahithi_mohan_wedding_demo.zip".

  c. macOS will automatically unzip it and create a folder called
     "sahithi-mohan-wedding-demo" in the same location.

  d. (Optional) Drag that folder to your Desktop or Documents folder so it is
     easy to find.

--------------------------------------------------------------------------------
  2. HOW TO OPEN THE PROJECT FOLDER
--------------------------------------------------------------------------------

  a. Open Finder.

  b. Navigate to wherever you saved/extracted the folder
     (e.g., Desktop > sahithi-mohan-wedding-demo).

  c. Double-click the folder to open it. You should see four files:
     index.html, style.css, script.js and README.txt.

--------------------------------------------------------------------------------
  3. HOW TO RUN THE INVITATION (OPEN index.html IN SAFARI)
--------------------------------------------------------------------------------

  a. Make sure Safari is installed on your MacBook (it comes with macOS).

  b. In Finder, open the "sahithi-mohan-wedding-demo" folder.

  c. Double-click "index.html". It will open in your default web browser.

     If it opens in another browser instead of Safari:
       - Right-click (or Control-click) on "index.html".
       - Choose "Open With" > "Safari".

  d. You will see a beautiful sealed envelope on screen. This is the demo home
     screen. Tap the envelope or the wax seal to open the invitation.

--------------------------------------------------------------------------------
  4. HOW TO TEST THE ENVELOPE ANIMATION AND INTERACTIVE FEATURES
--------------------------------------------------------------------------------

  - Envelope animation:
      * Tap the envelope, the wax seal, or move your cursor near it on desktop.
      * The wax seal cracks and dissolves, the envelope flap opens in 3D, the
        invitation card slides up, and the full wedding invitation is revealed
        with a cinematic transition.
      * Tap "Replay" (top-left) to return to the sealed envelope and replay the
        animation.

  - Wedding details:
      * The invitation shows Sahithi & Mohan Varma, Wednesday 23 December 2026,
        8:00 PM IST, with "Venue details to be announced."

  - Countdown:
      * A live timer counts down Days, Hours, Minutes and Seconds to the wedding
        (8:00 PM IST on 23 December 2026).
      * It works no matter what time zone your MacBook is set to.
      * After the wedding date passes, it shows a post-wedding message
        automatically.

  - Background music:
      * Tap "Music: Off" to play soft romantic instrumental music.
      * Tap again ("Music: On") to pause it.
      * Music never autoplay without your tap. If audio cannot play for any
        reason, the site still works normally.

  - Share on WhatsApp:
      * Tap "Share on WhatsApp" to open WhatsApp with a prefilled invitation
        message (works on iPhone and desktop WhatsApp Web/Desktop app).
      * On a local file (not hosted online), the link will point to your
        computer only - see section 6 for making it public.

  - Copy invitation link:
      * Tap "Copy invitation link" to copy the page URL and see "Link copied!".
      * On a local file this copies a file:// address that only works on your
        MacBook - see section 6 for a public link.

--------------------------------------------------------------------------------
  5. HOW TO PUBLISH THE WEBSITE FOR FREE USING GITHUB PAGES
--------------------------------------------------------------------------------

  GitHub Pages lets you host a static website for free. You need a free
  GitHub account (github.com).

  Step A - Create a GitHub repository:
  1. Sign in to github.com (or create a free account).
  2. Click the "+" icon (top-right) > "New repository".
  3. Name it something like "sahithi-mohan-wedding-demo".
  4. Choose "Public" so GitHub Pages works on the free plan.
  5. Do NOT check "Add a README file" (we already have our own files).
  6. Click "Create repository".

  Step B - Upload the project files:
  7. On the repository page, click "uploading an existing file" (or the
     "Add file" > "Upload files" button).
  8. Drag and drop these four files into the upload area:
     index.html, style.css, script.js, README.txt
     (Upload them at the root of the repo, not inside a subfolder.)
  9. Scroll down and click "Commit changes".

  Step C - Enable GitHub Pages:
  10. In your repository, click the "Settings" tab (top right).
  11. In the left sidebar, click "Pages".
  12. Under "Build and deployment" > "Branch", select "main" (or "master") and
      folder "/ (root)", then click "Save".
  13. Wait 1-2 minutes. GitHub will show a green message with your website
      URL, e.g. https://yourusername.github.io/sahithi-mohan-wedding-demo/

--------------------------------------------------------------------------------
  6. HOW TO OBTAIN THE PUBLIC HTTPS WEBSITE URL
--------------------------------------------------------------------------------

  After enabling GitHub Pages (step 5), GitHub displays your public URL on the
  "Pages" settings page. It looks like:

      https://<your-github-username>.github.io/<repository-name>/

  Copy that full address (including https://). This is the link you can send to
  family and guests so they can open the invitation on any phone or computer.

--------------------------------------------------------------------------------
  7. HOW TO SHARE THAT URL WITH FAMILY AND GUESTS USING WHATSAPP
--------------------------------------------------------------------------------

  Once your site is hosted and you have the public HTTPS URL:

  a. Open the invitation website on your iPhone (Safari) or on WhatsApp Web
     on your MacBook.

  b. Tap the "Share on WhatsApp" button on the website - it opens WhatsApp with
     a prefilled message containing the date, time, venue note, and your public
     website link.

  c. Choose a contact or group (e.g., a family WhatsApp group) and send it.

  Or simply copy the public URL (from GitHub Pages) and paste it into any
  WhatsApp chat along with your own message.

  NOTE: Sharing a locally opened HTML file (file://) does NOT create a public
  invitation link - only people with access to your computer could open it.
  Guests need the public HTTPS URL from GitHub Pages (or another host).

--------------------------------------------------------------------------------
  TECHNICAL NOTES
--------------------------------------------------------------------------------

  - This is a lightweight static website: HTML, CSS and JavaScript only.
  - No React, database, backend, or paid API is required.
  - Fonts are loaded from Google Fonts (Cormorant Garamond + Lato).
  - Background music is generated in-browser (no audio file to download).
  - Responsive design: works on iPhones, Android phones, tablets, laptops and
    desktop screens, and respects "reduce motion" preferences.
  - Host it free on GitHub Pages, Netlify, Vercel, or any static host.

================================================================================
