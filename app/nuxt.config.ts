export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
      scopusApiKey: process.env.SCOPUS_API_KEY
    }
  },
  modules: ['../src/module.ts', '@formkit/nuxt', 'nuxt-icon'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  nitro: {
    plugins: ['~/server/index.ts']
  },
  build: {
    transpile: ['jsonwebtoken']
  },
  auth: {
    provider: {
      type: 'refresh',
      endpoints: {
        getSession: { path: '/user' },
        refresh: { path: '/refresh', method: 'post' }
      },
      pages: {
        login: '/login',
        signup: '/signup'
      },
      token: {
        signInResponseTokenPointer: '/token/accessToken',
        maxAgeInSeconds: 60 * 5, // 5 min
        sameSiteAttribute: 'lax'
      },
      refreshToken: {
        signInResponseRefreshTokenPointer: '/token/refreshToken'
      }
    },
    globalAppMiddleware: {
      isEnabled: false
    }
  },
  formkit: {
    autoImport: true
  },
  experimental: {
    renderJsonPayloads: false
  },
  vite: {
    esbuild: {
      target: "esnext",
    },
    build: {
      target: "esnext",
    },
    optimizeDeps: {
      include: ["@project-serum/anchor", "@solana/web3.js", "buffer"],
      esbuildOptions: {
        target: "esnext",
      },
    },
    define: {
      "process.env.BROWSER": true,
    },
  },
})
