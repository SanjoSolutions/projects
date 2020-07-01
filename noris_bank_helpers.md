# Noris Bank Helpers

## Sum debits

```
function parseCurrency(value) {
    return parseFloat(value.replace(',', '.')) || 0
}

function sum(...values) {
    return values.reduce(
        (sum, value) => sum + value,
        0
    )
}

sum(...$$('.debit').map(node => node.innerText).map(parseCurrency))
```
