# Capstone Blog

An Express + EJS blog platform with image uploads, dynamic post pages, and a publishing form. Built as my capstone project at Temple.

## What it does

A working content management system for a blog. Visitors can read posts on the home page, click into individual post pages, and contribute their own posts through a form that supports image uploads.

## Features

- Image uploads via Multer, stored with timestamped filenames so nothing collides
- Dynamic routing for individual posts at `/post/:id`
- Relative timestamps like "2 hours ago" or "3 days ago" via a custom formatter
- Hybrid post system that mixes a few seeded default posts with user-submitted ones
- Responsive layout split into separate stylesheets for content, layout, and footer

## Tech Stack

- Node.js + Express 5
- EJS templating
- Multer for file uploads
- Body-parser for form data
- Vanilla CSS

## Running it locally

You need Node.js installed. Then:

\`\`\`bash
git clone https://github.com/dagem44/Blog-webpage.git
cd Blog-webpage
npm install
node index.js
\`\`\`

The app runs at http://localhost:3000.

## What's next

- Move the in-memory post store to SQLite so user posts survive a server restart
- Add edit and delete functionality
- Add basic authentication for the new-post page
- Render multi-paragraph posts properly (currently escapes line breaks)

## About

Built by Dagem Adamte. A CS major at Temple University with a certificate in Cybersecurity & Digital Forensics.
