import heroPhoto from '../assets/portfolio/whereable/interviews.png'
import heroVideo from '../assets/portfolio/whereable/hero-how-it-works.mp4'
import howtoPoster from '../assets/portfolio/whereable/howto-poster.png'
import indVisual from '../assets/portfolio/whereable/ind-visual.png'
import indHaptic from '../assets/portfolio/whereable/ind-haptic.png'
import indCombo from '../assets/portfolio/whereable/ind-combo.png'
import iter1Leather from '../assets/portfolio/whereable/iter1-leather.png'
import iter2TestCircuit from '../assets/portfolio/whereable/iter2-test-circuit.png'
import iter2Zigzag from '../assets/portfolio/whereable/iter2-zigzag.png'
import iter2SewnBelt from '../assets/portfolio/whereable/iter2-sewn-belt.png'
import iter2SewnDetail from '../assets/portfolio/whereable/iter2-sewn-detail.png'
import formfactorBelt from '../assets/portfolio/whereable/formfactor-belt.png'
import formfactorArmband from '../assets/portfolio/whereable/formfactor-armband.png'
import durableBrokenMotor from '../assets/portfolio/whereable/durable-broken-motor.png'
import durableProtoboard1 from '../assets/portfolio/whereable/durable-protoboard-1.png'
import durableProtoboard2 from '../assets/portfolio/whereable/durable-protoboard-2.png'
import finishedSystem from '../assets/portfolio/whereable/finished-system.png'
import finishedBeltDetail from '../assets/portfolio/whereable/finished-belt-detail.png'
import deviceFlora from '../assets/portfolio/whereable/device-flora.png'
import deviceArduino from '../assets/portfolio/whereable/device-arduino.png'
import deviceRaspberryPi from '../assets/portfolio/whereable/device-raspberrypi.png'
import deviceMotorHat from '../assets/portfolio/whereable/device-motor-driver-hat.png'
import CaseMeta from '../components/CaseMeta.jsx'
import './CaseStudy.css'
import './WhereAble.css'

/* Belt sketch: motors evenly spaced around an ellipse, front reference at top */
function BeltDiagram({ motors, label }) {
  const cx = 130
  const cy = 70
  const rx = 110
  const ry = 52
  const dots = Array.from({ length: motors }, (_, i) => {
    const angle = (-90 + (i * 360) / motors) * (Math.PI / 180)
    return { x: cx + rx * Math.cos(angle), y: cy + ry * Math.sin(angle) }
  })
  return (
    <svg
      className="wa-belt"
      viewBox="0 0 260 140"
      role="img"
      aria-label={label}
    >
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="none"
        stroke="#b9b9b9"
        strokeWidth="2"
      />
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r="6"
          fill="#fff"
          stroke="#b9b9b9"
          strokeWidth="2"
        />
      ))}
      <g
        transform={`translate(${cx - 10} ${cy - ry - 8}) scale(0.74)`}
        aria-hidden
      >
        <path
          d="M14.5159 8.63148C16.3657 8.14585 17.7564 9.73726 17.8421 10.1385C17.9279 10.5397 18.196 12.4006 17.8846 12.8472C17.1255 13.6374 14.7618 15.2006 13.573 15.0671C12.1217 14.9041 8.63226 12.3642 8.04683 10.1867C7.87966 9.56498 7.33464 5.24496 7.52966 4.68604C8.17628 2.83284 10.2981 2.33528 11.0978 1.9802L11.1338 1.96423C12.1808 1.49912 13.7436 0.804944 15.5745 1.48068C16.6808 1.88898 21.9697 2.92444 23.206 5.60181C23.7704 6.82406 25.759 11.5747 24.6725 15.9055C24.0015 18.5799 21.3204 22.1828 18.618 22.2758C16.4138 22.3517 12.9842 23.1599 10.3121 21.5331C7.43352 19.7806 3.07582 17.4032 1.20117 9.77901"
          fill="none"
          stroke="#6d3bd1"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

