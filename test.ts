import got from "got";
import crypto from "crypto";
import qs from "qs";
import WebSocket from "ws";

const BACKOFF_EXPONENT = 1.5;
const DEFAULT_TIMEOUT_MS = 5000;
const BASE_URL = "https://api.cf.backpack.exchange/";

interface APIInstruction {
  url: string;
  method: "GET" | "POST" | "DELETE";
}

interface APIInstructions {
  [key: string]: APIInstruction;
}

interface Config {
  privateKey: string;
  publicKey: string;
  timeout?: number;
}

// 此处省略了具体的类型声明，应根据声明文件中的定义来补充

class BackpackClient {
  private config: Config;
  private static instructions: {
    public: Map<string, APIInstruction>;
    private: Map<string, APIInstruction>;
  } = {
    public: new Map([
      ["assets", { url: `${BASE_URL}api/v1/assets`, method: "GET" }],
      // 其他公共指令
    ]),
    private: new Map([
      ["balanceQuery", { url: `${BASE_URL}api/v1/capital`, method: "GET" }],
      // 其他私有指令
    ]),
  };

  constructor(privateKey: string, publicKey: string) {
    this.config = { privateKey, publicKey };
    // Verify that the keys are a correct pair
    // Key verification logic...
  }

  private toPkcs8der(rawB64: string): crypto.KeyObject {
    // Private key conversion logic...
  }

  private toSpki(rawB64: string): crypto.KeyObject {
    // Public key conversion logic...
  }

  private getMessageSignature(
    request: object,
    privateKey: string,
    timestamp: number,
    instruction: string,
    window?: number
  ): string {
    // Message signature logic...
  }

  private async rawRequest(
    instruction: string,
    headers: object,
    data: object
  ): Promise<any> {
    // HTTP request logic...
  }

  // API methods
  async api(
    method: string,
    params: object,
    retrysLeft: number = 10
  ): Promise<any> {
    // API request logic...
  }

  // 公共方法
  async publicMethod(instruction: string, params = {}): Promise<any> {
    // Public method logic...
  }

  // 私有方法
  async privateMethod(instruction: string, params = {}): Promise<any> {
    // Private method logic...
  }

  // 业务逻辑方法，如 Balance, Deposits, Withdraw 等
  async Balance(): Promise<any> {
    // Balance method logic...
  }

  // 更多业务逻辑方法...

  subscribeOrderUpdate(): WebSocket {
    // Websocket connection logic...
  }
}
