declare module 'tronweb' {
  class TronWeb {
    constructor(
      fullNode: string,
      solidityNode: string,
      eventServer: string,
      privateKey: string
    );

    trx: {
      getBalance(address: string): Promise<number>;
    };

    contract(): {
      at(address: string): Promise<any>;
    };

    // Add other methods and properties as needed
  }

  export = TronWeb;
}