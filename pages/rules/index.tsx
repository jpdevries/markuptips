import { RULES } from '@/lib/rules';

export default function RulesIndex() {
  return (
    <main id="stage" className="px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight font-sans mb-2">Rules</h1>
      <p className="text-secondary legible mb-8">
        Each file is a self-contained rule an agent can apply without reading a full codebase.
      </p>

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
    </main>
  );
}
