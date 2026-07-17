import poster from '../../assets/portfolio/play/color-picker-card.png'
import video from '../../assets/portfolio/play/color-picker-card.mp4'
import cad from '../../assets/portfolio/play/color-picker-cad.png'
import interaction from '../../assets/portfolio/play/color-picker-interaction.png'
import CaseMeta from '../../components/CaseMeta.jsx'
import '../CaseStudy.css'

export default function ColorPickerLampPage() {
  return (
    <article className="case">
      <div className="case__hero case__hero--natural case__media--video">
        <video
          src={video}
          poster={poster}
          aria-label="Color-picker lamp with textured glass block glowing red"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <header className="case__header">
        <h1 className="case__title text-h1">Color-Picker Lamp</h1>
        <p className="case__lede text-body">
          A lamp that demonstrates RGB and HSL colorspace, letting you navigate
          and adjust the color directly.
        </p>
        <CaseMeta label="Role">
          Sole designer — electronics, firmware, enclosure design, and
          fabrication
        </CaseMeta>
        <CaseMeta label="When">2026</CaseMeta>
        <CaseMeta label="Components">
          ESP32, LED strip, potentiometers, switch, custom sheet-metal enclosure
        </CaseMeta>
      </header>

      <section className="case__body text-body">
        <p>
          Made from sheet metal and a glass block, this lamp allows the user to
          switch between RGB and HSL mode, and adjust the sliders to explore how
          each color space works.
        </p>
        <p>
          I designed the electronics around an ESP32C6 driving an addressable LED
          strip, with potentiometer dials as the control input. I modeled a
          custom sheet-metal enclosure in Fusion 360 to house the electronics and
          seat the glass block diffuser, and wrote the firmware that reads the
          dials and translates them across both colorspaces in real time.
        </p>
        <p>
          After using a breadboard to validate that the electronics and code
          worked together correctly, I used solderable protoboard for a robust,
          permanent assembly. The enclosure was iterated in Fusion until it
          unfolded correctly for fabrication, then cut on a FabLight laser cutter
          and bent on a sheet-metal brake—assembled top to bottom so screws stayed
          accessible.
        </p>
      </section>

      <div className="case__grid">
        <div className="case__frame">
          <img src={cad} alt="CAD render of the sheet-metal enclosure" />
        </div>
        <div className="case__frame">
          <img
            src={interaction}
            alt="Hand adjusting the color-picker lamp sliders with cyan glow"
          />
        </div>
      </div>
    </article>
  )
}
