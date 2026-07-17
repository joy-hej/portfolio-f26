import videoInstall from '../../assets/portfolio/play/noise-card.mp4'
import posterInstall from '../../assets/portfolio/play/noise-card.png'
import videoEssay from '../../assets/portfolio/play/noise-essay.mp4'
import posterEssay from '../../assets/portfolio/play/noise-essay-poster.png'
import CaseMeta from '../../components/CaseMeta.jsx'
import '../CaseStudy.css'

export default function NoiseCancellationPage() {
  return (
    <article className="case">
      <header className="case__header">
        <h1 className="case__title text-h1">Noise Cancellation</h1>
        <CaseMeta label="Role">Solo creative technologist</CaseMeta>
        <CaseMeta label="When">12.2025</CaseMeta>
        <CaseMeta label="Medium">
          Interactive video installation · Single channel video · Arduino ·
          Plywood
        </CaseMeta>
      </header>

      <div className="case__media case__media--natural case__media--video">
        <video
          src={videoInstall}
          poster={posterInstall}
          aria-label="Noise Cancellation iPod installation covered in ivy"
          autoPlay
          muted
          loop
          playsInline
          controls
        />
      </div>

      <section className="case__body text-body">
        <p>
          The piece engages critically with the logic of assistive technology
          design, in which &ldquo;improvement&rdquo; is defined as proximity to
          an unmarked human standard. Each upgrade erased not just a limitation
          but a way of hearing — a particular relationship to wind, rain, and the
          background hum of the world. This erasure extends to personal history:
          there are no photographs of the artist wearing her processor visibly,
          the technology edited out of the family album alongside the difference
          it marked. The iPod, itself now obsolete, its last model discontinued
          in 2022, becomes a double for the implanted hardware: a beloved device
          whose obsolescence was always built in.
        </p>
        <p>
          The enclosure was fabricated from plywood and finished with layered
          paint treatments to simulate organic rot and material failure. The
          surface deliberately contradicting the sleek consumer object it
          references. A monitor is recessed behind the iconic iPod window, sized
          and positioned so the screen reads as screen rather than display, the
          bezel held within the frame. Interaction is driven by an Arduino
          connected to a button embedded in the scroll wheel, triggering video
          playback through a serial connection to the laptop running the piece.
          The familiar gesture of pressing play, so mundane on the original
          device, becomes the act of entering someone else&apos;s bodily archive.
        </p>
      </section>

      <div className="case__media case__media--video case__media--essay">
        <video
          src={videoEssay}
          poster={posterEssay}
          aria-label="Noise Cancellation video essay with home-video footage"
          autoPlay
          muted
          loop
          playsInline
          controls
        />
      </div>
    </article>
  )
}
