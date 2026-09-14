import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Braces,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDashed,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileText,
  Github,
  GitBranch,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  RefreshCw,
  Send,
  Sparkles,
  Sun,
  Terminal,
  Users,
  X,
} from "lucide-react";

type ProjectStatus = "completed" | "prototype" | "ongoing";

type Project = {
  id: string;
  title: string;
  kicker: string;
  status: ProjectStatus;
  year: string;
  role: string;
  stack: string[];
  summary: string;
  contribution: string;
  learned: string;
  state: string;
  links?: { label: string; href: string }[];
};

const githubUrl = "https://github.com/thexplorer01";
const linkedinUrl = "https://www.linkedin.com/in/chinmay-raut-7720242b1";

const projects: Project[] = [
  {
    id: "villiverse",
    title: "Villiverse AI",
    kicker: "Predictive digital twin for smart villages",
    status: "prototype",
    year: "2026",
    role: "Final year team project · 4 members",
    stack: ["Python", "Flask"],
    summary:
      "A web-based prototype being developed with real village data from Newale, Dahanu. The idea is to make local development information easier to organize, understand, and eventually act on.",
    contribution:
      "Working collaboratively with the team while the product is still being shaped. I am keeping my contribution description intentionally open because the prototype is in progress.",
    learned:
      "How a messy, real-world problem becomes a set of data areas, screens, and decisions before it becomes a finished application.",
    state: "Prototype in progress",
  },
  {
    id: "retail",
    title: "Retail Sales Data Analysis",
    kicker: "A learning project in asking better questions of data",
    status: "completed",
    year: "2025",
    role: "Data analysis learner",
    stack: ["Python", "Pandas", "NumPy", "Matplotlib"],
    summary:
      "A retail sales data exploration project focused on working through a dataset, finding patterns, and understanding how analysis and visualization tools fit together.",
    contribution:
      "Helped identify and source a retail sales dataset, explored it with Python and Pandas, and worked with analysis and visualization tools.",
    learned:
      "The value of slowing down at the dataset stage: checking what the columns mean, deciding what is worth exploring, and separating an observation from a conclusion.",
    state: "Completed learning project",
  },
];

const skills = [
  {
    group: "Programming",
    icon: Braces,
    items: [
      { name: "Python", note: "Used for data analysis, notebooks, and AI workflow experiments." },
      { name: "SQL", note: "Learning to work with structured data and query thinking." },
      { name: "JavaScript", note: "Used while learning frontend fundamentals and interactions." },
      { name: "C / C++", note: "Academic programming foundations." },
      { name: "Java", note: "Basic familiarity from coursework and exploration." },
    ],
  },
  {
    group: "Data & analytics",
    icon: Database,
    items: [
      { name: "Pandas", note: "Used for dataset exploration and cleaning practice." },
      { name: "NumPy", note: "A supporting tool in Python analysis work." },
      { name: "Matplotlib", note: "Used to turn observations into simple visualizations." },
      { name: "Tableau", note: "Explored as part of learning data storytelling." },
      { name: "Power BI / Excel", note: "Basic familiarity from industrial training." },
    ],
  },
  {
    group: "Web & tools",
    icon: Code2,
    items: [
      { name: "HTML / CSS", note: "The building blocks I use to understand the browser." },
      { name: "Tailwind", note: "Exploring utility-first styling and design systems." },
      { name: "Git / GitHub", note: "Learning to make work visible and easier to revisit." },
      { name: "Jupyter / Colab", note: "Where a lot of my data and AI experiments begin." },
      { name: "Linux", note: "Learning the command line and the environment around code." },
    ],
  },
];

const exploring = [
  { label: "Python", state: "PRACTICING", detail: "Writing clearer, more reusable scripts." },
  { label: "Data analysis", state: "LEARNING", detail: "Going from messy tables to useful questions." },
  { label: "Prompt engineering", state: "EXPLORING", detail: "Testing how instructions change an AI workflow." },
  { label: "AI & LLM applications", state: "EXPLORING", detail: "Trying to understand what makes a useful application." },
  { label: "Web development", state: "PRACTICING", detail: "Building interfaces instead of only following tutorials." },
  { label: "Real-world software projects", state: "LEARNING", detail: "Understanding trade-offs, teamwork, and unfinished work." },
];

