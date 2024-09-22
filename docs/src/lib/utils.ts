import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export type StreamCallback = (obj: any)=>void
export const readStream = (processLine: StreamCallback) => (response: Response) => {
  if(!response.body) return
  const stream = response.body.getReader();
  const matcher = /\r?\n/;
  const decoder = new TextDecoder();
  let buf: string | undefined = '';

  const loop = () =>
      stream.read().then<any>(({ done, value }) => {
        if(typeof buf === 'undefined') return
        if (done) {
          if (buf.length > 0) processLine(JSON.parse(buf));
        } else {
          const chunk = decoder.decode(value, {
            stream: true
          });
          buf += chunk;

          const parts = buf.split(matcher);
          buf = parts.pop();
          for (const i of parts.filter(p => p)) processLine(JSON.parse(i));
          return loop();
        }
      });

  return loop();
}
