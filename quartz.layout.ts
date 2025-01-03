// quartz.layout.ts
import { PageLayout, SharedLayout } from "./quartz/cfg";
import * as Component from "./quartz/components";

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/choiexe1",
    },
  }),
};

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      sortFn: (a, b) => {
        const dateA = a.file?.frontmatter?.date ? new Date(a.file.frontmatter.date.replace(" ", "T")) : new Date(0);
        const dateB = b.file?.frontmatter?.date ? new Date(b.file.frontmatter.date.replace(" ", "T")) : new Date(0);

        return dateB.getTime() - dateA.getTime();
      },
      order: ["sort", "filter", "map"],
    })),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
  afterBody: [
      Component.Comments({
          provider: 'giscus',
          options: {
            // from data-repo
            repo: 'choiexe1/blog',
            // from data-repo-id
            repoId: 'R_kgDOMmPPeQ',
            // from data-category
            category: 'Announcements',
            // from data-category-id
            categoryId: 'DIC_kwDOMmPPec4ClsFo',
          }
    }),
  ],
};


// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
      sortFn: (a, b) => {
        const dateA = a.file?.frontmatter?.date ? new Date(a.file.frontmatter.date.replace(" ", "T")) : new Date(0);
        const dateB = b.file?.frontmatter?.date ? new Date(b.file.frontmatter.date.replace(" ", "T")) : new Date(0);

        return dateB.getTime() - dateA.getTime();
      },
      order: ["sort", "filter", "map"], // 적용할 함수의 순서
    })),
  ],
  right: [],
};
