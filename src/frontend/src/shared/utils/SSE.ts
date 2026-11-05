import { computed, ref } from "vue";
import type { SSEStatus, SSEManagerOptions } from "../types/SSE";

class SSEManagerClass {
  private eventSource: EventSource | null = null;

  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  private retryCount = ref<number>(0);

  public status = ref<SSEStatus>("idle");

  private readonly options: SSEManagerOptions;

  constructor(options: SSEManagerOptions) {
    this.options = {
      maxRetryCount: 5,
      baseDelay: 2000,
      maxDelay: 30000,
      debug: true,
      ...options,
    };
  }

  private printLog(...args: unknown[]) {
    if (!this.options.debug) return;

    console.log("[SSE]", ...args);
  }

  private printError(...args: unknown[]) {
    console.error("[SSE]", ...args);
  }

  get isConnected() {
    return computed(() => this.status.value === "connected");
  }

  get isReconnecting() {
    return computed(() => this.status.value === "reconnecting");
  }

  get isConnecting() {
    return computed(() => this.status.value === "connecting");
  }

  get isIdle() {
    return computed(() => this.status.value === "idle");
  }

  get isDisconnected() {
    return computed(() => this.status.value === "disconnected");
  }

  async connect() {
    if (this.eventSource) {
      this.printLog("Already connected");

      return;
    }

    const token = this.options.getToken();

    if (!token) {
      this.printLog("Token not found");

      return;
    }

    if (token) {
      const valid = await this.options.refreshToken?.();
      this.printLog("valid :", valid);
      if (!valid) {
        return;
      }
    }

    this.status.value =
      this.retryCount.value > 0 ? "reconnecting" : "connecting";

    const url = `${this.options.url}?token=${encodeURIComponent(token)}`;

    this.printLog("Connecting:", url);

    this.eventSource = new EventSource(url);

    this.bindEvents();
  }

  private bindEvents() {
    if (!this.eventSource) {
      return;
    }

    this.eventSource.onopen = () => {
      this.printLog("✅ Connected");

      this.retryCount.value = 0;

      this.status.value = "connected";

      this.options.onConnected?.();
    };

    this.eventSource.onmessage = (event) => {
      console.log("event sse 2345334543565435:", event);
      try {
        const data = JSON.parse(event.data);

        this.printLog("📩 Message:", data);

        if (data.event_type === "force_logout") {
          this.printLog("🔴 Force logout");

          this.disconnect();

          this.options.onForceLogout?.(data);

          return;
        }

        this.options.onMessage?.(data, event);
      } catch (err) {
        this.printError("Parse error:", err);
      }
    };

    this.eventSource.onerror = (error) => {
      this.printError("❌ SSE Error:", error);

      this.options.onError?.(error);

      this.handleReconnect(error);
    };
  }

  disconnect() {
    this.clearReconnectTimer();

    if (this.eventSource) {
      this.printLog("🔒 Disconnect");

      this.eventSource.close();

      this.eventSource = null;
    }

    this.status.value = "disconnected";

    this.options.onDisconnected?.();
  }

  reconnect() {
    this.printLog("🔄 Manual reconnect");

    this.retryCount.value = 0;

    this.disconnect();

    this.connect();
  }

  private handleReconnect(error?: any) {
    this.disconnect();

    if (this.retryCount.value >= (this.options.maxRetryCount || 5)) {
      this.printError("❌ Max retry count reached");

      this.status.value = "disconnected";

      this.options.onErrorReconnect?.(error);

      return;
    }

    const delay = Math.min(
      (this.options.baseDelay || 2000) * Math.pow(2, this.retryCount.value),
      this.options.maxDelay || 30000,
    );

    this.status.value = "reconnecting";

    this.printLog(`🔄 Retry ${this.retryCount.value + 1} after ${delay}ms`);

    this.reconnectTimer = setTimeout(() => {
      this.retryCount.value++;

      this.connect();
    }, delay);
  }

  private clearReconnectTimer() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);

      this.reconnectTimer = null;
    }
  }

  destroy() {
    this.disconnect();

    this.retryCount.value = 0;

    this.status.value = "idle";
  }
}

export const SSEManager = (options: SSEManagerOptions) =>
  new SSEManagerClass(options);

export type SSEManagerType = SSEManagerClass;
