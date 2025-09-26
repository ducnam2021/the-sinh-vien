<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ewTCNtNGBbB0Q2NYpCRCqbAKYgpn4QpO

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create a `.env.local` file and set the `VITE_GEMINI_API_KEY` to your Gemini API key (optional when you only need placeholder photos)
3. Run the type checker (recommended before committing changes):
   `npm run typecheck`
4. Start the development server:
   `npm run dev`

To create a production build, run `npm run build`. You can preview the optimized output locally with `npm run preview`.

## Deploy to the Web

The app is a standard Vite + React project, so any static web host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.) can serve it:

1. Set the `VITE_GEMINI_API_KEY` environment variable in your hosting provider if you want AI generated portraits. If you skip this step the app will automatically fall back to placeholder photos, so it remains fully functional on public demos.
2. Build the project with `npm run build`. This produces the production-ready assets under the `dist/` directory.
3. Deploy the contents of `dist/` to your hosting provider following their deployment guide (for example, push the repository to Vercel or upload the folder to Netlify).

> Tip: Because the Gemini API key is sensitive, prefer storing it as an environment variable in your hosting dashboard rather than committing it to the repository.
