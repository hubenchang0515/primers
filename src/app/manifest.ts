export const dynamic = 'force-static';
import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    id:'/primers/',
    name: 'Primers 编程伙伴',
    short_name: 'Primers',
    description: 'Primers 致力于为各类编程学习者提供全面、系统的编程教程和实践资源。无论你是编程新手，还是有一定基础的开发者，Primers 都提供了适合的学习路径和丰富的实战项目，帮助你从零开始，逐步掌握编程技能，成为一名优秀的开发者。',
    start_url: '/primers',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/primers/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: "any"
      },
      {
        src: '/primers/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: "any"
      },
    ],
    screenshots: [
      {
        src: '/primers/preview1.png',
        sizes: '3840x1970',
        form_factor: 'wide',
      },
      {
        src: '/primers/preview2.png',
        sizes: '3840x1970',
        form_factor: 'wide',
      },
      {
        src: '/primers/preview3.png',
        sizes: '3840x1970',
        form_factor: 'wide',
      },
      {
        src: '/primers/preview4.png',
        sizes: '1290x2796',
        form_factor: 'narrow',
      },
      {
        src: '/primers/preview5.png',
        sizes: '1290x2796',
        form_factor: 'narrow',
      },
      {
        src: '/primers/preview6.png',
        sizes: '1290x2796',
        form_factor: 'narrow',
      }
    ]
  }
}