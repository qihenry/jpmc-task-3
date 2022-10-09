import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  timestamp: Date,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]) {
    const ABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price)/2;
    const DEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price)/2;
    const ratio = ABC/DEF;
    const upperB = 1.01;
    const lowerB = .99;
    return  {
      price_abc: ABC,
      price_def: DEF,
      ratio,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
        serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bound: upperB,
      lower_bound: lowerB,
      trigger_alert: (ratio > upperB || ratio <lowerB) ? ratio : undefined,  
    };
  }
}
