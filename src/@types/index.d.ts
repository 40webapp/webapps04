import { User } from '../models/user';
import { Role } from '../models/role';
import { Expense } from '../models/expense';

declare interface expense {
  user: typeof User;
  role: typeof Role;
  expense: typeof Expense;
}
