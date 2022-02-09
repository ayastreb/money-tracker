import React, { useState } from 'react'

import Chart from './Chart';
import calculate from './calculations';

const defaultOverpayment = { month: '1', year: '0', amount: '0' };

const LoanCalculator = () => {
    const [initial, setInitial] = useState('200000');
    const [rate, setRate] = useState('5');
    const [years, setYears] = useState('25');
    const [monthlyOverpayment, setMonthlyOverpayment] = useState('0');
    const [overpayments, setOverpayments] = useState([defaultOverpayment]);

    const updateOverpayment = index => ({ target }) =>
        setOverpayments(
            overpayments.map((overpayment, i) =>
                i === index
                    ? { ...overpayment, [target.name]: target.value }
                    : overpayment
            )
        );

    const { monthlyPayment, payments } = calculate(
        +initial,
        +years,
        +rate,
        +monthlyOverpayment,
        overpayments
    );
    return (
        <div className="container-full-page mt-settings">
            <div>
                <div className="container-fluid">
                    <div className="col-md-8 col-sm-12">
                        <div className="col-sm-4">
                            <div>
                                <h2>Initial</h2>
                                <label>Amount</label>
                                <input
                                    maxLength={7}
                                    value={initial}
                                    onChange={e => setInitial(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Years</label>
                                <input
                                    type="number"
                                    maxLength={2}
                                    value={years}
                                    onChange={e => setYears(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Rate</label>
                                <input
                                    type="number"
                                    step={0.1}
                                    value={rate}
                                    onChange={e => setRate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div>
                                <h2>Overpayment</h2>
                                <label>Monthly</label>
                                <input
                                    type="number"
                                    maxLength={5}
                                    value={monthlyOverpayment}
                                    onChange={e => setMonthlyOverpayment(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Year</label>
                                <label>Month</label>
                                <label>Amount</label>
                            </div>
                            {overpayments.map(({ year, month, amount }, i) => (
                                <div key={i}>
                                    <input
                                        type="number"
                                        min="0"
                                        max={years}
                                        value={year}
                                        name="year"
                                        onChange={updateOverpayment(i)}
                                    />
                                    <input
                                        type="number"
                                        min="1"
                                        max="12"
                                        value={month}
                                        name="month"
                                        onChange={updateOverpayment(i)}
                                    />
                                    <input
                                        type="text"
                                        value={amount}
                                        name="amount"
                                        onChange={updateOverpayment(i)}
                                    />

                                    {i === overpayments.length - 1 ? (
                                        <button
                                            className="btn btn-xs"
                                            onClick={() =>
                                                setOverpayments([...overpayments, defaultOverpayment])
                                            }
                                        >
                                            +
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-xs"
                                            onClick={() =>
                                                setOverpayments(overpayments.filter((_, j) => j !== i))
                                            }
                                        >
                                            X
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="col-sm-12">
                            <h2>
                                Monthly Payment
                                <span className="money">
                                    {(+monthlyOverpayment + monthlyPayment).toFixed(2)}
                                </span>
                            </h2>
                            <Chart payments={payments} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoanCalculator;
