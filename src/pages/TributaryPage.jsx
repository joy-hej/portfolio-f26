import hero from '../assets/portfolio/tributary/tributary.png'
import interaction from '../assets/portfolio/tributary/interaction.png'
import gridTl from '../assets/portfolio/tributary/grid-tl.png'
import gridTr from '../assets/portfolio/tributary/grid-tr.png'
import gridBl from '../assets/portfolio/tributary/grid-bl.png'
import gridBr from '../assets/portfolio/tributary/grid-br.png'
import CaseMeta from '../components/CaseMeta.jsx'
import './CaseStudy.css'

export default function TributaryPage() {
  return (
    <article className="case">
      <div className="case__hero">
        <img src={hero} alt="Tributary installation prototypes on casters" />
      </div>

      <header className="case__header">
        <h1 className="case__title text-h1">Tributary</h1>
        <p className="case__lede text-body">
          Built for the Resource Renewal Institute&apos;s Fish in the Fields
          program. An interactive exhibit communicating the impacts of
          conventional versus fish-in-fields rice farming techniques.
        </p>
        <CaseMeta label="Contribution">
          Distributed microcontroller architecture, Electronics and power
          management, Firmware, 3D Printing, Laser cutting
        </CaseMeta>
        <CaseMeta label="Components of system">
          Water pumps, NFC reader, TFT displays, Arduinos, Ball-drop mechanism
        </CaseMeta>
      </header>

      <section className="case__body text-body">
        <p>
          A visitor chooses a path: conventional or &ldquo;fish in the
          fields&rdquo;; and watch the impact unfold in real time:
        </p>
        <ul className="case__list">
          <li>water/oil is pumped through tubes (clear vs contaminated)</li>
          <li>
            data screens visualize impact on CO₂, water quality, and
            biodiversity
          </li>
          <li>
            the machine dispenses edible rice balls, actually produced using the
            selected method
          </li>
        </ul>
        <p>
          The piece makes an abstract ecological tension visible and digestible.
          Visitors choose a path, watch, and eat the result.
        </p>
        <p>
          Conventional farming reliably produces large rice balls but degrades
          the ecosystem; fish-in-fields is more sustainable, but yields vary
          unpredictably. The interaction is designed to be immediate and tactile
          so visitors of any age can engage without instruction.
        </p>
      </section>

      <div className="case__media">
        <img
          src={interaction}
          alt="Visitors interacting with the Tributary installation"
        />
      </div>

      <section className="case__body text-body">
        <p>
          I owned the electronics and firmware running the entire installation,
          and contributed to fabrication and assembly. I worked the full
          engineering design cycle on the control system coordinating NFC card
          input, two relay-driven water pumps, a servo, and four Arduino Unos
          driving real-time data displays (CO₂, water quality, biodiversity).
        </p>
        <p>
          I initially architected master-slave communication over I2C, but it
          conflicted with the display shields&apos; pin mapping, so I
          re-architected the system around hardware serial — flashing identical
          firmware to all display nodes and differentiating them by mode byte,
          and physically snipping each Uno&apos;s D0 pin to free its receive
          line.
        </p>
        <p>
          I designed the power architecture to isolate the inductive pump loads
          from the other electronics. Integrating the system surfaced a chain of
          failures I diagnosed and resolved: pump loads browning out the Mega
          and crashing the NFC reader&apos;s I2C bus, dead relay channels
          isolated by direct-power testing, and a serial-routing bug that made
          all three screens display the same metric.
        </p>
        <p>
          Validating each subsystem individually took weeks; the real
          engineering was proving they worked reliably together, which taught me
          to test integration early rather than as a final step. I also
          3D-printed custom components, designed and laser-cut the NFC cards,
          and assembled the physical structure.
        </p>
      </section>

      <div className="case__grid">
        <div className="case__frame">
          <img src={gridTl} alt="Arduino Unos, breadboards, and TFT displays wired on a workbench" />
        </div>
        <div className="case__frame">
          <img src={gridTr} alt="Electronics enclosure and tubing on a rack" />
        </div>
        <div className="case__frame">
          <img src={gridBl} alt="Labeled relay module wiring" />
        </div>
        <div className="case__frame">
          <img src={gridBr} alt="Laser-cut acrylic NFC path cards" />
        </div>
      </div>
    </article>
  )
}
