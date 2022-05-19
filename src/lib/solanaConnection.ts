import { clusterApiUrl, Connection } from '@solana/web3.js';

const solanaConnection = Object.freeze(new Connection(clusterApiUrl('devnet')));

export default solanaConnection;
