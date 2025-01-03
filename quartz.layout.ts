import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

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
}

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
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

Component.Explorer({
  title: "Explorer",
  folderClickBehavior: "collapse",
  folderDefaultState: "collapsed",
  useSavedState: true,

  filterFn: (node) => node.name !== "tags", // 'tags' 폴더 제외
  mapFn: undefined,
  order: ["filter", "map", "sort"],
});

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer({
        sortFn: (a, b) => {
            // 파일과 폴더를 구분하여 정렬
            if (a.type === "folder" && b.type === "file") return -1;
            if (a.type === "file" && b.type === "folder") return 1;

            // 파일인 경우 date를 기준으로 정렬
            if (a.type === "file" && b.type === "file") {
              const dateA = new Date(a.frontmatter.date || 0);
              const dateB = new Date(b.frontmatter.date || 0);
              return dateB.getTime() - dateA.getTime(); // 최신순 정렬
            }

            // 폴더인 경우 이름을 기준으로 정렬
            return a.name.localeCompare(b.name);
          },
      })),
  ],
  right: [],
}
