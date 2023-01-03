import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";



const Calculator = () => {
    const [principal, setPrincipal] = useState();
    const [rate, setRate] = useState();
    const [time, setTime] = useState();
    const [simpleInterest, setSimpleInterest] = useState();
    const [compoundInterest, setCompoundInterest] = useState();


    const Calculation = (principal, rate, timeValue) => {
        const data = [];
        for (let i = 1; i <= timeValue; i++) {
            const SI = (principal * rate * i) / 100;
            const CI = (principal * (1 + rate / 12)) ^ (12 * time);
            data.push({ year: i, SI, CI });
        }
        return data;
    };

    const data = {
        labels: [],
        datasets: [
            {
                label: "Simple Interest",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgb(6, 110, 29)",
                borderColor: "rgb(6, 240, 29)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgb(6, 240, 29)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(6, 240, 29)",
                pointHoverBorderColor: "rgb(2, 180, 0)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
            },
            {
                label: "Compound Interest",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgb(255, 21, 0)",
                borderColor: "rgb(255, 81, 0)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgb(255, 81, 0)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(255, 81, 0)",
                pointHoverBorderColor: "rgb(155, 81, 0)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    const CalculateValue = (e) => {
        e.preventDefault();
        setSimpleInterest((principal * rate * time) / 100);
        setCompoundInterest(parseInt(principal * Math.pow(1 + rate / 100, time) - principal));
    };
    const values = Calculation(principal, rate, time);
	values.forEach((value) => {
		data.labels.push(`Year ${value.year}`);
		data.datasets[0].data.push(value.SI);
		data.datasets[1].data.push(value.CI);
	});


    const Reset = (e) => {
        e.window.location.reload()
    }

    return (
        <div>
            <div>
                <div className="container-fluid">
                    <div className="row mt-2">
                        {/* First Container */}
                        <div className="col mt-5">
                            <div className='container-one '>

                                <div className="heading mb-4">
                                    <h2 className='text-center'>Interest Calculator</h2>
                                </div>

                                <form action="" onChange={Calculation} className="compound-form" >
                                    <div className="input-group">
                                        <label htmlFor="amount">Principal Amount:</label>
                                        <input type='number' className='input-text form-control' value={principal} onChange={(e)=>setPrincipal(e.target.value)} />
                                    </div>

                                    <div className="input-group">
                                        <label htmlFor="rates">Rate of Interest:</label>
                                        <input type='number' className='input-text form-control' value={rate} onChange={(e)=>setRate(e.target.value)} />
                                    </div>
                                    <div className="input-group ">
                                        <label htmlFor="years">Time Period(in Yrs):</label>
                                        <input type='number' className='input-text form-control'value={time} onChange={(e)=>setTime(e.target.value)} />
                                    </div>

                                    <div className="input-group ">
                                        <button className="btn" onClick={CalculateValue} title="Click to See Data" >Calculate
                                        </button>
                                        <button className="btn" onClick={Reset}>Reset Fields
                                        </button>
                                    </div>
                                </form>

                                <div className='result-area'>
                                    <p className='mb-3'>Total Simple Interest: ₹{simpleInterest}/- </p>
                                    <p>Total Compound Interest: ₹{compoundInterest}/-</p>
                                </div>
                            </div>
                        </div>


                        {/* Second Container */}
                        <div className="col mt-2 mb-5">
                            <div className='container-two '>
                                <div className="heading mb-5 text-center">
                                    <h2>Result on Graph</h2>
                                    <Line className="" data={data} options={options} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Calculator