import addMonths from 'date-fns/add_months';
import addYears from 'date-fns/add_years';
import endOfMonth from 'date-fns/end_of_month';
import endOfYear from 'date-fns/end_of_year';
import format from 'date-fns/format';
import startOfMonth from 'date-fns/start_of_month';
import startOfYear from 'date-fns/start_of_year';
import subMonths from 'date-fns/sub_months';
import subYears from 'date-fns/sub_years';
import { ExchangeRateT } from 'entities/Currency';
import { toUtcTimestamp } from 'util/timezone';
import { TransactionStateT } from './Transaction';
import ExpenseIncomeData from './Report/ExpenseIncomeData';
import NetWorthData from './Report/NetWorthData';
import ExpenseTagsData from './Report/ExpenseTagsData';

export interface ReportDataT {
  labels: string[];
  series: number[][];
  netWorthStart?: number;
  netWorthEnd?: number;
}

export interface ReportStateT {
  kind: ReportKindT;
  data: ReportDataT;
  date: DateRangeT;
  timespan: ReportTimespanT;
  accounts: string[];
  netWorthStack: number[];
  isLoading: boolean;
}

export enum ReportKindT {
  ExpenseIncome = 'expense_income',
  ExpenseTags = 'expense_tags',
  NetWorth = 'net_worth'
}

export enum ReportTimespanT {
  Yearly = 'yearly',
  Monthly = 'monthly'
}

const { Yearly, Monthly } = ReportTimespanT;

interface DateRangeT {
  start: number; // timestamp
  end: number; // timestamp
}

const Report = {
  defaultKind: ReportKindT.ExpenseIncome,
  defaultTimespan: Yearly,
  defaultDate(timespan = Yearly) {
    return dateRange(new Date(), timespan);
  },
  moveDateBackwards({ start }: DateRangeT, timespan: ReportTimespanT) {
    return dateRange(
      timespan === Yearly ? subYears(start, 1) : subMonths(start, 1),
      timespan
    );
  },
  moveDateForwards({ start }: DateRangeT, timespan: ReportTimespanT) {
    return dateRange(
      timespan === Yearly ? addYears(start, 1) : addMonths(start, 1),
      timespan
    );
  },
  kindOptions() {
    return [
      {
        key: ReportKindT.ExpenseIncome,
        value: ReportKindT.ExpenseIncome,
        text: 'Expense & Income'
      },
      {
        key: ReportKindT.ExpenseTags,
        value: ReportKindT.ExpenseTags,
        text: 'Expense by Tags'
      },
      {
        key: ReportKindT.NetWorth,
        value: ReportKindT.NetWorth,
        text: 'Net Worth'
      }
    ];
  },
  timespanOptions() {
    return [
      {
        key: Yearly,
        value: Yearly,
        text: 'Yearly'
      },
      {
        key: Monthly,
        value: Monthly,
        text: 'Monthly'
      }
    ];
  },
  timespanLabel(date: Date, timespan: ReportTimespanT) {
    return format(date, timespan === Yearly ? 'YYYY' : 'MMM, YYYY');
  },
  transactionFilters({ date, accounts }: ReportStateT) {
    return { date, accounts };
  },
  prepareData(
    report: ReportStateT,
    transactions: TransactionStateT[],
    exchangeRate: ExchangeRateT,
    base: string,
    netWorthEnd: number
  ): ReportDataT {
    switch (report.kind) {
      case ReportKindT.ExpenseIncome:
        return ExpenseIncomeData(report, transactions, exchangeRate, base);
      case ReportKindT.NetWorth:
        return NetWorthData(
          report,
          transactions,
          exchangeRate,
          base,
          netWorthEnd
        );
      case ReportKindT.ExpenseTags:
        return ExpenseTagsData(transactions, exchangeRate, base);
      default:
        throw new Error(`Unknown report kind "${report.kind}"`);
    }
  }
};

export default Report;

function dateRange(date: Date | number, timespan: ReportTimespanT): DateRangeT {
  const startFn = timespan === Yearly ? startOfYear : startOfMonth;
  const endFn = timespan === Yearly ? endOfYear : endOfMonth;
  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return {
    start: toUtcTimestamp(startFn(tomorrow)),
    end: toUtcTimestamp(endFn(tomorrow))
  };
}
