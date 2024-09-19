// /v1/event/stream
import {readStream, type StreamCallback} from "@/lib/utils.ts";

export function getStream(
    baseUrl: string,
    onMessage: StreamCallback,
    onClose: VoidFunction
): Promise<any> {
  return fetch(`${baseUrl}/v1/event/stream`)
      .then(readStream(onMessage))
      .then(onClose);
}