export default function WhereAblePage() {
  return (
    <article className="case">
      <div className="case__media case__media--natural">
        <img
          src={heroPhoto}
          alt="Finished WhereAble system: a beanie microphone array on a mannequin head, the haptic belt, a Raspberry Pi, and a power bank laid out on a workbench"
        />
      </div>

      <header className="case__header">
        <h1 className="case__title text-h1">WhereAble</h1>
        <p className="case__lede text-body">
          A haptic belt and wearable system for deaf/hard-of-hearing people that
          determines sound direction and alerts them to important sounds.
        </p>
        <CaseMeta label="Role">Creative technologist</CaseMeta>
        <CaseMeta label="When">09.2023 – 04.2024</CaseMeta>
        <CaseMeta label="Methods + tools">
          Electronics/hardware, Raspberry Pi, Arduino, Electronic Textiles, Soft
          Goods, Haptics, UX research (interviews), Usability Testing
        </CaseMeta>
      </header>

      <div className="case__media wa-howto">
        <div className="wa-howto__crop">
          <video
            src={heroVideo}
            poster={howtoPoster}
            aria-label="How WhereAble works: microphones in a hat, a haptic belt, and a Raspberry Pi worn on the body"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>

      <section className="case__body text-body">
        <h2 className="case__section-title">
          User Research &amp; Problem Definition
        </h2>
        <p>
          <strong>
            What problems aren’t currently addressed with hearing-amplification
            devices?
          </strong>
        </p>
        <p>
          I ran semi-structured interviews with a range of folks who have hearing
          loss. Each interview covered three areas: daily life with hearing loss,
          current tech and workarounds, and larger structural barriers.
        </p>
        <p>Example interviewees:</p>
        <ul className="case__list">
          <li>
            E’s hearing loss is asymmetrical and fluctuating. As a result, they
            get limited benefit from hearing aids.
          </li>
          <li>
            M is a disability activist whose partner is culturally Deaf. They do
            not use hearing aids or cochlear implants.
          </li>
        </ul>
      </section>

      <div className="wa-diagram wa-insights text-body">
        <h3 className="wa-diagram__title">User Research Insights</h3>
        <div className="wa-insights__grid">
          <p className="wa-bubble">
            <strong>Constant scanning</strong> to compensate for reduced sound
            localization is <strong>exhausting</strong> and{' '}
            <strong>insufficient</strong>.
          </p>
          <p className="wa-bubble">
            Preference for <strong>embedded wearables</strong> (watch, armband)
            or smartphone.
          </p>
          <p className="wa-bubble">
            Concerns about <strong>nuisance alerts</strong>. Device needs to
            classify sounds and only alert when a threshold is reached.
          </p>
          <p className="wa-bubble">
            Concerns about visibility, comfort, and{' '}
            <strong>assistive device stigma</strong>.
          </p>
          <p className="wa-bubble">
            <strong>Multimodal feedback</strong> (e.g., sound AND visual) is more
            inclusive of other disabilities.
          </p>
          <p className="wa-bubble">
            Feedback must be <strong>immediate</strong> &amp; intuitive.
          </p>
        </div>
        <p className="wa-insights__note">
          this impacted our approach to signals processing!
        </p>
      </div>

      <section className="case__body text-body">
        <h2 className="case__section-title">Concepting</h2>
        <p>
          <strong>
            How might we indicate sound direction to users to maximize their
            situational awareness?
          </strong>
        </p>
      </section>

      <div className="wa-diagram text-body">
        <h3 className="wa-diagram__title">Indication Method</h3>
        <div className="wa-indication">
          <div className="wa-option">
            <img className="wa-option__icon" src={indVisual} alt="" aria-hidden="true" />
            <p className="wa-option__label">Visual only</p>
            <ul className="wa-option__list">
              <li>❌ User must look at device constantly</li>
            </ul>
          </div>
          <div className="wa-option wa-option--chosen">
            <img className="wa-option__icon" src={indHaptic} alt="" aria-hidden="true" />
            <p className="wa-option__label">Haptic only</p>
            <ul className="wa-option__list">
              <li>✅ Only alerts when needed</li>
              <li>✅ Faster</li>
            </ul>
          </div>
          <div className="wa-option">
            <img className="wa-option__icon wa-option__icon--wide" src={indCombo} alt="" aria-hidden="true" />
            <p className="wa-option__label">Haptic + visual</p>
            <ul className="wa-option__list">
              <li>❌ Multi-step process</li>
              <li>✅ Only alerts when needed</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="wa-diagram text-body">
        <h3 className="wa-diagram__title">Physical Form Factor</h3>
        <div className="wa-table-wrap">
          <table className="wa-table">
            <thead>
              <tr>
                <th scope="col">Option</th>
                <th scope="col">Indication Method</th>
                <th scope="col">Verdict</th>
              </tr>
            </thead>
            <tbody>
              <tr className="is-ok">
                <td>Watch</td>
                <td>Haptic alert + visual direction</td>
                <td>
                  Discreet. Easy to read. Difficult to communicate with watch OS.
                </td>
              </tr>
              <tr className="is-good">
                <td>Ring</td>
                <td>Haptic only</td>
                <td>
                  Very discreet. Difficult to prototype and to read.
                </td>
              </tr>
              <tr className="is-good is-chosen">
                <td>Belt</td>
                <td>Haptic only</td>
                <td>
                  Less discreet unless worn under clothes. Easiest to prototype.
                  Likely easiest to read.
                </td>
              </tr>
              <tr className="is-good is-chosen">
                <td>Bracelet/armband</td>
                <td>Haptic only</td>
                <td>
                  Discreet. Easy to prototype. May be more difficult to read.
                </td>
              </tr>
              <tr className="is-ok">
                <td>Phone</td>
                <td>Haptic alert + visual direction / Visual only</td>
                <td>
                  Easy to carry around. Slow; must unlock phone and open app.
                </td>
              </tr>
              <tr className="is-bad">
                <td>Glasses</td>
                <td>Visual only</td>
                <td>
                  Very distracting. Difficult to prototype. Extremely visible.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="case__metric" style={{ marginTop: '16px' }}>
          We decided to start with a haptic band.
        </p>
      </div>

      <section className="case__body text-body">
        <h2 className="case__section-title">Prototyping</h2>
        <p>
          <strong>How do we create a comfortable wearable?</strong>
        </p>
        <p className="case__subhead">Iteration 1: leather belt &amp; wires</p>
      </section>

      <div className="case__media case__media--natural">
        <img src={iter1Leather} alt="Iteration 1 — leather belt with discrete wired haptic motors" />
      </div>

      <section className="case__body text-body">
        <p>The results among 6 participants were poor:</p>
        <p className="case__callout">57% correct · 4.6s reaction time</p>
        <ul className="case__list">
          <li>loose → haptic motors need to be tight to body</li>
          <li>bulky → uncomfortable</li>
          <li>stiff → entire belt vibrated</li>
        </ul>
        <p>We needed a new form factor that…</p>
        <ul className="case__list">
          <li>ensures all motors contact the body</li>
          <li>isolates the vibrations</li>
          <li>fits different bodies</li>
          <li>is lightweight, low-profile, and comfortable</li>
        </ul>
      </section>

      <section className="case__body text-body">
        <p className="case__subhead">
          Iteration 2: Electronic Textile Prototyping
        </p>
      </section>

      <div className="case__media case__media--natural">
        <img src={iter2TestCircuit} alt="Test circuit on stretch fabric with Adafruit Gemma, NeoPixel LED, and conductive thread" />
      </div>
      <p className="case__caption text-body">
        Test circuit on stretch fabric with Adafruit Gemma, Neopixel LED, and
        conductive thread
      </p>

      <div className="case__media case__media--natural">
        <img src={iter2Zigzag} alt="Zig-zag conductive-thread stitch that allows the circuit to stretch" />
      </div>
      <p className="case__caption text-body">Zig-zag stitch allows for stretch!</p>

      <div className="case__row">
        <div className="case__frame case__frame--natural" style={{ flexGrow: 1.333 }}>
          <img src={iter2SewnBelt} alt="Machine-sewn electronic-textile belt prototype" />
        </div>
        <div className="case__frame case__frame--natural" style={{ flexGrow: 0.75 }}>
          <img src={iter2SewnDetail} alt="Detail of the machine-sewn stretch circuit" />
        </div>
      </div>
      <p className="case__caption text-body">
        Machine-sewn circuit on belt prototype — super stretchy!
      </p>

      <section className="case__body text-body">
        <h2 className="case__section-title">
          Prototyping + Testing
        </h2>
        <p>
          <strong>What form factor is the most effective?</strong>
        </p>
      </section>

      <div className="case__grid case__grid--natural">
        <div className="case__stack">
          <p className="case__subhead">haptic belt ✅</p>
          <div className="case__frame case__frame--clay">
            <img src={formfactorBelt} alt="Haptic belt prototype worn on the body" />
          </div>
          <p className="case__metric">99% correct · 1.5s reaction time</p>
        </div>
        <div className="case__stack">
          <p className="case__subhead">armband ❌</p>
          <div className="case__frame case__frame--clay">
            <img src={formfactorArmband} alt="Armband haptic prototype worn on the arm" />
          </div>
          <p className="case__metric">75% correct · 4.3s reaction time</p>
        </div>
      </div>

      <section className="case__body text-body">
        <p>
          Although the armband was considered more discreet, participants reacted
          far slower when using the armband, and their accuracy was far worse.
          Participants also indicated that their mental load was much higher.
        </p>
        <p className="case__quote">
          “With the armband, I have to put a lot more mental effort into
          interpreting what it’s trying to indicate to me.”
        </p>
      </section>

      <section className="case__body text-body">
        <h2 className="case__section-title">
          Prototyping + Testing
        </h2>
        <p>
          <strong>
            Which haptic signalling strategy can users interpret most accurately?
          </strong>
        </p>
        <p>
          I tested three signalling strategies with 8 participants. They were
          blindfolded, and the order each strategy was tested in was varied for
          each participant to mitigate learning/acclimation biases.
        </p>
      </section>

      <div className="wa-diagram text-body">
        <h3 className="wa-diagram__title" style={{ textAlign: 'center' }}>
          Haptic signalling strategies
        </h3>
        <div className="wa-signalling">
          <div className="wa-strategy">
            <p className="wa-strategy__label">
              8 directions
              <br />8 motors
            </p>
            <BeltDiagram motors={8} label="Belt with 8 motors evenly spaced" />
            <p className="wa-strategy__stat">
              84% <span>correct within 90°</span>
              <br />
              2.3s <span>reaction time</span>
            </p>
          </div>
          <div className="wa-strategy">
            <p className="wa-strategy__label">
              8 directions
              <br />4 motors
            </p>
            <BeltDiagram motors={4} label="Belt with 4 motors evenly spaced" />
            <p className="wa-strategy__stat">
              75% <span>correct within 90°</span>
              <br />
              4.2s <span>reaction time</span>
            </p>
          </div>
          <div className="wa-strategy">
            <p className="wa-strategy__label">
              4 directions
              <br />4 motors
            </p>
            <BeltDiagram motors={4} label="Belt with 4 motors evenly spaced" />
            <p className="wa-strategy__stat">
              99% <span>correct</span>
              <br />
              1.5s <span>reaction time</span>
            </p>
          </div>
        </div>
      </div>

      <section className="case__body text-body">
        <p>
          I also asked them qualitative questions about each strategy to see which
          ones participants subjectively preferred.
        </p>
        <p className="case__quote">
          “For me, 4 directions was enough to give me a general idea of where to
          look.”
        </p>
        <p className="case__quote">
          “It was difficult to parse when multiple motors were vibrating. I felt
          overwhelmed.”
        </p>
        <p>We decided to continue with 4 directions and 4 motors.</p>
      </section>

      <section className="case__body text-body">
        <h2 className="case__section-title">
          Prototyping + Testing
        </h2>
        <p>
          <strong>
            How can the haptics be made more durable for regular use?
          </strong>
        </p>
        <p>
          Problem 1: The haptic motors kept breaking during testing, especially
          when stretched.
        </p>
      </section>

      <div className="case__media case__media--natural case__media--center">
        <img src={durableBrokenMotor} alt="Haptic motor that broke when the belt was stretched" />
      </div>

      <section className="case__body text-body">
        <p>
          Solution: I soldered motors onto a piece of protoboard, and used the
          protoboard holes to attach the assembly onto the belt.
        </p>
      </section>

      <div className="case__row">
        <div className="case__frame case__frame--natural" style={{ flexGrow: 0.798 }}>
          <img src={durableProtoboard1} alt="Motors soldered onto protoboard" />
        </div>
        <div className="case__frame case__frame--natural" style={{ flexGrow: 0.779 }}>
          <img src={durableProtoboard2} alt="Protoboard motor assembly laced through the fabric belt" />
        </div>
      </div>

      <section className="case__body text-body">
        <p>Problem 2: Vibrations were very weak due to low current output.</p>
      </section>

      <div className="wa-diagram text-body">
        <div className="wa-flow">
          <div className="wa-stage">
            <p className="wa-stage__label">Adafruit Flora + Arduino Uno</p>
            <div className="wa-stage__imgs">
              <img src={deviceFlora} alt="Adafruit Flora board" />
              <img src={deviceArduino} alt="Arduino Uno board" />
            </div>
            <p className="wa-stage__stat">❌ GPIO output: &lt;20mA</p>
          </div>
          <div className="wa-flow__arrow" aria-hidden="true">
            →
          </div>
          <div className="wa-stage">
            <p className="wa-stage__label">Raspberry Pi</p>
            <div className="wa-stage__imgs">
              <img src={deviceRaspberryPi} alt="Raspberry Pi board" />
            </div>
            <p className="wa-stage__stat">❌ GPIO output: 16mA</p>
          </div>
          <div className="wa-flow__arrow" aria-hidden="true">
            →
          </div>
          <div className="wa-stage">
            <p className="wa-stage__label">
              Solution: Raspberry Pi + Motor Driver Hat
            </p>
            <div className="wa-stage__imgs">
              <img
                src={deviceMotorHat}
                alt="Raspberry Pi with a stacked motor driver hat"
              />
            </div>
            <p className="wa-stage__stat">✅ Motor Driver Hat output: Up to 1.2A (!)</p>
          </div>
        </div>
      </div>

      <section className="case__body text-body">
        <h2 className="case__section-title">Finished System</h2>
        <p>
          <strong>How effective was the final prototype?</strong>
        </p>
      </section>

      <div className="case__media case__media--natural">
        <img src={finishedSystem} alt="Final WhereAble system: beanie microphone array, haptic belt, Raspberry Pi, and power bank" />
      </div>

      <section className="case__body text-body">
        <p className="case__callout">
          First iteration: 57% correct, 4.6s reaction time → Final iteration: 100%
          correct, 0.15s reaction time
        </p>
        <p>Accuracy went up to 100%.</p>
        <p>Reaction time decreased by 97%.</p>
      </section>

      <div className="case__media case__media--natural">
        <img src={finishedBeltDetail} alt="Close detail of the finished stretch haptic belt" />
      </div>

      <section className="case__body text-body">
        <p className="case__metric">And we won Best Overall Capstone Project!!</p>
      </section>

      <section className="case__body text-body">
        <h2 className="case__section-title">Next steps</h2>
        <p>
          <strong>What could be improved?</strong>
        </p>
        <p className="case__subhead">Longer-term wear testing:</p>
        <p>
          We validated accuracy and reaction time, but never tested comfort and
          usability over hours or days of real use. This is where the real
          wearability issues would surface. We also never revisited the armband,
          and whether accuracy rates and reaction time would have improved with
          more practice.
        </p>
        <p className="case__subhead">More polish as a consumer product:</p>
        <p>
          The belt works, but it’s still visibly a prototype. I want to explore
          integrating the electronics into everyday clothing, such as in a jacket
          lining, an armband, a waistband. One of the important things that came
          out of our user research was discreetness, and ensuring our design
          doesn’t read as assistive tech unless the wearer wants it to.
        </p>
      </section>

      <section className="case__body text-body">
        <h2 className="case__section-title">Reflections</h2>
        <p>
          <strong>What did I learn?</strong>
        </p>
        <p className="case__subhead">Prototype early and quickly:</p>
        <p>
          Having a tight loop between prototyping and testing was essential to the
          success of this project. We started out with a pretty vaguely defined
          idea of the form factor. Through prototyping and testing, we learned a
          lot about design, material, and human constraints. For example, we
          learned that using leather makes the resulting belt stiff, and the
          haptics difficult to interpret. As a result, we were able to pivot
          quickly to using electronic textiles.
        </p>
        <p className="case__subhead">Simpler is often better:</p>
        <p>
          We started with 8 directions and 8 motors because more precision seemed
          better. Testing showed that 4 directions and 4 motors hit 99% accuracy
          with a 1.5s reaction time. Participants found more motors overwhelming,
          not helpful. The “less sophisticated” version was the better design. I
          keep coming back to this when I’m tempted to over-engineer.
        </p>
      </section>
    </article>
  )
}