const learning = [
  "Better Python development",
  "Building real web applications",
  "Data analysis",
  "AI & LLM applications",
  "Software development practices",
  "Working in teams",
];

const timeline = [
  { year: "2023", title: "Started B.Tech", text: "Computer Science & Data Science" },
  { year: "2024", title: "Explored Android development", text: "Eureka Pitching · E-Cell documentation" },
  { year: "2025", title: "Learned through internships", text: "Data science, prompt engineering, analytics training" },
  { year: "2026", title: "Building Villiverse AI", text: "Final year team prototype" },
  { year: "2027", title: "Expected graduation", text: "Looking for the next place to learn by doing" },
];

function StatusBadge({ status }: { status: ProjectStatus }) {
  const config = {
    completed: { label: "Completed", className: "status-completed", icon: CheckCircle2 },
    prototype: { label: "Prototype", className: "status-prototype", icon: CircleDashed },
    ongoing: { label: "Ongoing", className: "status-ongoing", icon: Activity },
  }[status];
  const Icon = config.icon;
  return (
    <span className={`status-badge ${config.className}`}>
      <Icon size={13} strokeWidth={2.4} aria-hidden="true" /> {config.label}
    </span>
  );
}

function SectionHeader({ index, eyebrow, title, children }: { index: string; eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="section-header">
      <div className="section-index" aria-hidden="true">{index}</div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children && <div className="section-aside">{children}</div>}
    </div>
  );
}

