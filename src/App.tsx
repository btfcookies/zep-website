const stats = [
  { value: 'Every 5 min', label: 'Birthday scan interval' },
  { value: '30 days', label: 'Upcoming birthday window' },
  { value: 'Guild scoped', label: 'Server-specific data model' },
];

const highlights = [
  {
    title: 'Timezone-aware birthday tracking',
    body: 'Members can use the server timezone or set their own IANA timezone so birthdays fire at the right midnight.',
  },
  {
    title: 'Automatic role assignment',
    body: 'Zep adds the configured birthday role when the day starts and removes it after the celebration ends.',
  },
  {
    title: 'Configurable announcements',
    body: 'Choose a channel, decide whether to ping members, and customize single or multi-birthday message templates.',
  },
  {
    title: 'Moderator controls',
    body: 'Manage Server users can override birthdays, fix timezones, and lock member edits with add-only mode.',
  },
];

const commandGroups = [
  {
    title: '/birthday',
    description: 'Core member commands for viewing, removing, and browsing birthdays.',
    commands: [
      '/birthday get [user] - View your own birthday or another member\'s',
      '/birthday remove - Remove your birthday from the current server',
      '/birthday upcoming - See the next 30 days of birthdays, paginated by 10',
    ],
  },
  {
    title: '/birthday set',
    description: 'Registration and personal timezone management.',
    commands: [
      '/birthday set date <month> <day> [timezone] - Set or update a birthday',
      '/birthday set timezone <timezone> - Update a personal timezone after registering',
    ],
  },
  {
    title: '/birthday override',
    description: 'Moderator-only controls for correcting member data.',
    commands: [
      '/birthday override set-date <user> <month> <day>',
      '/birthday override set-timezone <user> <timezone>',
      '/birthday override remove <user>',
    ],
  },
  {
    title: '/birthday config',
    description: 'Server configuration for channels, roles, templates, and behavior flags.',
    commands: [
      '/birthday config check - Validate role, channel, permissions, and totals',
      '/birthday config channel [channel] - Set or unset the announcement channel',
      '/birthday config role <role> - Choose the birthday role',
      '/birthday config timezone [timezone] - Set the server default timezone',
      '/birthday config message - Customize announcement templates',
      '/birthday config ping <enabled> - Toggle mention-based announcements',
      '/birthday config add-only <enabled> - Lock member edits after first set',
      '/birthday config private-confirms <enabled> - Make confirmations ephemeral',
    ],
  },
  {
    title: '/info',
    description: 'Utility commands for quick diagnostics and help.',
    commands: [
      '/info help - Browse all slash commands by category',
      '/info ping - Check roundtrip and WebSocket latency',
    ],
  },
];

const permissionCards = [
  {
    role: 'Members',
    items: [
      'Set, update, and remove their own birthday',
      'Choose a personal timezone',
      'View birthdays, upcoming dates, help, and ping',
    ],
  },
  {
    role: 'Moderators',
    items: [
      'Override any member birthday or timezone',
      'Remove birthdays for other members',
      'Access the full /birthday config suite',
      'Bypass add-only restrictions',
    ],
  },
  {
    role: 'Bot Requirements',
    items: [
      'Manage Roles to assign and remove the birthday role',
      'Send Messages and Embed Links for announcements',
      'Birthday role placed below the bot in role hierarchy',
    ],
  },
];

const technicalNotes = [
  'Leap-day birthdays are celebrated on Feb 28 during non-leap years.',
  'Guild settings and birthdays are stored per server in PostgreSQL.',
  'The /birthday config check command is the best troubleshooting starting point.',
  'Announcements fire within five minutes of midnight in the relevant timezone.',
];

function App() {
  return (
    <div className="page-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="hero">
        <nav className="topbar">
          <div className="brand-lockup">
            <img className="brand-mark" src="../zeplogo.png" alt="Zep logo" />
            <span>Zep</span>
          </div>

          <div className="nav-links">
            <a href="#commands">Commands</a>
            <a href="#permissions">Permissions</a>
            <a href="#setup">Setup</a>
          </div>
        </nav>

        <section className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Discord Birthday Bot</p>
            <h1>Timezone-aware birthday automation for busy Discord servers.</h1>
            <p className="hero-text">
              Zep handles birthday registration, role assignment, and announcement delivery with
              moderator-grade controls and a clean slash-command workflow.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#commands">
                Explore commands
              </a>
              <a className="button button-secondary" href="https://github.com/wbrous/zep/tree/main" target="_blank" rel="noreferrer">
                View GitHub
              </a>
            </div>

            <div className="stats-grid">
              {stats.map((stat) => (
                <article className="stat-card" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="logo-panel">
              <div className="logo-halo" />
              <img className="hero-logo" src="../zeplogo.png" alt="Zep mascot" />
              <div className="signal-card signal-primary">
                <span>Auto role</span>
                <strong>Birthday role enabled</strong>
              </div>
              <div className="signal-card signal-secondary">
                <span>Template ready</span>
                <strong>Hello, {'{name}'} 🎉</strong>
              </div>
            </div>
          </div>
        </section>
      </header>

      <main>
        <section className="section section-intro">
          <div className="section-heading">
            <p className="eyebrow">Overview</p>
            <h2>Built for servers that want birthdays to just work.</h2>
          </div>

          <div className="feature-grid">
            {highlights.map((item) => (
              <article className="feature-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section command-section" id="commands">
          <div className="section-heading">
            <p className="eyebrow">Commands</p>
            <h2>Slash commands organized around setup, moderation, and quick lookups.</h2>
          </div>

          <div className="command-grid">
            {commandGroups.map((group) => (
              <article className="command-card" key={group.title}>
                <div className="card-chip">{group.title}</div>
                <p>{group.description}</p>
                <ul>
                  {group.commands.map((command) => (
                    <li key={command}>{command}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section permissions-section" id="permissions">
          <div className="section-heading">
            <p className="eyebrow">Permissions</p>
            <h2>Clear separation between what members can do and what moderators control.</h2>
          </div>

          <div className="permission-grid">
            {permissionCards.map((card) => (
              <article className="permission-card" key={card.role}>
                <h3>{card.role}</h3>
                <ul>
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section setup-section" id="setup">
          <div className="setup-panel">
            <div>
              <p className="eyebrow">Operational notes</p>
              <h2>Designed for reliable automation, not manual babysitting.</h2>
            </div>

            <div className="notes-list">
              {technicalNotes.map((note) => (
                <article className="note-card" key={note}>
                  <span className="note-marker" />
                  <p>{note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;