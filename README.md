# Sage AI

An AI-powered search engine with a generative UI.

## 🧱 Stack

- App framework: [Next.js](https://nextjs.org/)
- Text streaming / Generative UI: [Vercel AI SDK](https://sdk.vercel.ai/docs)
- Generative Model: [OpenAI](https://openai.com/)
- Authentication: [Kinde Auth](https://kinde.com/)
- Search API: [Tavily AI](https://tavily.com/) / [Serper](https://serper.dev)
- Reader API: [Jina AI](https://jina.ai/)
- Serverless Database: [Upstash](https://upstash.com/)
- Component library: [shadcn/ui](https://ui.shadcn.com/)
- Headless component primitives: [Radix UI](https://www.radix-ui.com/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)

## 🚀 Quickstart

### 1. Fork and Clone repo

Fork the repo to your Github account, then run the following command to clone the repo:

```
git clone git@github.com:[YOUR_GITHUB_ACCOUNT]/sage-ai.git
```

### 2. Install dependencies

```
cd sage-ai
bun install
```

### 3. Setting up Upstash Redis

Follow the guide below to set up Upstash Redis. Create a database and obtain `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. Refer to the [Upstash guide](https://upstash.com/blog/rag-chatbot-upstash#setting-up-upstash-redis) for instructions on how to proceed.

### 4. Fill out secrets

```
cp .env.local.example .env.local
```

Your .env.local file should look like this:

```
# OpenAI API key retrieved here: https://platform.openai.com/api-keys
OPENAI_API_KEY=

# Tavily API Key retrieved here: https://app.tavily.com/home
TAVILY_API_KEY=

# Upstash Redis URL and Token retrieved here: https://console.upstash.com/redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

_Note: This project focuses on Generative UI and requires complex output from LLMs. Currently, it's assumed that the official OpenAI models will be used. Although it's possible to set up other models, if you use an OpenAI-compatible model, but we don't guarantee that it'll work._

### 5. Run app locally

```
bun dev
```

You can now visit http://localhost:3000.

### Cloudflare Pages

1. Fork the repo to your GitHub.
2. Create a Cloudflare Pages project.
3. Select `SageAI` repo and `Next.js` preset.
4. Set `OPENAI_API_KEY` and `TAVILY_API_KEY` env vars.
5. Save and deploy.
6. Cancel deployment, go to `Settings` -> `Functions` -> `Compatibility flags`, add `nodejs_compat` to preview and production.
7. Redeploy.
