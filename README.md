# QuickNotes

QuickNotes is a small browser-based note app for capturing reminders and ideas, organizing them into Personal, Work, and Study categories, and finding them again with search. Notes are stored in the browser, so they remain available after a refresh on the same device and browser.

## Features

- Add notes with a category and readable creation date
- Validate empty notes and limit note text to 200 characters
- Search note text without case sensitivity
- Delete individual notes or clear all notes with confirmation
- Save notes in localStorage so they survive a refresh
- Responsive layout for desktop and mobile screens

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern web browser.

No build tools or dependencies are required.

## What I learned

- How semantic HTML, labels, and form controls make a page easier to use.
- How to create DOM elements safely with `createElement` and `textContent`.
- How to model notes as objects and update the interface from an array.
- How JSON and localStorage preserve app data between page loads.
- How search, validation, and event listeners support useful interactions.