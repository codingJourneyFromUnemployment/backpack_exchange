import axios from "axios";
import crypto from "crypto";
import qs from "qs";
import WebSocket from "ws";

const backoff_exponent: number = 1.5;
const default_timeout_ms: number = 5000;
const BASE_URL: string = "https://api.backpack.exchange/";

//执行对应操作的命令
interface instructions {
  [index: string]: {
    [index: string]: {
      url: string;
      method: string;
    };
  };
}

const instructions = {
  public: {
    assets: { url: `${BASE_URL}api/v1/assets`, method: "GET" },
    markets: { url: `${BASE_URL}api/v1/markets`, method: "GET" },
    ticker: { url: `${BASE_URL}api/v1/ticker`, method: "GET" },
    depth: { url: `${BASE_URL}api/v1/depth`, method: "GET" },
    klines: { url: `${BASE_URL}api/v1/klines`, method: "GET" },
    status: { url: `${BASE_URL}api/v1/status`, method: "GET" },
    ping: { url: `${BASE_URL}api/v1/ping`, method: "GET" },
    time: { url: `${BASE_URL}api/v1/time`, method: "GET" },
    trades: { url: `${BASE_URL}api/v1/trades`, method: "GET" },
    tradesHistory: { url: `${BASE_URL}api/v1/trades/history`, method: "GET" },
  },
  private: {
    balanceQuery: { url: `${BASE_URL}api/v1/capital`, method: "GET" },
    depositAddressQuery: {
      url: `${BASE_URL}wapi/v1/capital/deposit/address`,
      method: "GET",
    },
    depositQueryAll: {
      url: `${BASE_URL}wapi/v1/capital/deposits`,
      method: "GET",
    },
    fillHistoryQueryAll: {
      url: `${BASE_URL}wapi/v1/history/fills`,
      method: "GET",
    },
    orderCancel: {
      url: `${BASE_URL}api/v1/order`,
      method: "DELETE",
    },
    orderCancelAll: {
      url: `${BASE_URL}api/v1/orders`,
      method: "DELETE",
    },
    orderExecute: {
      url: `${BASE_URL}api/v1/order`,
      method: "POST",
    },
    orderHistoryQueryAll: {
      url: `${BASE_URL}wapi/v1/history/orders`,
      method: "GET",
    },
    orderQuery: {
      url: `${BASE_URL}api/v1/order`,
      method: "GET",
    },
    orderQueryAll: {
      url: `${BASE_URL}api/v1/orders`,
      method: "GET",
    },
    withdraw: {
      url: `${BASE_URL}wapi/v1/capital/withdrawals`,
      method: "POST",
    },
    withdrawalQueryAll: {
      url: `${BASE_URL}wapi/v1/capital/withdrawals`,
      method: "GET",
    },
  },
};

//https://docs.backpack.exchange/#tag/Capital/operation/request_withdrawal
//https://ts.xcatliu.com/basics/type-of-object-interfaces.html
//https://axios-http.com/zh/docs/api_intro
//https://poe.com/chat/247hp0ozagoo9xjvj3x
