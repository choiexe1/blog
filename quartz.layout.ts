import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

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
    Component.DesktopOnly(
      Component.Explorer({
        sortFn: (a, b) => {
          // 1. 파일 vs 폴더 구분
          if (a.type === "folder" && b.type === "file") return -1
          if (a.type === "file" && b.type === "folder") return 1

          // 2. 파일인 경우, date로 오름차순 정렬
          if (a.type === "file" && b.type === "file") {
            const dateA = new Date(a.frontmatter?.date || "1970-01-01")
            const dateB = new Date(b.frontmatter?.date || "1970-01-01")

            // 날짜 파싱 로그 확인
            console.log(`Comparing: ${dateA} vs ${dateB}`)

            return dateA.getTime() - dateB.getTime() // 오름차순으로 정렬
          }

          // 3. 폴더 이름 기준으로 정렬
          return a.name.localeCompare(b.name)
        },
      })
    ),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
      Component.Explorer({
        sortFn: (a, b) => {
          // 1. 파일 vs 폴더 구분
          if (a.type === "folder" && b.type === "file") return -1
          if (a.type === "file" && b.type === "folder") return 1

          // 2. 파일인 경우, date로 오름차순 정렬
          if (a.type === "file" && b.type === "file") {
            const dateA = new Date(a.frontmatter?.date || "1970-01-01")
            const dateB = new Date(b.frontmatter?.date || "1970-01-01")

            // 날짜 파싱 로그 확인
            console.log(`Comparing: ${dateA} vs ${dateB}`)

            return dateA.getTime() - dateB.getTime() // 오름차순으로 정렬
          }

          // 3. 폴더 이름 기준으로 정렬
          return a.name.localeCompare(b.name)
        },
      })
    ),
  ],
  right: [],
}
