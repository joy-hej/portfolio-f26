import locationIcon from './assets/portfolio/location.svg'
import bookIcon from './assets/portfolio/book.svg'
import tributaryImg from './assets/portfolio/tributary.png'
import lightModeImg from './assets/portfolio/light-mode.png'
import nudgeImg from './assets/portfolio/nudge.png'
import whereableImg from './assets/portfolio/whereable.png'
import './Wireframe.css'

const NAV_ITEMS = ['work', 'play', 'about', 'resume']

const PROJECTS = [
  {
    id: 'tributary',
    title: 'Tributary',
    year: '2026',
    description:
      'An interactive installation that allows viewers to experience (and eat!) the impacts of different rice farming methods.',
    image: tributaryImg,
    alt: 'Tributary project',
  },
  {
    id: 'light-mode',
    title: 'Light Mode',
    year: '2025',
    description:
      'A lamp that detects and reacts to the stand you place it on; experimenting with tactile, physical forms of interaction',
    image: lightModeImg,
    alt: 'Light Mode lamp variants',
  },
  {
    id: 'nudge',
    title: 'Nudge',
    year: '2025',
    description:
      'An ambient computing furniture system that reminds you to bring your stuff when leaving the house—without any screens.',
    image: nudgeImg,
    alt: 'Nudge project',
  },
  {
    id: 'whereable',
    title: 'WhereAble',
    year: '2024',
    description:
      'A haptic wearable that tells people with hearing loss which direction sound is coming from.',
    image: whereableImg,
    alt: 'WhereAble wearable prototype',
  },
]

export default function Wireframe() {
  return (
    <div className="wireframe">
      <header className="wireframe__header">
        <p className="wireframe__logo">Joy He</p>
        <nav className="wireframe__nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={
                item === 'work'
                  ? 'wireframe__nav-item wireframe__nav-item--active'
                  : 'wireframe__nav-item'
              }
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      <section className="wireframe__intro">
        <h1 className="wireframe__headline text-Subtitle">
          I design and engineer delightful
          <br />
          physical × digital interactions.
        </h1>
        <div className="wireframe__meta">
          <div className="wireframe__meta-item">
            <img src={locationIcon} alt="" width={20} height={20} />
            <p className="text-body">San Francisco, CA</p>
          </div>
          <div className="wireframe__meta-item">
            <img src={bookIcon} alt="" width={20} height={20} />
            <p className="text-body">
              Design at UC Berkeley / Engineering at U of Waterloo
            </p>
          </div>
        </div>
      </section>

      {PROJECTS.map((project) => (
        <article
          key={project.id}
          id={project.id}
          className={`wireframe__project wireframe__project--${project.id}`}
        >
          <div className="wireframe__media">
            <img src={project.image} alt={project.alt} />
          </div>
          <div className="wireframe__project-info">
            <div className="wireframe__project-title-block">
              <h2 className="text-Subtitle">{project.title}</h2>
              <p className="text-body">{project.year}</p>
            </div>
            <p className="wireframe__project-desc text-body">
              {project.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}
