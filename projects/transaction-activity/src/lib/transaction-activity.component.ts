import { Component, Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'lib-transaction-activity',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  providers: [HttpClient],
  template: `
    <input [(ngModel)]="walletAddress" placeholder="Enter Wallet Address">
    <input [(ngModel)]="apiKey" placeholder="Enter API Key">
    <button (click)="getTransactions()">Fetch Transactions</button>
    <ul *ngIf="transactions">
      <li *ngFor="let transaction of transactions">{{ transaction }}</li>
    </ul>
  `,
  styles: [`
    input, button { margin: 5px; }
  `]
})
@Injectable()
export class TransactionActivityComponent {
  @Input() walletAddress: string = '';
  @Input() apiKey: string = '';
  transactions: any[] = [];

  private baseUrl = 'https://api.etherscan.io/api';


  constructor(private http: HttpClient) {}

  getTransactions() {
    if (!this.walletAddress || !this.apiKey) {
      alert('Please enter both wallet address and API key.');
      return;
    }
    const url = `${this.baseUrl}?module=account&action=txlist&address=${this.walletAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${this.apiKey}`;
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.transactions = response.result;
      },
      error: (err) => {
        console.error('Failed to fetch transactions:', err);
      }
    });
  }

}
