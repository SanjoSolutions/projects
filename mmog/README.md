# MMOG

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

### EC2

There is also a server component which runs on EC2.

## How to run the client

```sh
cd packages/client
yarn development
```
