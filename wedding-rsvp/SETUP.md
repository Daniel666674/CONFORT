# Wedding RSVP — Setup Guide

This gives you a wedding invitation page with an RSVP form, plus a live
dashboard showing confirmed/declined counts, percentages, and total guest
headcount. Responses are stored in a Google Sheet you own — free, no
server to run.

Files:
- `wedding-invite.html` — the page you send to guests.
- `wedding-rsvp-dashboard.html` — private page only you should open, showing stats.
- `google-apps-script/Code.gs` — the backend script that connects the two to your Sheet.

## 1. Create the Google Sheet + backend (~5 minutes)

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank sheet. Name it e.g. "Wedding RSVPs".
2. In the sheet, open **Extensions > Apps Script**.
3. Delete any starter code in the editor, then paste in the full contents of `google-apps-script/Code.gs`.
4. Save the project (any name is fine, e.g. "RSVP Backend").
5. Click **Deploy > New deployment**.
   - Click the gear icon next to "Select type" and choose **Web app**.
   - Description: anything (e.g. "RSVP endpoint").
   - **Execute as:** Me.
   - **Who has access:** Anyone.
   - Click **Deploy**.
6. Google will ask you to authorize the script — approve it (it's your own script acting on your own sheet).
7. Copy the **Web app URL** shown (it ends in `/exec`). You'll need it twice below.

The script auto-creates an `RSVPs` tab in your sheet with columns:
`Timestamp | Name | Attending | Guests | Dietary Notes | Message`.

## 2. Connect the two HTML pages

1. Open `wedding-invite.html` in a text editor, find this line near the bottom:
   ```js
   const APPS_SCRIPT_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
   Replace the placeholder with your `/exec` URL from step 1.7.
2. Do the same in `wedding-rsvp-dashboard.html`.

## 3. Customize the invite

Open `wedding-invite.html` and edit the text marked `<!-- EDIT ME -->`:
- Couple names, date, ceremony/reception details.
- The RSVP deadline sentence.
- Max guests per party — the `guests` input has `max="10"`; lower/raise it if needed.

## 4. Publish and send

Any static host works (GitHub Pages, Netlify, Vercel, or even emailing the
file). If you host this repo on GitHub Pages, the page will be reachable at
a URL like:

```
https://<your-username>.github.io/<repo-name>/wedding-rsvp/wedding-invite.html
```

Send that link to your guests (text, email, or a QR code pointing to it).

## 5. Track responses

Open `wedding-rsvp-dashboard.html` yourself (keep this link private — it's
for you, not guests) to see:
- Total responses, confirmed, declined, and their percentages.
- Total guest headcount (for catering/seating).
- Optionally enter **"Total invitations sent"** at the top to also see
  pending replies and your overall response rate — this number is only
  saved in your own browser, not the shared sheet.
- A searchable, sortable table of every response, including dietary notes
  and messages.

Click **Refresh** anytime, or turn on **Auto-refresh** to update every 60s.
You can also open the Google Sheet directly at any time to see the raw data.

## Troubleshooting

- **"Setup incomplete" banner** — the Apps Script URL placeholder wasn't replaced in one of the two HTML files.
- **RSVP submits but the dashboard shows nothing** — double check both files point to the *same* `/exec` URL.
- **Authorization errors when deploying** — make sure "Execute as" is set to **Me** and "Who has access" is set to **Anyone**.
- **Need to change the form later** — edit `Code.gs` in the Apps Script editor, then **Deploy > Manage deployments > Edit > New version** so changes go live.
