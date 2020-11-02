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
import ExpenseIncomeDataLoader from './Report/ExpenseIncomeData';
import NetWorthDataLoader from './Report/NetWorthData';
import ExpenseTagsDataLoader from './Report/ExpenseTagsData';

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
  excludeTags: string[];
  netWorthStack: number[];
  isLoading: boolean;
}

export enum ReportKindT {
  ExpenseIncome = 'expense_income',
  NetIncome = 'net_income',
  ExpenseTags = 'expense_tags',
  NetWorth = 'net_worth'
}

export enum ReportTimespanT {
  Yearly = 'yearly',
  Monthly = 'monthly'
}

interface DateRangeT {
  start: number; // timestamp
  end: number; // timestamp
}

const { Yearly, Monthly } = ReportTimespanT;
export const defaultKind = ReportKindT.ExpenseIncome;
export const defaultTimespan = Yearly;

export function defaultDate(timespan = defaultTimespan) {
  return dateRange(new Date(), timespan);
}

export function moveDateBackwards(
  { start }: DateRangeT,
  timespan: ReportTimespanT
) {
  return dateRange(
    timespan === Yearly ? subYears(start, 1) : subMonths(start, 1),
    timespan
  );
}

export function moveDateForwards(
  { start }: DateRangeT,
  timespan: ReportTimespanT
) {
  return dateRange(
    timespan === Yearly ? addYears(start, 1) : addMonths(start, 1),
    timespan
  );
}

export function kindOptions() {
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
      key: ReportKindT.NetIncome,
      value: ReportKindT.NetIncome,
      text: 'Net Income'
    },
    {
      key: ReportKindT.NetWorth,
      value: ReportKindT.NetWorth,
      text: 'Net Worth'
    }
  ];
}

export function timespanOptions() {
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
}

export function timespanLabel(date: Date, timespan: ReportTimespanT) {
  return format(date, timespan === Yearly ? 'YYYY' : 'MMM, YYYY');
}

export function transactionFilters({ date, accounts }: ReportStateT) {
  return { date, accounts };
}

type DataLoaderFn = (
  report: ReportStateT,
  transactions: TransactionStateT[],
  exchangeRate: ExchangeRateT,
  base: string,
  netWorthEnd: number
) => ReportDataT;
type DataLoaderMapT = { [kind in ReportKindT]: DataLoaderFn };

const DataLoaderMap: DataLoaderMapT = {
  [ReportKindT.ExpenseIncome]: ExpenseIncomeDataLoader,
  [ReportKindT.NetIncome]: ExpenseIncomeDataLoader,
  [ReportKindT.ExpenseTags]: ExpenseTagsDataLoader,
  [ReportKindT.NetWorth]: NetWorthDataLoader
};

export const loadReportData: DataLoaderFn = (report, ...rest) => {
  return DataLoaderMap[report.kind](report, ...rest);
};

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
