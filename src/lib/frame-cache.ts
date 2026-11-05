/** One bounded decode cache shared by every sequence; at most three requests in flight. */
class FrameCache {
  private images = new Map<string, ImageBitmap>();
  private pending = new Map<string, Promise<ImageBitmap | null>>();
  private queue: {
    src: string;
    priority: number;
    done: (image: ImageBitmap | null) => void;
  }[] = [];
  private active = 0;
  private limit = 18;
  private width = 1440;
  private pinned = new Set<string>();

  configure(mobile: boolean) {
    this.limit = mobile ? 10 : 18;
    this.width = mobile ? 960 : 1440;
  }
  get(src: string) {
    const image = this.images.get(src);
    if (image) {
      this.images.delete(src);
      this.images.set(src, image);
    }
    return image;
  }
  pin(src: string) {
    this.pinned.add(src);
  }
  unpin(src: string) {
    this.pinned.delete(src);
    this.trim();
  }
  private trim() {
    for (const [key, image] of this.images) {
      if (this.images.size <= this.limit) break;
      if (!this.pinned.has(key)) {
        image.close();
        this.images.delete(key);
      }
    }
  }
  load(src: string, priority = 0): Promise<ImageBitmap | null> {
    const existing = this.get(src);
    if (existing) return Promise.resolve(existing);
    const waiting = this.pending.get(src);
    if (waiting) {
      const item = this.queue.find((item) => item.src === src);
      if (item) item.priority = Math.max(priority, item.priority);
      return waiting;
    }
    const promise = new Promise<ImageBitmap | null>((done) => {
      this.queue.push({ src, priority, done });
    });
    this.pending.set(src, promise);
    this.drain();
    return promise;
  }
  /** A new seek invalidates speculative work, preserving visible target requests. */
  prune() {
    this.queue = this.queue.filter((item) => {
      if (this.pinned.has(item.src)) return true;
      item.done(null);
      this.pending.delete(item.src);
      return false;
    });
  }
  private drain() {
    while (this.active < 3 && this.queue.length) {
      this.queue.sort((a, b) => b.priority - a.priority);
      const item = this.queue.shift()!;
      this.active++;
      void (async () => {
        let image: ImageBitmap | null = null;
        try {
          const response = await fetch(item.src, { cache: "force-cache" });
          if (!response.ok) throw new Error(`Frame ${response.status}`);
          image = await createImageBitmap(await response.blob(), {
            resizeWidth: this.width,
            resizeQuality: "high",
          });
          this.images.set(item.src, image);
          // Promise consumers draw before eviction in the next microtask.
          item.done(image);
        } catch {
          item.done(null);
        } finally {
          this.pending.delete(item.src);
          this.active--;
          queueMicrotask(() => {
            this.trim();
            this.drain();
          });
        }
      })();
    }
  }
}
export const frameCache = new FrameCache();
