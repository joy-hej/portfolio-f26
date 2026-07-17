import hero from '../assets/portfolio/nudge/nudge.png'
import figjam from '../assets/portfolio/nudge/figjam.png'
import mechanismCad from '../assets/portfolio/nudge/mechanism-cad.png'
import mechanismPart from '../assets/portfolio/nudge/mechanism-part.png'
import tableCad from '../assets/portfolio/nudge/table-cad.png'
import tableScale from '../assets/portfolio/nudge/table-scale.png'
import cnc from '../assets/portfolio/nudge/cnc.png'
import tableRaw from '../assets/portfolio/nudge/table-raw.png'
import electronics from '../assets/portfolio/nudge/electronics.png'
import motorInstall from '../assets/portfolio/nudge/motor-install.png'
import sprayPaint from '../assets/portfolio/nudge/spray-paint.png'
import tableFinished from '../assets/portfolio/nudge/table-finished.png'
import diffuserSide from '../assets/portfolio/nudge/diffuser-side.png'
import hookBoxBuild from '../assets/portfolio/nudge/hook-box-build.png'
import hookBox from '../assets/portfolio/nudge/hook-box.png'
import hookBoxWall from '../assets/portfolio/nudge/hook-box-wall.png'
import tableGlow from '../assets/portfolio/nudge/table-glow.png'
import CaseMeta from '../components/CaseMeta.jsx'
import './CaseStudy.css'

