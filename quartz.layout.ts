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
    Component.RecentNotes({ // 최근 노트 컴포넌트 추가
          title: "최근 글",
          limit: 5,
          showTags: true,
          linkToMore: "tags/recent-notes", // '더 보기' 링크 추가
          sort: (f1, f2) => {
               const dateA = f1.file?.frontmatter?.date ? new Date(f1.file.frontmatter.date.replace(" ", "T")) : new Date(0);
               const dateB = f2.file?.frontmatter?.date ? new Date(f2.file.frontmatter.date.replace(" ", "T")) : new Date(0);

               return dateB.getTime() - dateA.getTime();
          },
        }),
  ],
};

// components for pages that display lists of pages (e.g. tags or folders)
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
      order: ["sort", "filter", "map"],
    })),
  ],
  right: [],
};
