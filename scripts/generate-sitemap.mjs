// TODO: update sitema with this guide
// TODO: https://leerob.io/blog/nextjs-sitemap-robots

import { writeFileSync } from 'fs'
import { globby } from 'globby'
const homeURL = 'https://www.houseofjesho.com'

;(async () => {
  try {
    console.log('generating sitemap..')

    const pages = await globby([
      'pages/*.tsx',
      'pages/**/*.tsx',
      '!pages/_*.tsx',
      '!pages/404.tsx',
      '!pages/cart.tsx',
      '!pages/checkout.tsx',
      '!pages/order.tsx',
      '!pages/api/**/*.tsx',
      '!pages/admin/_*.tsx',
      '!pages/admin/**/*.tsx',
    ])

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace('pages/', '/')
                  .replace('.tsx', '')
                  .replace('/index', '')
                  .replace('pages', '')
                  .replace('contents', '')
                  .replace('.tsx', '')
                  .replace('.mdx', '')
                const route = path === '/index' ? '' : path
                const fullUrl = `${homeURL}${route}`
                // console.log(fullUrl)
                return `
                        <url>
                            <loc>${fullUrl}</loc>
                        </url>
                    `
              })
              .join('')}
        </urlset>`

    writeFileSync('public/sitemap.xml', sitemap)
    console.log('SITEMAP GENERATED !!!')
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
})()
