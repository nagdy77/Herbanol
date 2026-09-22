import videoOneCover from '../assets/images/media/herbanol-facebook-video-1.jpg'
import videoTwoCover from '../assets/images/media/herbanol-facebook-video-2.jpg'
import videoThreeCover from '../assets/images/media/herbanol-facebook-video-3.jpg'

// Only user-supplied contact details and media links.
// Verified Google Maps embed supplied by the user; no street address inferred.
export const locationEmbedUrl: string =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.0238546152323!2d31.46974107620218!3d30.321839305373327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14580700720ec797%3A0xc90b4596f154ef8c!2zSGVyYmFub2wgQ29tcGFueS0g2YfZitix2KjYp9mG2YjZhA!5e0!3m2!1sen!2seg!4v1789925199907!5m2!1sen!2seg'

export const company = {
  // Egyptian local 01062097801 → international +20 106 209 7801.
  whatsapp: 'https://wa.me/201062097801',
  email: 'herbanol.co@gmail.com',
  emailHref: 'mailto:herbanol.co@gmail.com',
  linkedin: 'https://www.linkedin.com/company/herbanol-company/',
  facebook: 'https://www.facebook.com/p/Herbanol-Company-61569695805373/',
  videos: [
    'https://www.facebook.com/share/v/17DkSXvj4v/?mibextid=wwXIfr',
    'https://www.facebook.com/share/v/1MxdF9pHyn/?mibextid=wwXIfr',
    'https://www.facebook.com/share/v/183qUrTofV/?mibextid=wwXIfr',
  ],
} as const

// Exact og:image covers retrieved from the corresponding supplied video URLs.
// Local copies avoid expiring CDN signatures. Set a cover to null if unavailable.
export const videoCovers: ReadonlyArray<string | null> = [
  videoOneCover,
  videoTwoCover,
  videoThreeCover,
]
