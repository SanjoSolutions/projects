# @sanjo/mmog

## Note on licensing

Some assets (graphics) are licensed under a different license than the license in the file "LICENSE".
See `public/credits.html`.

## How to deploy

Requires:

- AWS CLI
- SAM CLI

```sh
sam build
sam deploy --guided
```

## How to run the client

```sh
cd packages/client
yarn development
```
