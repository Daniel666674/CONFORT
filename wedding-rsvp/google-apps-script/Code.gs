/**
 * Wedding RSVP backend — Google Apps Script Web App.
 *
 * Setup (see ../SETUP.md for the full walkthrough):
 *   1. Create a Google Sheet.
 *   2. Extensions > Apps Script, paste this file in as Code.gs.
 *   3. Deploy > New deployment > Web app.
 *        Execute as: Me
 *        Who has access: Anyone
 *   4. Copy the deployment's Web App URL (ends in /exec) into
 *      APPS_SCRIPT_URL at the top of both wedding-invite.html and
 *      wedding-rsvp-dashboard.html.
 */

var SHEET_NAME = 'RSVPs';

function doGet(e) {
  var sheet = getSheet();
  var action = (e.parameter.action || 'list');

  if (action === 'stats') {
    return jsonResponse(computeStats(sheet));
  }
  return jsonResponse({ rows: getRows(sheet) });
}

function doPost(e) {
  var sheet = getSheet();
  var p = e.parameter;

  var name = (p.name || '').trim();
  var attending = (p.attending || '').trim().toLowerCase();
  var guests = Number(p.guests || 0);
  var notes = (p.notes || '').trim();
  var message = (p.message || '').trim();

  if (!name || (attending !== 'yes' && attending !== 'no')) {
    return jsonResponse({ ok: false, error: 'Missing required fields: name and attending (yes/no).' });
  }

  sheet.appendRow([
    new Date(),
    name,
    attending,
    attending === 'yes' ? Math.max(1, guests) : 0,
    notes,
    message
  ]);

  return jsonResponse({ ok: true });
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Name', 'Attending', 'Guests', 'Dietary Notes', 'Message']);
  }
  return sheet;
}

function getRows(sheet) {
  var values = sheet.getDataRange().getValues();
  var rows = values.slice(1); // drop header row
  return rows
    .filter(function (r) { return r[1]; }) // skip blank rows
    .map(function (r) {
      return {
        timestamp: r[0] instanceof Date ? r[0].toISOString() : r[0],
        name: r[1],
        attending: r[2],
        guests: Number(r[3]) || 0,
        notes: r[4],
        message: r[5]
      };
    });
}

function computeStats(sheet) {
  var rows = getRows(sheet);
  var total = rows.length;
  var confirmed = rows.filter(function (r) { return r.attending === 'yes'; }).length;
  var declined = rows.filter(function (r) { return r.attending === 'no'; }).length;
  var headcount = rows.reduce(function (sum, r) { return sum + r.guests; }, 0);

  return {
    total: total,
    confirmed: confirmed,
    declined: declined,
    headcount: headcount,
    confirmedPct: total ? Math.round((confirmed / total) * 100) : 0,
    declinedPct: total ? Math.round((declined / total) * 100) : 0,
    rows: rows
  };
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
