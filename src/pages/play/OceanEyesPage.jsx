import poster from '../../assets/portfolio/play/ocean-card.png'
import video from '../../assets/portfolio/play/ocean-card.mp4'
import media from '../../assets/portfolio/play/ocean-media.png'
import closing from '../../assets/portfolio/play/ocean-closing.png'
import CaseMeta from '../../components/CaseMeta.jsx'
import '../CaseStudy.css'

export default function OceanEyesPage() {
  return (
    <article className="case">
      <div className="case__hero case__hero--natural case__media--video">
        <video
          src={video}
          poster={poster}
          aria-label="Ocean Eyes glowing projection-mapped sculpture"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <header className="case__header">
        <h1 className="case__title text-h1">Ocean Eyes</h1>
        <p className="case__lede text-body">
          A projection-mapped sculpture that watches its viewer back. A
          3D-printed eye at seated height rests in blue until someone sits—then
          it starts to speak.
        </p>
        <CaseMeta label="Role">Solo creative technologist</CaseMeta>
        <CaseMeta label="When">10.2025</CaseMeta>
        <CaseMeta label="Medium">
          Interactive projection mapping · Single-channel video · Arduino · 3D
          printing
        </CaseMeta>
      </header>

      <section className="case__body text-body">
        <p>
          At idle, the iris is a single projected circle—resting blue, textured
          like deep water. When an ultrasonic sensor detects someone sitting in
          front of it, the projection switches from beauty to poem: each line
          highlighted in sequence while backgrounds shift through ocean water,
          iris tissue, lenses, branches, sky.
        </p>
      </section>

      <div className="case__media">
        <img
          src={media}
          alt="Ocean Eyes fabrication and projection detail"
        />
      </div>

      <div className="case__split case__split--ocean">
        <div className="case__frame case__frame--ocean-closing">
          <img
            src={closing}
            alt="Ocean Eyes with Arduino code projected across the eye form"
          />
        </div>
        <section className="case__split-copy text-body">
          <p>
            I used a Figma prototype for line timing against each background and
            exported the video, keeping production simple: prototype → exported
            video → projection.
          </p>
          <p>
            The Arduino and ultrasonic sensor handle the only interaction:
            presence triggers disclosure. When the viewer sits down or looks at
            it, the eye stops performing its default beauty, and starts to
            speak.
          </p>
        </section>
      </div>
    </article>
  )
}
