export function navbarActive(compose, navbarItemPagePath) {
  return navbarItemPagePath === compose.getPagePath() ? "active" : ""
}

export function setTitle(compose, title) {
  compose.setVariable("title", title)
}

export function getTitle(compose) {
  const title = compose.getVariable("title")
  return title ? title + " | " : ""
}
