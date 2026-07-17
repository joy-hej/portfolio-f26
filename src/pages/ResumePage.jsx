import './ResumePage.css'

const SKILLS = [
  {
    title: 'Prototyping & Fabrication',
    items:
      'SolidWorks · Fusion 360 · 3D printing · Laser cutting · CNC Milling · Wood shop · Electronics (sensor/actuator integration) · Microcontrollers (Arduino, ESP32) · Sewing',
  },
  {
    title: 'Human Factors & UX Research',
    items:
      'Usability testing · Cognitive task analysis · Heuristic evaluations · User research · Human-machine interaction · Validation & verification testing · Regulatory compliance · MIL-STD 1472 · NUREG-0700 · Accessibility (WCAG 2.0)',
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
    org: 'Tetra Tech',
    dates: 'Jul. 2024 – Oct. 2025',
    bullets: [
      'Conducted usability studies of nuclear systems to evaluate how well interfaces support operators’ sensory, cognitive, and physical needs; uncovered usability issues in control rooms and facilities; ensured designs met regulatory requirements.',
      'Synthesized technical constraints into clear, human-centred design requirements for engineering teams.',
    ],
  },
  {
    role: 'Human Factors Engineering Intern',
    org: 'CMC Electronics',
    dates: 'Jul. 2023 – Sept. 2023',
    bullets: [
      'Investigated how pilots and operators adapt to evolving VTOL regulations (training, cognitive workload, interface usability).',
      'Identified key human-machine interaction challenges; translated them into design recommendations for cockpit systems.',
    ],
  },
  {
    role: 'Craftsmanship Engineering Intern',
    org: 'Tesla',
    dates: 'Jan. 2023 – Apr. 2023',
    bullets: [
      'Optimized usability of hardware user interactions and controls for interior and exterior components.',
      'Managed vehicle design execution for programs including Cybertruck and Model Y by working cross-functionally with engineering, design studio, and dimensional teams.',
    ],
  },
  {
    role: 'Physical Product Design Intern',
    org: 'Leonardo Industrial Design',
    dates: 'Jan. 2022 – Apr. 2022',
    bullets: [
      'Designed intuitive attachment systems and accessories for a modular furniture line.',
      'Concepted, sketched, and prototyped accessible magnetic product packaging for tremor-damping glove.',
    ],
  },
  {
    role: 'Solar Car Interiors Lead',
    org: 'University of Waterloo Midnight Sun',
    dates: 'Apr. 2020 – Oct. 2021',
    bullets: [
      'Led concept design, prototyping, and user testing of steering wheel + hardware enclosure, vehicle control panel, and interior door components (armrests, handles, trim, etc) to ensure a comfortable, ergonomic passenger experience.',
    ],
  },
  {
    role: 'Assistive Device Design Intern',
    org: 'Plant3r',
    dates: 'Aug. 2021 – Oct. 2021',
    bullets: [
      'Led handle and trigger redesign of home farming assistive tool for people with mobility issues. Started a usability testing initiative, guiding the remote team to test with >15 participants.',
    ],
  },
  {
    role: 'UX Research Intern',
    org: 'Essential Accessibility',
    dates: 'May 2021 – Aug. 2021',
    bullets: [
      'Led user research, interviews, design/prototyping, and usability testing of new Design Evaluation platform released in 2022, where designers can assess their work for WCAG 2.0 accessibility compliance before development.',
    ],
  },
  {
    role: 'UX Design Intern',
    org: 'Wind River',
    dates: 'Sept. 2020 – Dec. 2020',
    bullets: [
      'Designed and conducted usability testing of two dev-ops tools shipped as part of Wind River Studio in 2021 that enable teams to run automated pipelines, and run remote tests on PCBs.',
    ],
  },
  {
    role: 'Engineering Associate Intern',
    org: 'AceAge',
    dates: 'Jan. 2020 – Apr. 2020',
    bullets: [
      'Sourced, tested, and implemented lubricants and bearing for cam mechanism, decreasing wear by 90%.',
      'Managed international product shipments by driving timelines and coordinating multi-stakeholder efforts.',
    ],
  },
]

export default function ResumePage() {
  return (
    <article className="resume" data-reveal>
      <p className="resume__tldr text-h1">
        <em>tl;dr:</em> human-centered design, engineering, and making
      </p>

      <div className="resume__card">
        <header className="resume__header">
          <h1 className="resume__name text-h1">Joy He</h1>
          <p className="resume__links text-body">
            <a href="https://joyhe.me">joyhe.me</a>
            <span aria-hidden="true"> / </span>
            <a href="mailto:joy.hej@outlook.com">joy.hej@outlook.com</a>
            <span aria-hidden="true"> / </span>
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
          <h2 className="resume__section-title text-h1">Education</h2>
          <p className="text-body">
            <strong>MDes Master of Design</strong> / University of California,
            Berkeley / 2025–2026
          </p>
          <p className="text-body">
            <strong>BASc Systems Design Engineering</strong> / University of
            Waterloo / 2019–2024
          </p>
        </section>

        <section className="resume__section">
          <h2 className="resume__section-title text-h1">Skills</h2>
          {SKILLS.map((s) => (
            <div key={s.title} className="resume__skill text-body">
              <p className="resume__skill-title">{s.title}</p>
              <p>{s.items}</p>
            </div>
          ))}
        </section>

        <section className="resume__section">
          <h2 className="resume__section-title text-h1">Experience</h2>
          {EXPERIENCE.map((job) => (
            <div key={`${job.role}-${job.org}`} className="resume__job text-body">
              <div className="resume__job-head">
                <p>
                  <strong>{job.role}</strong> / {job.org}
                </p>
                <p className="resume__dates">{job.dates}</p>
              </div>
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
