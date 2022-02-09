export function navbarActive(compose, navbarItemPagePath) {
  return navbarItemPagePath === compose.getPagePath() ? 'active' : ''
}

export function setPageTitle(compose, pageTitle) {
  compose.setVariable('pageTitle', pageTitle)
}

export function getTitle(compose) {
  let title = ''
  const pageTitle = compose.getVariable('pageTitle')
  if (pageTitle) {
    title += pageTitle + ' | '
  }
  title += 'Example'
  return title
}
