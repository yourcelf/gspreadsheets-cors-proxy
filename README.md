Google Spreadsheets CORS proxy
==============================

This is a dead simple proxy to support CORS requests to the
[Google Spreadsheets API](https://developers.google.com/google-apps/spreadsheets/).

Installation
------------

    git clone https://github.com/yourcelf/gspreadsheets-cors-proxy.git
    cd gspreadsheets-cors-proxy
    npm install

Usage
-----

Fire up the server:

    npm start

Instead of making API requests to
``https://spreadsheets.google.com/feeds/...``, instead make the request to
``http://localhost:5000/feeds/...`` (or wherever you install the server).
Requests that respond to CORS permissions are intercepted to tell the browser
that it's allowed to do AJAX with the API.

Configuration
-------------

Set the port with ``PORT`` environment variable, e.g. ``PORT=5678 npm start``.
