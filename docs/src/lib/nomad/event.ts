// /v1/event/stream
import {readStream} from "@/lib/utils.ts";

type Event = {
  Topic: string;
  Type: string;
  Key: string;
  Namespace: string;
  Payload: any;
  FilterKeys: string[];
}
type EventStream = {
  Index: number;
  Events: Event[];
}

type EventMessageCallback = (stream: EventStream)=>void

export function getStream(
    baseUrl: string,
    onMessage: EventMessageCallback,
    onClose: VoidFunction,
    signal?: AbortSignal
): Promise<any> {
  return fetch(`${baseUrl}/v1/event/stream`, {signal})
      .then(readStream(onMessage))
      .then(onClose);
}
