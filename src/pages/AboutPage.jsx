import aboutPhoto from '../assets/portfolio/about-photo.png'
import './AboutPage.css'

const NOW = [
  { label: 'listening to:', value: 'Bon Voyage by Luna Li' },
  { label: 'dreaming of:', value: 'picnics in the park' },
  { label: 'learning how:', value: 'to make medieval chainmail' },
  { label: 'training to:', value: 'land my salchow at the ice rink' },
]

export default function AboutPage() {
  return (
    <article className="about" data-reveal>
      <p className="about__lede text-h1">
        Hi, I&apos;m Joy, and I&apos;m{' '}
        <em className="about__em">endlessly curious</em> about how people and
        technology meet. I&apos;ve chased that curiosity across nuclear plants,
        digital interfaces, Tesla factories, and more.
      </p>

      <div className="about__split">
        <div className="about__photo-wrap">
          <img
            className="about__photo"
            src={aboutPhoto}
            alt="Joy He holding a handmade fish pillow"
          />
          <p className="about__caption text-body">
            This sardine pillow was my first-ever sewing project / I also cast
            these fortune cookie earrings myself out of bronze!
          </p>
        </div>

        <div className="about__bio text-body">
          <p className="about__bio-lead">
            I&apos;m currently at UC Berkeley&apos;s Master of Design program.
            Before this, I studied Systems Design Engineering at the University
            of Waterloo.
          </p>
          <p>
            I design physical and digital things that people touch, hold, and
            use every day. Vehicle controls, assistive devices, cockpit
            interfaces: stuff where form and function really can&apos;t be
            separated. A steering wheel that feels right in your hands, a
            trigger mechanism that works for someone with limited grip strength,
            a control panel you can operate intuitively when things get
            stressful.
          </p>
          <p>
            I move between the shop, CAD, and user testing, but the question I
            keep coming back to is always the same: how does this object fit
            into someone&apos;s life, and how do I make that interaction feel
            effortless? That&apos;s taken me across automotive, aviation,
            accessibility, and consumer products — different industries, same
            core challenge. Making stuff that works with humans.
          </p>
        </div>
      </div>

      <section className="about__now">
        <h2 className="about__now-title text-h1">Right now I am...</h2>
        <ul className="about__now-list">
          {NOW.map((row) => (
            <li key={row.label} className="about__now-row text-body">
              <span className="about__now-label">{row.label}</span>
              <span className="about__now-value">{row.value}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
