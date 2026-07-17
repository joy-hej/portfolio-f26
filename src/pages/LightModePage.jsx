import hero from '../assets/portfolio/light-mode/light-mode.png'
import stands from '../assets/portfolio/light-mode/stands.png'
import wiring from '../assets/portfolio/light-mode/wiring.png'
import cncCam from '../assets/portfolio/light-mode/cnc-cam.png'
import cncMill from '../assets/portfolio/light-mode/cnc-mill.png'
import aluminumCut from '../assets/portfolio/light-mode/aluminum-cut.png'
import waterjet from '../assets/portfolio/light-mode/waterjet.png'
import printPink from '../assets/portfolio/light-mode/print-pink.png'
import enclosureCad from '../assets/portfolio/light-mode/enclosure-cad.png'
import enclosureHold from '../assets/portfolio/light-mode/enclosure-hold.png'
import shadeExplorations from '../assets/portfolio/light-mode/shade-explorations.png'
import shadeHold from '../assets/portfolio/light-mode/shade-hold.png'
import protoBench from '../assets/portfolio/light-mode/proto-bench.png'
import protoAssembly from '../assets/portfolio/light-mode/proto-assembly.png'
import CaseMeta from '../components/CaseMeta.jsx'
import './CaseStudy.css'

export default function LightModePage() {
  return (
    <article className="case">
      <div className="case__hero">
        <img src={hero} alt="Light Mode lamp variants on wood, pink, and metal stands" />
      </div>

      <header className="case__header">
        <h1 className="case__title text-h1">Light Mode</h1>
        <p className="case__lede text-body">
          An interactive lamp that detects different stands and responds with
          colour and motion.
        </p>
        <CaseMeta label="Role">Solo creative technologist</CaseMeta>
        <CaseMeta label="When">09.2025 – 10.2025</CaseMeta>
        <CaseMeta label="Methods + tools">
          Electronics/hardware, ESP32, 3D printing, Fusion360, CNC machining +
          toolpathing, Laser cutting, Wood shop, Metal shop
        </CaseMeta>
      </header>

      <section className="case__body text-body">
        <p>
          I engaged with a range of materials and fabrication methods to bring
          Light Mode to life, weaving together:
        </p>
        <ul className="case__list">
          <li>Wood</li>
          <li>Metal</li>
          <li>Plastic</li>
          <li>3D printing</li>
          <li>CNC milling</li>
          <li>Laser cutting</li>
        </ul>
      </section>

      <div className="case__grid">
        <div className="case__stack">
          <p className="case__label text-body">
            Each stand elicits different lighting
          </p>
          <div className="case__frame">
            <img
              src={stands}
              alt="Wood, pink plastic, and metal lamp stands on a windowsill"
            />
          </div>
        </div>
        <div className="case__stack">
          <p className="case__label text-body">Wiring diagram</p>
          <div className="case__frame case__frame--contain">
            <img
              src={wiring}
              alt="Wiring diagram of ESP32, RFID reader, Hall sensor, LED strip, and power"
            />
          </div>
        </div>
      </div>

      <section className="case__body text-body">
        <p>
          I CNC-milled the wood stand out of an 8/4 plank of poplar, which I
          jointed in the wood shop prior to milling.
        </p>
      </section>

      <div className="case__grid">
        <div className="case__frame">
          <img
            src={cncCam}
            alt="Fusion 360 CAM simulation for milling the wood stand"
          />
        </div>
        <div className="case__frame">
          <img
            src={cncMill}
            alt="CNC mill cutting circular toolpaths into wood"
          />
        </div>
      </div>

      <section className="case__body text-body">
        <p>I laser-cut the metal stand out of 1/4″ sheet aluminum.</p>
      </section>

      <div className="case__grid">
        <div className="case__frame case__frame--contain">
          <img
            src={aluminumCut}
            alt="Laser-cut aluminum flat pattern for the metal stand"
          />
        </div>
        <div className="case__frame">
          <img
            src={waterjet}
            alt="View through a green machine shield during metal fabrication"
          />
        </div>
      </div>

      <section className="case__body text-body">
        <p>
          The plastic stand as well as the hardware enclosure and lamp shade
          were modelled in Fusion360 and 3D printed.
        </p>
      </section>

      <div className="case__grid">
        <div className="case__frame">
          <img
            src={printPink}
            alt="Pink ribbed lamp stand printing on a Bambu Lab 3D printer"
          />
        </div>
        <div className="case__frame case__frame--contain">
          <img
            src={enclosureCad}
            alt="3D CAD render of the enclosure and diffuser assembly"
          />
        </div>
      </div>

      <div className="case__media">
        <img
          src={enclosureHold}
          alt="Hand holding the white enclosure and diffuser prototype"
        />
      </div>

      <section className="case__body text-body">
        <p>
          I initially used a screw-on mechanism for the enclosure to allow easy
          access to the components. However, this complicated cable-management,
          so I transitioned to a simple press-on fit.
        </p>
        <p>
          Diffuser shade explorations. I wanted to offer an affordance that
          invites users to pick up and hold the light.
        </p>
      </section>

      <div className="case__grid">
        <div className="case__frame case__frame--contain">
          <img
            src={shadeExplorations}
            alt="Five diffuser shade form explorations rendered side by side"
          />
        </div>
        <div className="case__frame">
          <img
            src={shadeHold}
            alt="Hand holding a white 3D-printed diffuser shade with thumb indent"
          />
        </div>
      </div>

      <section className="case__body text-body">
        <p>
          I started by testing different ways to detect which stand was placed
          on the base and settled on a combination of Hall-effect sensors and
          RFID after some trial and error. A lot of the early work was messy
          prototyping: breadboards, inconsistent readings, chasing down noise
          issues, and figuring out sensor placement that actually worked inside
          the physical constraints of the object.
        </p>
        <p>
          I wrote the firmware to read the sensors, interpret the inputs, and
          trigger specific LED behaviors. Most of the coding work was around
          making the system stable: filtering noisy readings, setting
          thresholds, handling edge cases, and making sure the lights responded
          quickly but not erratically. I iterated on the logic several times as
          the physical design evolved.
        </p>
        <p>
          The final system reliably translates physical configurations into
          different lighting states. It looks simple on the surface, but under
          the hood it&apos;s an embedded system I designed, wired, and
          programmed from scratch.
        </p>
      </section>

      <div className="case__grid">
        <div className="case__frame">
          <img
            src={protoBench}
            alt="Breadboard prototype with LED strip beside a laptop running firmware"
          />
        </div>
        <div className="case__frame">
          <img
            src={protoAssembly}
            alt="Workbench with enclosure parts, wiring, and the pink stand prototype"
          />
        </div>
      </div>

      <section className="case__body text-body">
        <p>What could be improved?</p>
        <p>Refining the form factor:</p>
        <ul className="case__list">
          <li>
            Cable management inside the enclosure — press-fit simplified access,
            but routing still wants more structure
          </li>
          <li>
            Diffuser forms that more clearly invite picking up and holding the
            light
          </li>
        </ul>
        <p>What did I learn?</p>
        <p>
          Hardware is hard. Unit test and debug systematically: as I was nearing
          the final stages of integration, the entire system began acting
          erratically, and then completely unresponsive. The only way to figure
          out what&apos;s wrong is to systematically test each individual
          subsystem using simple unit tests. I learned to keep those code
          snippets on hand.
        </p>
        <p>
          Fabrication is logistically complicated: working with so many
          materials and mediums was an involved, multi-stage process. For
          example, before I could CNC mill the wood, I had to joint/plane it
          first. This is a stark contrast to 3D-printing, which is a much
          faster and simpler process.
        </p>
      </section>
    </article>
  )
}
