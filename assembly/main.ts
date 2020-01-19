//@nearfile
import { storage, logging } from "near-runtime-ts";
import { OracleQueryParams } from "./model";



// --- contract code goes below

// setResponse function // Loai
export function setResponse(apiResponse: string): void {
  storage.setString("response", apiResponse);
  logging.log("Response is now: " + apiResponse);
}

/* getResponse function
The original code causes a crash in the compilation process because there is no default value,
a value of null is set as the default to solve the problem. // Loai */
export function getResponse(): string | null {
  return storage.getString("response");
}

// setResponseByKey function // Loai
export function setResponseByKey(key: string, newResponse: string): void {
  storage.setString(key, newResponse);
}

/* getResponseByKey function
The original code causes a crash in the compilation process because there is no default value,
a value of null is set as the default to solve the problem. // Loai */
export function getResponseByKey(key: string): string | null {
  return storage.getString(key);
}



// setOracleQueryParams function // Loai
export function setOracleQueryParams(uid: string, url: string, callback: string): void {

  let oracleQueryParams = new OracleQueryParams()
  oracleQueryParams.uid = uid
  oracleQueryParams.url = url
  oracleQueryParams.callback = callback

  storage.setBytes(`oracleQueryParams`, oracleQueryParams.encode().serialize())
}
// getOracleQueryParams function // Loai
export function getOracleQueryParams(): OracleQueryParams {
  return OracleQueryParams.decode(storage.getBytes('oracleQueryParams'))
}


// finalizeBet function // Loai
export function finalizeBet(): void {
  let price = storage.getString("btc-price")
  if (price) {
    let btcPrice: f64 = parseFloat(price.split(',').join(''));
    let outcome: string;
    if (btcPrice >= 5000) {
      outcome = "BTC price is " + btcPrice.toString() + "- Pay Moon Hodler 2000 USD"
    } else {
      outcome = "BTC price is " + btcPrice.toString() + "- Pay FUD Hodler 2000 USD"
    }
    storage.setString("betOutcome", outcome)
  } else {
    storage.setString("betOutcome", "btc price is undefined")
  }
}