import { StatutTransaction } from "./enum/StatutTransaction.enum";
import { TypeTransaction } from "./enum/TypeTransaction.enum";

export class Transaction {
    id?: number;               
    montant?: number;           
    date?: Date;                
    idUser?: number;          
    statutTransaction?: StatutTransaction; // 
    typeTransaction?: TypeTransaction;     
  }
  