export default function Home() {
  const [dark, setDark] = useState(() => window.localStorage.getItem("chinmay-theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openProject, setOpenProject] = useState("villiverse");
  const [selectedSkill, setSelectedSkill] = useState("Python");
  const [githubRepos, setGithubRepos] = useState<any[] | null>(null);
  const [githubLoading, setGithubLoading] = useState(true);
  const [githubError, setGithubError] = useState(false);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("chinmay-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/users/thexplorer01/repos?sort=updated&per_page=6")
      .then((response) => {
        if (!response.ok) throw new Error("GitHub request failed");
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setGithubRepos(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setGithubError(true);
      })
      .finally(() => {
        if (!cancelled) setGithubLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const selectedSkillNote = useMemo(() => {
    for (const group of skills) {
      const match = group.items.find((item) => item.name === selectedSkill);
      if (match) return match.note;
    }
    return "Choose a tool to see where it fits in my learning so far.";
  }, [selectedSkill]);

  const handleContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio message from ${form.get("name") || "someone"}`);
    const body = encodeURIComponent(`${form.get("message") || ""}\n\nReply to: ${form.get("email") || ""}`);
    window.location.href = `mailto:chinmay.raut.work@gmail.com?subject=${subject}&body=${body}`;
    setFormSent(true);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Chinmay Raut home">
          <span className="brand-mark">CR</span>
          <span>chinmay raut</span>
        </a>
        <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {["about", "projects", "experience", "skills", "contact"].map((item) => (
            <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
          <a className="nav-github" href={githubUrl} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
          <button className="theme-toggle" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? "light" : "dark"} mode`}>
            {dark ? <Sun size={16} /> : <Moon size={16} />}
            <span>{dark ? "light" : "dark"}</span>
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="live-dot" /> available for internships · mumbai, india</p>
            <h1>I build to understand<br /><em>how things work.</em></h1>
            <p className="hero-lede">I'm Chinmay Raut, a Computer Science & Data Science student exploring Python, data, AI, and the web through small experiments and unfinished ideas.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View my work <ArrowDown size={16} /></a>
              <a className="button button-quiet" href="https://drive.google.com/uc?export=download&id=15EwjGC2s66v1vLfPai8y6wBhLbR04s5n"
 download>Download resume <Download size={16} /></a>
              <a className="button button-quiet" href="#contact">Let's connect <ArrowUpRight size={16} /></a>
            </div>
            <div className="hero-meta"><span>Semester 7</span><span className="meta-separator">/</span><span>Graduating 2027</span><span className="meta-separator">/</span><span>Still learning</span></div>
          </div>
          <div className="terminal-panel" aria-label="Currently exploring terminal panel">
            <div className="terminal-top"><span><span className="terminal-dot red" /><span className="terminal-dot yellow" /><span className="terminal-dot green" /></span><span className="mono muted">exploring.py</span><span className="mono muted">⌘ 01</span></div>
            <div className="terminal-body">
              <p className="mono terminal-comment"># what I'm spending time with</p>
              <p className="mono"><span className="syntax-purple">currently_exploring</span> <span className="syntax-blue">=</span> [</p>
              {exploring.slice(0, 5).map((item, index) => <p className="mono terminal-line" key={item.label}><span className="syntax-orange">{index + 1}.</span> <span className="syntax-green">"{item.label}"</span>,</p>)}
              <p className="mono">]</p>
              <div className="terminal-footer"><span className="mono"><span className="prompt-symbol">→</span> learning in public</span><span className="terminal-cursor" /></div>
            </div>
          </div>
        </section>

        <section className="proof-strip section-wrap" aria-label="Portfolio status summary">
          <div><span className="proof-label">the honest version</span><strong>Curious enough to explore.<br />Serious enough to keep building.</strong></div>
          <div className="proof-stat"><span className="stat-number">02</span><span>projects<br />documented</span></div>
          <div className="proof-stat"><span className="stat-number">06</span><span>areas<br />in progress</span></div>
          <div className="proof-stat"><span className="stat-number">01</span><span>team prototype<br />underway</span></div>
        </section>

        <section className="content-section section-wrap" id="about">
          <SectionHeader index="01" eyebrow="A little context" title="About me" />
          <div className="about-grid">
            <div className="about-lead"><span className="quote-mark">“</span><p>I’m not an expert developer pretending to be one. I’m a student who likes trying tools, building small ideas, working with data, and understanding how different technologies connect.</p></div>
            <div className="about-copy"><p>Most of my learning has happened through experimentation. My interests have moved through Python, data analysis, AI, prompt engineering, web development, and Linux.</p><p>Right now, I’m looking for opportunities where I can work on real problems, learn from experienced people, and see what building technology in an actual team environment looks like.</p><a className="text-link" href="#contact">What I’m looking for <ArrowUpRight size={15} /></a></div>
          </div>
        </section>

        <section className="focus-section content-section" id="focus">
          <div className="section-wrap">
            <SectionHeader index="02" eyebrow="No percentages here" title="Currently exploring"><span className="mono section-note">updated: now</span></SectionHeader>
            <div className="explore-board">
              {exploring.map((item, index) => <div className="explore-row" key={item.label}><span className="explore-number">0{index + 1}</span><div className="explore-name"><span className={`state-dot ${item.state.toLowerCase()}`} /> <strong>{item.label}</strong></div><span className={`explore-state ${item.state.toLowerCase()}`}>{item.state}</span><span className="explore-detail">{item.detail}</span></div>)}
            </div>
          </div>
        </section>

        <section className="content-section section-wrap" id="projects">
          <SectionHeader index="03" eyebrow="Selected work" title="Projects that tell the story"><span className="section-note">status over polish</span></SectionHeader>
          <div className="project-list">
            {projects.map((project, index) => {
              const isOpen = openProject === project.id;
              return <article className={`project-story ${isOpen ? "is-open" : ""}`} key={project.id}>
                <button className="project-summary" onClick={() => setOpenProject(isOpen ? "" : project.id)} aria-expanded={isOpen}>
                  <span className="project-index">0{index + 1}</span>
                  <span className="project-main"><span className="project-kicker">{project.kicker}</span><strong>{project.title}</strong></span>
                  <span className="project-year">{project.year}</span>
                  <StatusBadge status={project.status} />
                  <ChevronDown className="project-chevron" size={21} />
                </button>
                {isOpen && <div className="project-detail">
                  <div className="project-detail-main"><p className="detail-label">overview</p><p className="project-summary-copy">{project.summary}</p><div className="project-detail-meta"><div><span className="detail-label">role</span><p>{project.role}</p></div><div><span className="detail-label">stack</span><div className="tag-list">{project.stack.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></div></div></div>
                  {project.id === "villiverse" ? <div className="system-map"><p className="detail-label">current prototype</p><div className="map-diagram"><span>water</span><span>electricity</span><span>population</span><span>infrastructure</span><i className="map-branch" /><strong>villiverse<br />ai</strong><i className="map-arrow" /><span className="map-portal">village portal</span><span className="map-reports">citizen reports</span></div><p className="map-note">A systems map, not a claim of finished AI predictions.</p></div> : <div className="analysis-note"><p className="detail-label">analysis notebook</p><div className="notebook-lines"><span>dataset → questions</span><span>questions → exploration</span><span>exploration → observations</span><span>observations → learning</span></div><p className="map-note">No invented metrics. The useful part was learning how to ask better questions.</p></div>}
                  <div className="project-bottom"><div><span className="detail-label">what I learned</span><p>{project.learned}</p></div><div><span className="detail-label">current state</span><p className="state-copy"><span className={`state-dot ${project.status}`} /> {project.state}</p></div></div>
                </div>}
              </article>;
            })}
          </div>
          <p className="section-footnote"><span className="mono">/</span> More experiments will live here as they become clear enough to explain.</p>
        </section>

        <section className="skills-section content-section" id="skills">
          <div className="section-wrap"><SectionHeader index="04" eyebrow="Tools I’ve touched" title="Skills & tools"><span className="section-note">click to inspect</span></SectionHeader>
            <div className="skills-layout"><div className="skill-groups">{skills.map((group) => { const Icon = group.icon; return <div className="skill-group" key={group.group}><div className="skill-group-title"><Icon size={17} /><span>{group.group}</span></div>{group.items.map((item) => <button className={`skill-chip ${selectedSkill === item.name ? "selected" : ""}`} onClick={() => setSelectedSkill(item.name)} key={item.name}>{item.name}{selectedSkill === item.name && <Check size={14} />}</button>)}</div>; })}</div><div className="skill-inspector"><span className="inspector-label mono">selected_tool</span><h3>{selectedSkill}</h3><p>{selectedSkillNote}</p><div className="inspector-rule" /><p className="inspector-honesty"><Sparkles size={15} /> I’m keeping this list descriptive, not pretending every tool is mastered.</p></div></div>
          </div>
        </section>

        <section className="content-section section-wrap" id="experience">
          <SectionHeader index="05" eyebrow="Where I’ve learned" title="Experience & timeline" />
          <div className="experience-grid"><div className="experience-column"><article className="experience-item"><div className="experience-date">MAY 2025</div><div><p className="eyebrow">Testriq QA Lab</p><h3>Data Science & Prompt Engineering Intern</h3><p>Contributed to a “Chain of Thought for Math Puzzles” project using Jupyter Notebook. Analyzed structured datasets and compared how different prompts affected reasoning workflows.</p></div></article><article className="experience-item"><div className="experience-date">NOV 2025</div><div><p className="eyebrow">In-college industrial training</p><h3>Data analytics + generative AI</h3><p>Training areas included Data Analytics with Power BI at Testriq QA Lab and Generative AI & LLM Application at Millionminds.</p></div></article></div><div className="timeline-column">{timeline.map((item, index) => <div className="timeline-item" key={item.year}><span className="timeline-year">{item.year}</span><span className="timeline-line"><span className="timeline-dot" /></span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div></div>
        </section>

        <section className="education-band content-section"><div className="section-wrap education-grid"><div><p className="eyebrow">Education</p><h2>St. John College of<br />Engineering & Management</h2><p className="education-degree">B.Tech · Computer Science & Data Science</p></div><div className="education-details"><span className="education-status"><span className="live-dot" /> currently semester 7</span><p>2023 — 2027</p><p className="muted-line">Relevant coursework: Data Structures & Algorithms · DBMS · Computer Networks · Operating Systems</p></div></div></section>

        <section className="content-section section-wrap" id="learning"><SectionHeader index="06" eyebrow="A work in progress" title="Still learning"><span className="section-note">growth, without the performance</span></SectionHeader><div className="learning-intro"><p>I don’t think a portfolio should only show what someone already knows. This is the list I’m actively trying to get better at — in projects, not just in theory.</p></div><div className="learning-grid">{learning.map((item, index) => <div className="learning-item" key={item}><span className="learning-index">0{index + 1}</span><span>{item}</span><ArrowUpRight size={16} /></div>)}</div></section>

        {!githubLoading && !githubError && githubRepos && githubRepos.length > 0 && <section className="github-section content-section" id="github"><div className="section-wrap"><SectionHeader index="07" eyebrow="Proof, not portfolio copy" title="From GitHub"><a className="text-link" href={githubUrl} target="_blank" rel="noreferrer">View profile <ExternalLink size={14} /></a></SectionHeader><div className="github-intro"><div><Github size={24} /><p>These are the public repositories currently visible on <a href={githubUrl} target="_blank" rel="noreferrer">github.com/thexplorer01</a>. No invented stats, no curated screenshots.</p></div><span className="github-live"><span className="live-dot" /> live public data</span></div><div className="repo-grid">{githubRepos.map((repo) => <a className="repo-card" href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id}><div className="repo-card-top"><GitBranch size={16} /><span>{repo.language || "repository"}</span><ArrowUpRight size={15} /></div><h3>{repo.name}</h3><p>{repo.description || "No description added yet."}</p><div className="repo-footer"><span>updated {new Date(repo.updated_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span><span>{repo.stargazers_count} ★</span></div></a>)}</div></div></section>}

        <section className="playground-section content-section"><div className="section-wrap playground-grid"><div><p className="eyebrow">A small tech playground</p><h2>Things I’m curious about.</h2><p className="playground-copy">The questions behind the projects are usually more interesting than the tools themselves.</p></div><div className="curiosity-list"><div><span>01</span><p>How AI actually reasons</p></div><div><span>02</span><p>Building useful software, not only tutorial projects</p></div><div><span>03</span><p>How real development teams work</p></div><div><span>04</span><p>Turning messy data into useful information</p></div></div></div></section>

        <section className="contact-section content-section" id="contact"><div className="section-wrap contact-grid"><div className="contact-copy"><p className="eyebrow">Open to the next thing</p><h2>Let’s connect.</h2><p>I’m currently looking for internship opportunities, collaborations, and chances to learn from real projects and teams.</p><div className="contact-links"><a href="mailto:chinmay.raut.work@gmail.com"><Mail size={17} /> chinmay.raut.work@gmail.com</a><span><MapPin size={17} /> Mumbai, Maharashtra, India</span></div></div><form className="contact-form" onSubmit={handleContact}><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input type="email" name="email" required placeholder="you@example.com" /></label><label>Message<textarea name="message" required placeholder="What would you like to talk about?" rows={4} /></label><button className="button button-primary" type="submit">{formSent ? <><Check size={16} /> Email draft opened</> : <><Send size={16} /> Send a note</>}</button><p className="form-note">This opens your email app — no message is stored here.</p></form></div></section>
      </main>

      <footer className="site-footer"><div className="section-wrap footer-inner"><div><a className="brand" href="#top"><span className="brand-mark">CR</span><span>chinmay raut</span></a><p>Computer Science & Data Science student</p></div><div className="footer-links"><a href={githubUrl} target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a><a href={linkedinUrl} target="_blank" rel="noreferrer"><Linkedin size={15} /> LinkedIn</a><a href="mailto:chinmay.raut.work@gmail.com"><Mail size={15} /> Email</a></div><p className="footer-note">Built while learning.<br /><span className="mono">© {new Date().getFullYear()} CR</span></p></div></footer>
      <a className="resume-float" href="https://drive.google.com/uc?export=download&id=15EwjGC2s66v1vLfPai8y6wBhLbR04s5n"
 download><FileText size={15} /> Resume <Download size={14} /></a>
    </div>
  );
}
