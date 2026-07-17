import top from '../../assets/portfolio/play/duet-top.png'
import market from '../../assets/portfolio/play/duet-mug-market.png'
import sketches from '../../assets/portfolio/play/duet-mug-sketches.png'
import sketches2 from '../../assets/portfolio/play/duet-mug-sketches-2.png'
import form from '../../assets/portfolio/play/duet-mug-form.png'
import cad1 from '../../assets/portfolio/play/duet-mug-cad-1.png'
import cad2 from '../../assets/portfolio/play/duet-mug-cad-2.png'
import cad3 from '../../assets/portfolio/play/duet-mug-cad-3.png'
import clay from '../../assets/portfolio/play/duet-mug-clay.png'
import build from '../../assets/portfolio/play/duet-mug-build.png'
import drink from '../../assets/portfolio/play/duet-mug-drink.png'
import CaseMeta from '../../components/CaseMeta.jsx'
import '../CaseStudy.css'

export default function DuetMugPage() {
  return (
    <article className="case">
      <div className="case__hero case__hero--natural case__hero--duet-top">
        <img src={top} alt="Duet mug on wood beside a product cutout" />
      </div>

      <header className="case__header">
        <h1 className="case__title text-h1">Duet Mug</h1>
        <p className="case__lede text-body">
          Ceramics for disability and dignity. A two-handled mug that avoids the
          medicalized and/or sippy-cup look of most assistive drinkware.
        </p>
        <CaseMeta label="Role">Designer, Ceramicist</CaseMeta>
        <CaseMeta label="Methods + tools">
          CAD, form sketching, ceramics (handbuilding / slab / coil)
        </CaseMeta>
      </header>

      <section className="case__body text-body">
        <p>
          Duet Mug is a personal project about approaching design for disability
          differently. Assistive devices in general have a high abandonment rate.
          This is in part because traditional engineering/medical approaches to
          product development often focus on maximizing quantitative
          functionality over human-centered design objectives.
        </p>
        <p>
          People with limited dexterity often struggle with drinking. Cups with
          two handles are extremely helpful; however, products on the market
          often resemble children&apos;s sippy cups. As a result, many adults
          choose to continue using regular ceramic-ware with difficulty.
        </p>
      </section>

      <section className="case__problem">
        <h2 className="case__section-title">Problem Space</h2>
        <div className="case__problem-row">
          <div className="case__stat">
            <div className="case__stat-row text-body">
              <span className="case__stat-num">30%</span>
              <span className="case__stat-label">
                of assistive devices are completely abandoned
              </span>
            </div>
            <p className="case__cite">
              Phillips, B, and H Zhao. “Predictors of assistive technology
              abandonment.” Assistive technology : the official journal of RESNA
              vol. 5,1 (1993): 36-45. doi:10.1080/10400435.1993.10132205
            </p>
          </div>
          <div className="case__problem-aside">
            <div className="case__frame case__frame--market">
              <img
                src={market}
                alt="Clear plastic two-handled cups with lids that resemble sippy cups"
              />
            </div>
            <p className="case__problem-caption text-body">
              Two-handled cups on the market tend to resemble hospital equipment
              and/or children&apos;s sippy cups.
            </p>
          </div>
        </div>
      </section>

      <section className="case__body text-body">
        <h2 className="case__section-title">
          Sketching and Concepting
        </h2>
      </section>

      <div className="case__media case__media--sketches">
        <img
          src={sketches}
          alt="Open sketchbook with two-handled mug ideation drawings"
        />
      </div>

      <div className="case__grid">
        <div className="case__frame case__frame--contain case__frame--paper">
          <img
            src={sketches2}
            alt="Ink sketches exploring dual-handle mug silhouettes"
          />
        </div>
        <div className="case__frame case__frame--contain case__frame--paper">
          <img
            src={form}
            alt="Annotated sketches comparing foot stability and handle extensions"
          />
        </div>
      </div>

      <section className="case__body text-body">
        <p>
          I realized that the following three elements help to avoid the
          &ldquo;sippy&rdquo; cup look.
        </p>
        <ol className="case__list">
          <li>Non-traditional handle (arched) shapes</li>
          <li>Straight lines to avoid molded-plastic look</li>
          <li>Tall, narrow accent foot creates a hand-crafted feel</li>
        </ol>
      </section>

      <section className="case__body text-body">
        <h2 className="case__section-title">
          3D Form Development + Slab Planning
        </h2>
        <div className="case__planning">
          <div className="case__planning-list">
            <div className="case__planning-row">
              <div className="case__frame case__frame--contain case__frame--paper case__frame--cad">
                <img
                  src={cad1}
                  alt="CAD model of a multi-slab tapered mug with pattern callouts"
                />
              </div>
              <p>
                Tapered forms require truncated cone slabs, which are difficult
                to cut accurately, and require a large surface area.
              </p>
            </div>
            <div className="case__planning-row">
              <div className="case__frame case__frame--contain case__frame--paper case__frame--cad">
                <img
                  src={cad2}
                  alt="CAD model of a simpler cylindrical mug with slab callouts"
                />
              </div>
              <p>
                Reduced the number of slabs needed for construction. Felt bulky.
              </p>
            </div>
            <div className="case__planning-row">
              <div className="case__frame case__frame--contain case__frame--paper case__frame--cad">
                <img
                  src={cad3}
                  alt="CAD model of the final tapered mug with a tall foot"
                />
              </div>
              <p>
                Reduced to a single complex tapered slab with a taller foot.
              </p>
            </div>
          </div>
          <div className="case__frame case__frame--clay">
            <img
              src={clay}
              alt="Unfired clay mug body held in a ceramics studio"
            />
          </div>
        </div>
      </section>

      <section className="case__body text-body">
        <h2 className="case__section-title">Reflection</h2>
        <p>
          Design is about compromises. I eliminated many elements that
          would&apos;ve optimized functionality.
        </p>
        <p>
          Plastic is more durable against drops, a low/no foot is more stable,
          and large traditional handles are easier to hold and manufacture.
          However, these are all elements that read as a sippy cup during my
          sketching phase. Objectives are only an approximation of the end goal.
          If I had optimized for those functional objectives, I would&apos;ve
          ended with a product that many people do not want to use.
        </p>
      </section>

      <div className="case__grid">
        <div className="case__frame">
          <img
            src={build}
            alt="Unfired Duet mug drying with sponges supporting the handles"
          />
        </div>
        <div className="case__frame">
          <img src={drink} alt="Drinking from the finished Duet mug with both hands" />
        </div>
      </div>
    </article>
  )
}
