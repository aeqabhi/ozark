"use client";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

// Register the necessary components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement
);

export default function page() {

  //line chart
  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Sales Data (Line Chart)",
      },
    },
  };

  // Doughnut Chart Data
  const doughnutData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Votes",
        data: [12, 19, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Votes Distribution (Doughnut Chart)",
      },
    },
  };

  // Bar Chart Data
  const barData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Votes Distribution (Bar Chart)",
      },
    },
  };
  return (
    <>
      <div className="app-main__inner">
        <div className="app-page-title">
          <div className="page-title-wrapper">
            <div className="page-title-heading">
              
              <div className="pt-3 pl-3">
                Dashboard
                <div className="page-title-subheading">
                  welcome to ozark
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-xl-4">
            <div className="card mb-3 widget-content bg-midnight-bloom">
              <div className="widget-content-wrapper text-white">
                <div className="widget-content-left">
                  <div className="widget-heading">Total Orders</div>
                  <div className="widget-subheading">Last year expenses</div>
                </div>
                <div className="widget-content-right">
                  <div className="widget-numbers text-white">
                    <span>1896</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4">
            <div className="card mb-3 widget-content bg-arielle-smile">
              <div className="widget-content-wrapper text-white">
                <div className="widget-content-left">
                  <div className="widget-heading">Clients</div>
                  <div className="widget-subheading">Total Clients Profit</div>
                </div>
                <div className="widget-content-right">
                  <div className="widget-numbers text-white">
                    <span>$ 568</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-4">
            <div className="card mb-3 widget-content bg-grow-early">
              <div className="widget-content-wrapper text-white">
                <div className="widget-content-left">
                  <div className="widget-heading">Followers</div>
                  <div className="widget-subheading">People Interested</div>
                </div>
                <div className="widget-content-right">
                  <div className="widget-numbers text-white">
                    <span>46%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-xl-none d-lg-block col-md-6 col-xl-4">
            <div className="card mb-3 widget-content bg-premium-dark">
              <div className="widget-content-wrapper text-white">
                <div className="widget-content-left">
                  <div className="widget-heading">Products Sold</div>
                  <div className="widget-subheading">Revenue streams</div>
                </div>
                <div className="widget-content-right">
                  <div className="widget-numbers text-warning">
                    <span>$14M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-4">
            <div className="mb-3 card">
              <div className="card-header-tab card-header-tab-animation card-header">
                <div className="card-header-title">
                  <i className="header-icon lnr-apartment icon-gradient bg-love-kiss"></i>
                  Sales Report
                </div>
              </div>
              <div className="card-body">
                <div className="card mb-3 widget-chart widget-chart2 text-left w-100">
                  <div className="widget-chat-wrapper-outer">
                    <div className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 py-3">
                      <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-4">
            <div className="mb-3 card">
              <div className="card-header-tab card-header">
                <div className="card-header-title">
                  <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure"></i>
                  Bandwidth Reports
                </div>
              </div>
              <div className="tab-content">
                <div className="tab-pane fade active show" id="tab-eg-55">
                  <div className="widget-chart p-3">
                    <div>
                      <Line data={lineData} options={lineOptions} />
                    </div>
                    <div className="widget-chart-content text-center mt-5">
                      <div className="widget-description mt-0 text-warning">
                        <i className="fa fa-arrow-left"></i>
                        <span className="pl-1">175.5%</span>
                        <span className="text-muted opacity-8 pl-1">
                          increased server resources
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="widget-content">
                          <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left">
                                <div className="widget-numbers fsize-3 text-muted">
                                  63%
                                </div>
                              </div>
                              <div className="widget-content-right">
                                <div className="text-muted opacity-6">
                                  Generated Leads
                                </div>
                              </div>
                            </div>
                            <div className="widget-progress-wrapper mt-1">
                              <div className="progress-bar-sm progress-bar-animated-alt progress">
                                <div
                                  className="progress-bar bg-danger"
                                  role="progressbar"
                                  aria-valuenow="63"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="widget-content">
                          <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left">
                                <div className="widget-numbers fsize-3 text-muted">
                                  32%
                                </div>
                              </div>
                              <div className="widget-content-right">
                                <div className="text-muted opacity-6">
                                  Submitted Tickers
                                </div>
                              </div>
                            </div>
                            <div className="widget-progress-wrapper mt-1">
                              <div className="progress-bar-sm progress-bar-animated-alt progress">
                                <div
                                  className="progress-bar bg-success"
                                  role="progressbar"
                                  aria-valuenow="32"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="widget-content">
                          <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left">
                                <div className="widget-numbers fsize-3 text-muted">
                                  71%
                                </div>
                              </div>
                              <div className="widget-content-right">
                                <div className="text-muted opacity-6">
                                  Server Allocation
                                </div>
                              </div>
                            </div>
                            <div className="widget-progress-wrapper mt-1">
                              <div className="progress-bar-sm progress-bar-animated-alt progress">
                                <div
                                  className="progress-bar bg-primary"
                                  role="progressbar"
                                  aria-valuenow="71"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="widget-content">
                          <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left">
                                <div className="widget-numbers fsize-3 text-muted">
                                  41%
                                </div>
                              </div>
                              <div className="widget-content-right">
                                <div className="text-muted opacity-6">
                                  Generated Leads
                                </div>
                              </div>
                            </div>
                            <div className="widget-progress-wrapper mt-1">
                              <div className="progress-bar-sm progress-bar-animated-alt progress">
                                <div
                                  className="progress-bar bg-warning"
                                  role="progressbar"
                                  aria-valuenow="41"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 col-lg-4">
            <div className="mb-3 card">
              <div className="card-header-tab card-header">
                <div className="card-header-title">
                  <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure"></i>
                  Bandwidth Reports
                </div>
              </div>
              <div className="tab-content">
                <div className="tab-pane fade active show" id="tab-eg-55">
                  <div className="widget-chart p-3">
                    <div>
                      <Bar data={barData} options={barOptions} />
                    </div>
                    <div className="widget-chart-content text-center mt-5">
                      <div className="widget-description mt-0 text-warning">
                        <i className="fa fa-arrow-left"></i>
                        <span className="pl-1">175.5%</span>
                        <span className="text-muted opacity-8 pl-1">
                          increased server resources
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="widget-content">
                          <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left">
                                <div className="widget-numbers fsize-3 text-muted">
                                  63%
                                </div>
                              </div>
                              <div className="widget-content-right">
                                <div className="text-muted opacity-6">
                                  Generated Leads
                                </div>
                              </div>
                            </div>
                            <div className="widget-progress-wrapper mt-1">
                              <div className="progress-bar-sm progress-bar-animated-alt progress">
                                <div
                                  className="progress-bar bg-danger"
                                  role="progressbar"
                                  aria-valuenow="63"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="widget-content">
                          <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left">
                                <div className="widget-numbers fsize-3 text-muted">
                                  32%
                                </div>
                              </div>
                              <div className="widget-content-right">
                                <div className="text-muted opacity-6">
                                  Submitted Tickers
                                </div>
                              </div>
                            </div>
                            <div className="widget-progress-wrapper mt-1">
                              <div className="progress-bar-sm progress-bar-animated-alt progress">
                                <div
                                  className="progress-bar bg-success"
                                  role="progressbar"
                                  aria-valuenow="32"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="widget-content">
                          <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left">
                                <div className="widget-numbers fsize-3 text-muted">
                                  71%
                                </div>
                              </div>
                              <div className="widget-content-right">
                                <div className="text-muted opacity-6">
                                  Server Allocation
                                </div>
                              </div>
                            </div>
                            <div className="widget-progress-wrapper mt-1">
                              <div className="progress-bar-sm progress-bar-animated-alt progress">
                                <div
                                  className="progress-bar bg-primary"
                                  role="progressbar"
                                  aria-valuenow="71"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="widget-content">
                          <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left">
                                <div className="widget-numbers fsize-3 text-muted">
                                  41%
                                </div>
                              </div>
                              <div className="widget-content-right">
                                <div className="text-muted opacity-6">
                                  Generated Leads
                                </div>
                              </div>
                            </div>
                            <div className="widget-progress-wrapper mt-1">
                              <div className="progress-bar-sm progress-bar-animated-alt progress">
                                <div
                                  className="progress-bar bg-warning"
                                  role="progressbar"
                                  aria-valuenow="41"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
