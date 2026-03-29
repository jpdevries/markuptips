/**
 * MDX components — maps markdown elements to styled React elements.
 * Rex picks up this file automatically for all .mdx pages.
 */

export function useMDXComponents(components: Record<string, any>) {
  return {
    ...components,
  };
}
