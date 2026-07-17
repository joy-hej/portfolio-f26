import tributaryImg from './assets/portfolio/tributary/tributary.png'
import lightModeImg from './assets/portfolio/light-mode/light-mode.png'
import nudgeImg from './assets/portfolio/nudge/nudge.png'
import whereableImg from './assets/portfolio/whereable/whereable.png'
import colorPickerImg from './assets/portfolio/play/color-picker-card.png'
import colorPickerVideo from './assets/portfolio/play/color-picker-card.mp4'
import duetMugImg from './assets/portfolio/play/duet-mug-card.png'
import noiseImg from './assets/portfolio/play/noise-card.png'
import noiseVideo from './assets/portfolio/play/noise-card.mp4'
import auraImg from './assets/portfolio/play/aura-card.png'
import chatHellImg from './assets/portfolio/play/chat-hell-card.png'
import oceanImg from './assets/portfolio/play/ocean-card.png'
import oceanVideo from './assets/portfolio/play/ocean-card.mp4'
import slopImg from './assets/portfolio/play/slop-card.png'

export const PROJECTS = [
  {
    id: 'tributary',
    title: 'Tributary',
    year: '2026',
    description:
      'An interactive installation that allows viewers to experience (and eat!) the impacts of different rice farming methods.',
    image: tributaryImg,
    alt: 'Tributary project',
    path: '/work/tributary',
  },
  {
    id: 'light-mode',
    title: 'Light Mode',
    year: '2025',
    description:
      'A lamp that detects and reacts to the stand you place it on; experimenting with tactile, physical forms of interaction',
    image: lightModeImg,
    alt: 'Light Mode lamp variants',
    path: '/work/light-mode',
  },
  {
    id: 'nudge',
    title: 'Nudge',
    year: '2025',
    description:
      'An ambient computing furniture system that reminds you to bring your stuff when leaving the house—without any screens.',
    image: nudgeImg,
    alt: 'Nudge project',
    path: '/work/nudge',
  },
  {
    id: 'whereable',
    title: 'WhereAble',
    year: '2024',
    description:
      'A haptic wearable that tells people with hearing loss which direction sound is coming from.',
    image: whereableImg,
    alt: 'WhereAble wearable prototype',
    path: '/work/whereable',
  },
]

export const PLAY_PROJECTS = [
  {
    id: 'color-picker-lamp',
    title: 'Color-Picker Lamp',
    year: '2026',
    description:
      'A lamp that demonstrates RGB and HSL colorspace, letting you navigate and adjust the color directly.',
    image: colorPickerImg,
    video: colorPickerVideo,
    alt: 'Color-picker lamp with glowing glass block',
    path: '/play/color-picker-lamp',
    stub: false,
  },
  {
    id: 'duet-mug',
    title: 'Duet Mug',
    year: '2025',
    description:
      'Ceramics for disability and dignity. A two-handled mug that avoids the medicalized and/or sippy-cup look of most assistive drinkware.',
    image: duetMugImg,
    alt: 'Handbuilt Duet mug with branched dual handles on wood',
    path: '/play/duet-mug',
    stub: false,
  },
  {
    id: 'noise-cancellation',
    title: 'Noise Cancellation',
    year: '2025',
    description:
      'An interactive iPod-shaped plywood installation housing a video essay on growing up with cochlear implants.',
    image: noiseImg,
    video: noiseVideo,
    alt: 'Noise Cancellation iPod installation covered in ivy',
    path: '/play/noise-cancellation',
    stub: false,
  },
  {
    id: 'aura',
    title: 'Aura',
    year: '2025',
    description:
      'Hearing jewelry — silversmithing and digital fabrication exploring assistive devices that are allowed to be seen.',
    image: auraImg,
    alt: 'Hand-forged silver wire ear-cuff study',
    path: '/play/aura',
    stub: false,
  },
  {
    id: 'chat-am-i-going-to-hell',
    title: 'chat, am i going to hell?',
    year: '2026',
    description:
      'A confessional booth exploring how people confess to AI — exhibited at Intersection of Art and Technology (SF) in if, then, amen.',
    image: chatHellImg,
    alt: 'Visitor using the chat am i going to hell confessional booth in a gallery',
    path: '/play/chat-am-i-going-to-hell',
    stub: false,
  },
  {
    id: 'ocean-eyes',
    title: 'Ocean Eyes',
    year: '2025',
    description:
      'A projection-mapped eye sculpture that watches its viewer—and speaks when someone sits down.',
    image: oceanImg,
    video: oceanVideo,
    alt: 'Ocean Eyes glowing projection-mapped sculpture',
    path: '/play/ocean-eyes',
    stub: false,
  },
  {
    id: 'slop-bowl',
    title: 'Slop bowl',
    year: '2025',
    description:
      'A projection-mapped toilet where flushing sends slop swirling down the drain, only for more to bubble back up. Built in TouchDesigner.',
    image: slopImg,
    alt: 'Projected light shimmering inside a toilet bowl installation',
    href: 'https://www.instagram.com/p/DabcG8ITwtw/',
    stub: false,
  },
]

export const NAV_ITEMS = [
  { id: 'work', label: 'work', to: '/#work' },
  { id: 'play', label: 'play', to: '/play' },
  { id: 'about', label: 'about', to: '/about' },
  { id: 'resume', label: 'resume', to: '/resume' },
]

export function projectById(id) {
  return PROJECTS.find((p) => p.id === id)
}

export function playProjectById(id) {
  return PLAY_PROJECTS.find((p) => p.id === id)
}
