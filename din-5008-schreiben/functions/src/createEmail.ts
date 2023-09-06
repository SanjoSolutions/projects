import moment from "moment"

export function createEmail({ to }: { to: string }): string {
  return `MIME-Version: 1.0
Date: ${moment().format("ddd, D MMM YYYY HH:mm:ss ZZ")}
Subject: Re: Share request for "DIN-5008 Template"
From: Jonas Aschenbrenner <jonas.aschenbrenner@gmail.com>
To: ${to}
Content-Type: multipart/alternative; boundary="0000000000009cccc905d9e2b418"

--0000000000009cccc905d9e2b418
Content-Type: text/plain; charset="UTF-8"
Content-Transfer-Encoding: quoted-printable

Hallo,

bitte das Dokument einfach auf Desktop =C3=BCber "Datei -> Kopie erstellen"
kopieren.
Auf Mobile scheint es auch eine M=C3=B6glichkeit in der Google Drive App zu
geben, das Dokument zu kopieren.
Dann k=C3=B6nnen sie die private Kopie des Dokuments beliebig bearbeiten
und der Zustand des geteilten Dokuments bleibt erhalten.

Mit freundlichen Gr=C3=BC=C3=9Fen
Jonas

--0000000000009cccc905d9e2b418
Content-Type: text/html; charset="UTF-8"
Content-Transfer-Encoding: quoted-printable

<div dir=3D"ltr">Hallo,<div><br></div><div>bitte das Dokument einfach auf D=
esktop =C3=BCber &quot;Datei -&gt; Kopie erstellen&quot; kopieren.</div><di=
v>Auf Mobile scheint es auch eine M=C3=B6glichkeit in der Google Drive App =
zu geben, das Dokument zu kopieren.</div><div>Dann k=C3=B6nnen sie die priv=
ate Kopie des Dokuments beliebig bearbeiten</div><div>und der Zustand des g=
eteilten Dokuments bleibt erhalten.</div><div><br></div><div>Mit freundlich=
en Gr=C3=BC=C3=9Fen</div>Jonas<br></div>

--0000000000009cccc905d9e2b418--`
}
