import type { IncomingMessage } from "http";

export interface IncomingMessageWithBody extends IncomingMessage {
  body: string;
}
