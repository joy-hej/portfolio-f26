import hero from '../../assets/portfolio/play/chat-hell-hero.jpg'
import sketches from '../../assets/portfolio/play/chat-hell-sketches.png'
import detail from '../../assets/portfolio/play/chat-hell-detail.png'
import CaseMeta from '../../components/CaseMeta.jsx'
import '../CaseStudy.css'

export default function ChatHellPage() {
  return (
    <article className="case">
      <div className="case__hero case__hero--chat-hell">
        <img
          src={hero}
          alt="Visitor using the chat am i going to hell confessional booth in a gallery"
        />
      </div>

      <header className="case__header">
        <h1 className="case__title text-h1">chat, am i going to hell?</h1>
        <p className="case__lede text-body">
          A confessional booth (built in 3 days) exploring how people confess to
          AI the way they once did to a priest.
        </p>
        <CaseMeta label="Contribution">
          Physical design and woodworking/fabrication (booth structure, grille,
          and assembly)
        </CaseMeta>
        <CaseMeta label="When">2026</CaseMeta>
        <CaseMeta label="Exhibited">
          Intersection of Art and Technology (SF) — <em>if, then, amen</em>
        </CaseMeta>
        <CaseMeta label="Components">
          Booth and grille partition, screen (scrolling AI confessions), phone
        </CaseMeta>
      </header>

      <section className="case__body text-body">
        <p>
          <em>chat, am i going to hell?</em> is a gallery installation built for
          Intersection of Art and Technology (tiat) in San Francisco as part of{' '}
          <em>if, then, amen</em>, a group show on network spirituality and
          machine ritual. Inspired by how many people have come to treat AI
          chatbots as confidants, spiritual advisors, and keepers of their
          darkest secrets, the piece asks visitors to reflect on this unsettling
          relationship. The audience is invited to directly observe personal
          confessions made to ChatGPT obtained from both ourselves and our
          closest friends. We chose to display this phenomenon through its
          parallel: the Catholic confession.
        </p>
        <p>
          I designed the booth structure and grille for gallery conditions such
          that it was durable enough to run with minimal maintenance across a
          month-long show (with over 400 visitors), and built to seat the screen
          behind the grille at the right height and viewing angle. The grille was
          laser-cut. The piece needed to be easily assembled/disassembled for
          transportation, so I chose to use metal brackets and screws. A dark
          stain was added over the plywood to mimic more expensive wood at first
          glance.
        </p>
      </section>

      <div className="case__grid case__grid--natural">
        <div className="case__media case__media--natural">
          <img src={sketches} alt="Process sketches for the booth structure" />
        </div>
        <div className="case__frame">
          <img
            src={detail}
            alt="Fabricating the booth frame in the shop"
          />
        </div>
      </div>
    </article>
  )
}
