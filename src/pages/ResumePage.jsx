import './ResumePage.css'

const EDUCATION = [
  {
    degree: 'MDes Master of Design',
    detail: ' / University of California, Berkeley / 2025–2026',
  },
  {
    degree: 'BASc Systems Design Engineering',
    detail: ' / University of Waterloo / 2019–2024',
  },
]

const SKILLS = [
  {
    title: 'Prototyping & Fabrication',
    items:
      'SolidWorks · Fusion 360 · 3D printing · Laser cutting · CNC Milling · Wood shop · Electronics · Microcontrollers (Arduino, ESP32) · Sewing',
  },
  {
    title: 'Human Factors & UX Research',
    items:
      'Usability testing · Cognitive task analysis · Heuristic evaluations · User research · Human-machine interaction · Validation & verification testing · Regulatory compliance · MIL-STD 1472 · NUREG-0700',
  },
  {
    title: 'UX Design',
    items:
      'Figma · Adobe Suite · Journey mapping · Information architecture · Wireframing & prototyping · Interaction design · Visual hierarchy & layout · Design systems',
  },
]

const EXPERIENCE = [
  {
    role: 'Human Factors Engineering Associate',
    meta: ' · Tetra Tech · Jul. 2024 – Oct. 2025',
    bullets: [
      'Evaluated how interfaces support operators’ sensory, cognitive, and physical needs; uncovered usability issues in control rooms and facilities; ensured designs met regulatory requirements.',
      'Synthesized technical constraints into clear, human-centred design requirements for engineering teams.',
    ],
  },
  {
    role: 'Human Factors Engineering Intern',
    meta: ' · CMC Electronics · Jul. 2023 – Sept. 2023',
    bullets: [
      'Investigated key human-machine interaction challenges of emerging VTOL/air taxi technology; translated them into design recommendations for cockpit systems.',
    ],
  },
  {
    role: 'Craftsmanship Engineering Intern',
    meta: ' · Tesla · Jan. 2023 – Apr. 2023',
    bullets: [
      'Defined craftsmanship targets/hardware UX across multiple vehicle systems on 300+ interior trim, controls, and exterior components, identifying and prioritizing issues that impact the customer’s perception of quality.',
    ],
  },
  {
    role: 'Physical Product Design Intern',
    meta: ' · Leonardo Industrial Design · Jan. 2022 – Apr. 2022',
    bullets: [
      'Designed intuitive attachment systems and accessories for a modular furniture line.',
      'Concepted, sketched, and prototyped accessible magnetic product packaging for tremor-damping glove.',
    ],
  },
  {
    role: 'Solar Car Interiors Lead',
    meta: ' · University of Waterloo Midnight Sun · Apr. 2020 – Oct. 2021',
    bullets: [
      'Led concept design, prototyping, and user testing of steering wheel, vehicle control panel, and interior door components (armrests, handles, trim, etc) to ensure a comfortable passenger experience.',
    ],
  },
  {
    role: 'Assistive Device Design Intern',
    meta: ' · Plant3r · Aug. 2021 – Oct. 2021',
    bullets: [
      'Led handle and trigger redesign of home farming assistive tool for people with mobility issues. Started a usability testing initiative, guiding the remote team to test with >15 participants.',
    ],
  },
  {
    role: 'UX Research Intern',
    meta: ' · Essential Accessibility · May 2021 – Aug. 2021',
    bullets: [
      'Led user research, interviews, design, and usability testing of new Design Evaluation platform released in 2022, where designers can assess their work for WCAG 2.0 accessibility compliance before development.',
    ],
  },
  {
    role: 'UX Design Intern',
    meta: ' · Wind River · Sept. 2020 – Dec. 2020',
    bullets: [
      'Designed and conducted usability testing of two dev-ops tools shipped as part of Wind River Studio in 2021 that enable teams to run automated pipelines, and run remote tests on PCBs.',
    ],
  },
  {
    role: 'Engineering Associate Intern',
    meta: ' · AceAge · Jan. 2020 – Apr. 2020',
    bullets: [
      'Sourced, tested, and implemented lubricants and bearing for cam mechanism, decreasing wear by 90%.',
      'Managed international product shipments by driving timelines and coordinating multi-stakeholder efforts.',
    ],
  },
]

export default function ResumePage() {
  const downloadPdf = () => {
    const previousTitle = document.title
    document.title = 'Joy-He-Resume'
    const restore = () => {
      document.title = previousTitle
      window.removeEventListener('afterprint', restore)
    }
    window.addEventListener('afterprint', restore)
    window.print()
  }

  return (
    <article className="resume" data-reveal>
      <div className="resume__intro">
        <p className="resume__tldr text-h1">
          <em>tl;dr:</em> human-centered design, engineering, and making
        </p>
        <button
          type="button"
          className="resume__download text-body"
          onClick={downloadPdf}
        >
          Download PDF
        </button>
      </div>

      <div className="resume__card">
        <header className="resume__header">
          <h1 className="resume__name">Joy He</h1>
          <p className="resume__links">
            <a href="https://joyhe.me">joyhe.me</a>
            <span aria-hidden="true"> • </span>
            <a href="mailto:joy.hej@outlook.com">joy.hej@outlook.com</a>
            <span aria-hidden="true"> • </span>
            <a
              href="https://linkedin.com/in/joy-hej"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/joy-hej
            </a>
          </p>
        </header>

        <section className="resume__section">
          <h2 className="resume__section-title">Education</h2>
          {EDUCATION.map((row) => (
            <p key={row.degree}>
              <strong>{row.degree}</strong>
              {row.detail}
            </p>
          ))}
        </section>

        <section className="resume__section">
          <h2 className="resume__section-title">Skills</h2>
          {SKILLS.map((s) => (
            <div key={s.title} className="resume__skill">
              <p className="resume__skill-title">{s.title}</p>
              <p>{s.items}</p>
            </div>
          ))}
        </section>

        <section className="resume__section resume__section--experience">
          <h2 className="resume__section-title">Experience</h2>
          {EXPERIENCE.map((job) => (
            <div key={`${job.role}-${job.meta}`} className="resume__job">
              <p className="resume__job-head">
                <strong>{job.role}</strong>
                {job.meta}
              </p>
              <ul className="resume__bullets">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </article>
  )
}
