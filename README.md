# FlowPost

FlowPost is a lightweight web tool for turning plain-text research notes, report summaries, and long-form analysis into mobile-friendly share images.

## Features

- Paste plain text and generate a clean long-form share card.
- Automatically uses the first paragraph as the article title when the title field is empty.
- Detects section headings such as `1/ 财报层面还是很强`.
- Editable subtitle, watermark, QR code link, footer title, and footer subtitle.
- Subtle tiled watermark across the generated image.
- Footer QR code for subscriptions, communities, or source links.
- One-click PNG export in the browser.
- Theme presets including 墨蓝, 晨光, and 黑白.

## Tech Stack

- Vite
- React
- TypeScript
- html-to-image
- qrcode.react
- lucide-react

## Local Development

Install dependencies:

```bash
yarn install
```

Start the development server:

```bash
yarn dev
```

Build for production:

```bash
yarn build
```

Preview the production build:

```bash
yarn preview
```

## Vercel Deployment

This project is a standard Vite static site and can be deployed directly to Vercel.

Recommended Vercel settings:

- Framework Preset: `Vite`
- Build Command: `yarn build`
- Output Directory: `dist`
- Install Command: `yarn install`

After connecting the GitHub repository to Vercel, every push to the production branch can trigger a fresh deployment.

## Default Branding

The current default share image settings are:

- Watermark: `社会观察从业者`
- QR Code URL: `https://t.zsxq.com/xvVXu`
- Footer Title: `社会观察从业者`
- Footer Subtitle: `公众号&知识星球`

