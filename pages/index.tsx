import { RULES } from '@/lib/rules';

const PHILOSOPHY = [
  'Use the platform. Reach for a native API before a library.',
  'Semantic HTML is free performance and free accessibility.',
  'CSS custom properties > component-scoped styles for theming.',
  'Offline is a feature, not an edge case.',
  'Never hard-code a color. Never reduce opacity on hover.',
];

export default function Home() {
  return (
    <main id="stage" className="px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-sans mb-2">
        markup.tips
      </h1>
      <p className="text-secondary legible text-lg mb-8">
        Performance-first, accessibility-first patterns for building modern web UIs.
        Each rule is a self-contained pattern an agent can apply without reading a full codebase.
      </p>

      {/* Rules */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Rules</h2>
        <ul className="space-y-3" role="list">
          {RULES.map(({ slug, title, summary, Icon }) => (
            <li key={slug}>
              <a
                href={`/rules/${slug}#stage`}
                className="card flex items-start gap-3 px-4 py-3 hover:no-underline"
              >
                <Icon size={20} className="shrink-0 mt-0.5 text-secondary" aria-hidden="true" />
                <div>
                  <span className="font-medium">{title}</span>
                  <span className="block text-sm text-secondary mt-0.5">{summary}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Philosophy */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Philosophy</h2>
        <ul className="space-y-2 list-disc pl-5 legible">
          {PHILOSOPHY.map((item) => (
            <li key={item} className="text-secondary">{item}</li>
          ))}
        </ul>
      </section>

      {/* Reference */}
      <section className="mt-12 mb-8">
        <h2 className="text-xl font-semibold mb-2">Reference Implementation</h2>
        <p className="text-secondary legible">
          <a href="https://github.com/jpdevries/pantry-host" className="underline underline-offset-2 hover:no-underline">
            pantry-host
          </a>{' '}
          — a self-hosted kitchen manager. Every rule in this directory is distilled from
          patterns proven in that codebase.
        </p>
      </section>
    </main>
  );
}
