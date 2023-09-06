// Filtered list (show only relevant entries)
$$(".renttable tbody.sortable tr")
  .filter((tr) => {
    return !(
      Number(tr.children[0].getAttribute("data-sort-value")) === 1 &&
      Number(tr.children[4].getAttribute("data-sort-value")) <= 50
    )
  })
  .forEach((tr) => tr.remove())

// Grouped entries
copy(
  $$(".renttable tbody.sortable")
    .map((tbody) => {
      return [
        tbody.getAttribute("data-head"),
        [...tbody.querySelectorAll("tr")].map((tr) => tr.children[1].innerText),
      ]
    })
    .filter(([name, entries]) => entries.length >= 1),
)

// Formatted list
copy(
  $$(".renttable tbody.sortable")
    .map((tbody) => {
      return [
        tbody.getAttribute("data-head"),
        [...tbody.querySelectorAll("tr")].map((tr) => tr.children[1].innerText),
      ]
    })
    .filter(([name, entries]) => entries.length >= 1)
    .map(
      ([name, entries]) =>
        name + ":\n\n" + entries.map((entry) => "" + entry).join("\n"),
    )
    .join("\n\n"),
)

// Number of entries
$$(".renttable tbody.sortable tr").length