export default function NudgePage() {
  return (
    <article className="case">
      <div className="case__hero">
        <img
          src={hero}
          alt="Nudge table and hook-box prototypes in a workshop"
        />
      </div>

      <header className="case__header">
        <h1 className="case__title text-h1">Nudge</h1>
        <p className="case__lede text-body">
          An ambient computing furniture system that reminds you to bring your
          stuff when leaving the house—without any screens.
        </p>
        <CaseMeta label="Role">
          Creative technologist (mechanism design, CNC, electronics)
        </CaseMeta>
        <CaseMeta label="When">2025</CaseMeta>
        <CaseMeta label="Methods + tools">
          ESP32, servos, NeoPixels, Fusion 360, CNC milling, laser cutting, 3D
          printing, weather + calendar APIs
        </CaseMeta>
      </header>

      <section className="case__body text-body">
        <p>
          People forget stuff when leaving home. Nudge (originally “Perch”) is a
          system of smart entryway furniture that gently moves and glows when
          you need something—umbrella on a rainy day, jacket when it’s cold,
          keys before you go—so the reminder is physical, not another
          notification.
        </p>
        <p>
          We began with poster presentations and a collaborative FigJam to
          define what the system should include. The entryway became the
          critical intervention point: the last moment before leaving.
        </p>
      </section>

      <div className="case__media case__media--natural">
        <img
          src={figjam}
          alt="Collaborative FigJam board for Nudge concept development"
        />
      </div>

      <section className="case__body text-body">
        <p>
          A key design challenge was enabling small, lightweight servos to
          rotate hooks holding jackets and bags. I designed a mechanism in
          Fusion 360 that isolates the rotation axis from the load—the servo
          rotates an inner dowel while the weight hangs from an outer tube,
          minimizing torque. We 3D-printed and tested it with an SG90 servo; it
          validated that inexpensive micro servos were enough.
        </p>
      </section>

      <div className="case__grid">
        <div className="case__frame">
          <img
            src={tableScale}
            alt="Laser-cut 1:4 scale plywood table prototype"
          />
        </div>
        <div className="case__frame case__frame--contain case__frame--white">
          <img
            src={mechanismPart}
            alt="3D-printed cylindrical mechanism part with splined end"
          />
        </div>
      </div>

      <section className="case__body text-body">
        <p>
          I also CAD’d a tulip-style table designed to be CNC-milled from a
          single sheet of plywood. A laser-cut 1:4 scale prototype showed the
          base was too narrow and tippy, so I widened it in the next iteration.
        </p>
      </section>

      <div className="case__grid">
        <div className="case__frame case__frame--contain case__frame--white">
          <img src={tableCad} alt="CAD render of interlocking tulip table base" />
        </div>
        <div className="case__frame">
          <img
            src={mechanismCad}
            alt="Fusion 360 CAD of the hook rotation mechanism"
          />
        </div>
      </div>

      <section className="case__body text-body">
        <p>
          The first full-size CNC attempt taught hard lessons: machine
          positioning, a bit that came loose mid-cut, tabs that were too thin,
          and finishing mistakes (no sanding before paint; stacking wet pieces).
          The second attempt was much smoother—though thicker tabs were harder
          to remove. After sanding and spray paint, we glued the base to address
          remaining wobble.
        </p>
      </section>

      <div className="case__grid">
        <div className="case__frame">
          <img src={cnc} alt="CNC mill cutting the table parts in the shop" />
        </div>
        <div className="case__frame">
          <img
            src={tableRaw}
            alt="Unpainted plywood tulip table showing tab-and-slot construction"
          />
        </div>
      </div>

      <div className="case__grid">
        <div className="case__frame">
          <img
            src={sprayPaint}
            alt="Purple spray painting of tulip-shaped table legs"
          />
        </div>
        <div className="case__frame">
          <img
            src={tableFinished}
            alt="Finished green-and-purple tulip table prototype in the shop"
          />
        </div>
      </div>

      <section className="case__body text-body">
        <p>
          For electronics, I used a PCA9685 16-channel PWM driver over I2C so
          the ESP32 didn’t need stacked motor hats. Motors slot into 3D-printed
          tubes screwed into the hook box, keeping mechanisms accessible while
          hiding wiring. An acrylic diffuser on sanded, curved box edges gives
          soft LED glow.
        </p>
      </section>

      <div className="case__grid">
        <div className="case__frame">
          <img
            src={electronics}
            alt="ESP32 and servo motors wired on a breadboard"
          />
        </div>
        <div className="case__frame">
          <img
            src={motorInstall}
            alt="Installing a servo motor into the wooden hook-box panel"
          />
        </div>
      </div>

      <div className="case__grid">
        <div className="case__frame">
          <img
            src={diffuserSide}
            alt="Side view of acrylic diffuser on the hook box"
          />
        </div>
        <div className="case__frame">
          <img
            src={hookBoxBuild}
            alt="Top view of hook-box build with decorative hook shapes"
          />
        </div>
      </div>

      <section className="case__body text-body">
        <p>The final system has two pieces:</p>
        <p>The Hook Box</p>
        <ul className="case__list">
          <li>Wall-mounted enclosure with acrylic diffuser</li>
          <li>
            Four servo-controlled rotating hooks: cold, rain, go, and climbing
            — triggered by weather and calendar context
          </li>
          <li>Ultrasonic proximity sensing for approach</li>
          <li>NeoPixel LED strip for ambient feedback</li>
        </ul>
        <p>The Table</p>
        <ul className="case__list">
          <li>CNC-milled plywood tulip table with spray-paint finish</li>
          <li>Embedded NeoPixel matrix under the tabletop</li>
          <li>Pressure sensor in the top surface</li>
          <li>Electronics enclosure underneath</li>
        </ul>
      </section>

      <div className="case__grid">
        <div className="case__frame">
          <img
            src={hookBox}
            alt="Finished hook box with four character hooks and sensor eyes"
          />
        </div>
        <div className="case__frame">
          <img
            src={hookBoxWall}
            alt="Hook box mounted on a wall glowing pink with a scarf hanging"
          />
        </div>
      </div>

      <div className="case__media case__media--portrait">
        <img
          src={tableGlow}
          alt="Tulip table glowing blue from NeoPixels under the top"
        />
      </div>

    </article>
  )
}
