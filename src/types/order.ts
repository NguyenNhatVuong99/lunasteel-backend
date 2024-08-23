import { OrderOffer } from "./orderOffer";
import { OrderProgress } from "./orderProgress";

interface IsReject {
    user_id: string;
    status: string;
}
export interface Order {
    id: string;
    ticket_id: string;
    user_id: string;
    customer_id: string;
    order_progresses: OrderProgress[];
    properties: 'STANDARDS' | 'NONE STANDARDS' | 'CLEARANCES';
    status: 'PENDING' | 'NOT ENOUGH INVENTORY' | 'DENIED' | 'OUT OF STOCK';
    total_price: number;
    tax: string[]; // Array of tax_id
    final_price: number;
    order_offers: OrderOffer[];
    is_reject: IsReject;
    is_draft: boolean;
    is_submit: boolean;
    is_deleted: boolean;
    created_at: Date; // Use Date for timestamp
    updated_at: Date; // Use Date for timestamp
  }