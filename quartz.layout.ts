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
    Component.DesktopOnly(
      Component.Explorer({
        sortFn: (a, b) => {
          const dateA = a.file?.frontmatter?.date
            ? new Date(a.file.frontmatter.date.replace(" ", "T"))
            : new Date(0);
          const dateB = b.file?.frontmatter?.date
            ? new Date(b.file.frontmatter.date.replace(" ", "T"))
            : new Date(0);

          return dateB.getTime() - dateA.getTime();
        },
        order: ["sort", "filter", "map"],
      })
    ),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
  afterBody: [
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Recent Notes", // 최근 게시물 제목
        limit: 5, // 표시할 최근 게시물 수
        showTags: true, // 태그 표시 여부
        linkToMore: "/tags", // 더 보기 링크
        sort: (f1, f2) => {
          const date1 = new Date(f1.frontmatter.date.replace(" ", "T"));
          const date2 = new Date(f2.frontmatter.date.replace(" ", "T"));
          return date2.getTime() - date1.getTime(); // 날짜 기준으로 내림차순 정렬
        },
      })
    ),
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
    Component.DesktopOnly(
      Component.Explorer({
        sortFn: (a, b) => {
          const dateA = a.file?.frontmatter?.date
            ? new Date(a.file.frontmatter.date.replace(" ", "T"))
            : new Date(0);
          const dateB = b.file?.frontmatter?.date
            ? new Date(b.file.frontmatter.date.replace(" ", "T"))
            : new Date(0);

          return dateB.getTime() - dateA.getTime();
        },
        order: ["sort", "filter", "map"],
      })
    ),
  ],
  right: [],
  afterBody: [
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Recent Notes", // 최근 게시물 제목
        limit: 5, // 표시할 최근 게시물 수
        showTags: true, // 태그 표시 여부
        linkToMore: "/tags", // 더 보기 링크
        sort: (f1, f2) => {
          const date1 = new Date(f1.frontmatter.date.replace(" ", "T"));
          const date2 = new Date(f2.frontmatter.date.replace(" ", "T"));
          return date2.getTime() - date1.getTime(); // 날짜 기준으로 내림차순 정렬
        },
      })
    ),
  ],
};
