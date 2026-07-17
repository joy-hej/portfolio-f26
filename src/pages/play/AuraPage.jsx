import setWire from '../../assets/portfolio/play/aura-set-wire.png'
import setRender from '../../assets/portfolio/play/aura-set-render.png'
import setWorn from '../../assets/portfolio/play/aura-set-worn.png'
import snugfit from '../../assets/portfolio/play/aura-snugfit-zoom.png'
import solder from '../../assets/portfolio/play/aura-solder.png'
import bench from '../../assets/portfolio/play/aura-bench-crop.png'
import finalPiece from '../../assets/portfolio/play/aura-final.png'
import cad1 from '../../assets/portfolio/play/aura-cad-1.png'
import cad2 from '../../assets/portfolio/play/aura-cad-2.png'
import cad3 from '../../assets/portfolio/play/aura-cad-3.png'
import printWhite from '../../assets/portfolio/play/aura-earpiece.jpg'
import CaseMeta from '../../components/CaseMeta.jsx'
import '../CaseStudy.css'

export default function AuraPage() {
  return (
    <article className="case">
      <div className="case__hero-set">
        <div className="case__hero-set-item case__hero-set-item--framed">
          <img src={setWire} alt="Hand-forged silver wire ear-cuff study" />
        </div>
        <div className="case__hero-set-item case__hero-set-item--render">
          <img src={setRender} alt="Gold CAD render of an Aura ear-cuff form" />
        </div>
        <div className="case__hero-set-item case__hero-set-item--framed">
          <img src={setWorn} alt="White 3D-printed Aura ear cuff worn on the ear" />
        </div>
      </div>

      <header className="case__header">
        <h1 className="case__title text-h1">
          Aura / Hearing Jewelry Design
        </h1>
        <p className="case__lede text-body">
          Silversmithing and digital fabrication exploring what hearing devices
          look like when they are allowed to be seen.
        </p>
        <p className="case__meta text-body">Personal project</p>
        <CaseMeta label="Role">Silversmith, Designer</CaseMeta>
        <CaseMeta label="Methods + tools">
          silversmithing (cutting, forging, brazing, etc), 3D CAD, rapid
          prototyping
        </CaseMeta>
      </header>

      <section className="case__body text-body">
        <h2 className="case__section-title">Background</h2>
        <p>
          Aura is a personal project that crosses between traditional
          silversmithing and modern digital fabrication. Traditional design for
          disability approaches often treat assistive devices as medical
          necessities to be concealed rather than personal accessories that people
          wear day-to-day, like eyeglasses. This perspective has resulted in
          hearing devices being designed to be as invisible/small as possible, to
          the direct detriment of function. Allowing microphones to be larger
          would result in better sound quality; larger batteries would last
          longer. If I move my head too quickly, my sound processor flies off — it
          is only secured with a small, discreet hook.
        </p>
        <p>
          I wanted to explore what hearing device design could look like if it
          was allowed to be seen; and what affordances could be made possible.
        </p>
      </section>

      <div className="case__grid case__grid--natural case__grid--text">
        <div className="case__frame case__frame--natural">
          <img src={snugfit} alt="Cochlear Snugfit retention accessory" />
        </div>
        <div className="case__body text-body case__grid-copy">
          <h2 className="case__section-title">Inspiration</h2>
          <p>
            I was inspired by my device&apos;s Snugfit retention accessory
            (offered by the manufacturer, Cochlear). What could the retention
            accessory (and hearing devices generally) look like if{' '}
            <strong>discreetness wasn&apos;t the top priority?</strong>
          </p>
        </div>
      </div>

      <section className="case__body text-body">
        <h2 className="case__section-title">Silversmithing</h2>
        <p>
          Steel wire prototypes helped figure out bending operations. Steel and
          silver forms were compared side-by-side, then the final silver piece
          was soldered (brazed) with a blowtorch.
        </p>
        <p>
          The final piece — after polishing, filing, finishing — took about 5
          sessions (15 hours) as a beginner to silversmithing.
        </p>
      </section>

      <div className="case__row">
        <div className="case__frame" style={{ flexGrow: 0.976 }}>
          <img
            src={bench}
            alt="Steel and silver wire forms side-by-side on the anvil"
          />
        </div>
        <div className="case__frame" style={{ flexGrow: 1.02 }}>
          <img src={solder} alt="Brazing the silver ear cuff with a blowtorch" />
        </div>
        <div className="case__frame" style={{ flexGrow: 0.931 }}>
          <img
            src={finalPiece}
            alt="Finished silver Aura ear cuff worn on the ear"
          />
        </div>
      </div>

      <section className="case__body text-body">
        <h2 className="case__section-title">
          Digital Fabrication
        </h2>
        <p>
          Because traditional silversmithing is limited to manipulating wires and
          sheets, it is difficult to create more complex, organic 3D objects. I
          wanted to keep exploring more hearing aid concepts without these
          limitations. I turned to 3D CAD (Fusion 360) and 3D printing.
        </p>
        <p>
          3D-printing physical prototypes helped reveal fit issues like pinching,
          as well as awkward and/or fragile areas.
        </p>
      </section>

      <div className="case__row">
        <div className="case__frame" style={{ flexGrow: 1.087 }}>
          <img src={cad1} alt="Angular CAD ear-cuff concept on an ear model" />
        </div>
        <div className="case__frame" style={{ flexGrow: 0.903 }}>
          <img src={cad2} alt="Organic gold CAD ear-cuff concept" />
        </div>
        <div className="case__frame" style={{ flexGrow: 0.928 }}>
          <img src={cad3} alt="Polished silver CAD ear-cuff concept" />
        </div>
      </div>

      <div className="case__media case__media--natural">
        <img
          src={printWhite}
          alt="White 3D-printed Aura ear cuff on a white background"
        />
      </div>

      <section className="case__body text-body">
        <h2 className="case__section-title">Next Steps</h2>
        <p>
          I&apos;m currently taking a lost wax jewelry casting course. Complex
          forms are hand-carved out of wax, which is then used as a mold to cast
          the final piece in metal. I plan to refine these concepts to address
          the fit and strength concerns found in the 3D-printed prototypes, and
          create some of these concepts in silver.
        </p>
      </section>
    </article>
  )
}
