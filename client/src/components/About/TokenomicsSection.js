import React from 'react'
import { Pie } from 'react-chartjs-2'
import {
  Row,
  Col,
  Container,
  Table,
} from 'reactstrap'


export const TokenomicsSection = () => {
  const pieData = () => {
    // var ctx = canvas.getContext("2d");

    // var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    // gradientStroke.addColorStop(0, '#80b6f4');
    // gradientStroke.addColorStop(1, '#FFFFFF');
    
    return {
      labels: [
        "Team",
        "Marketing/Ecosystem",
        "Development",
        "Liquidity",
        "Staking",
        // "Expenses"
      ],
      datasets: [{
        data: [30, 20, 20, 20, 10],
        borderColor: "#ffffff",
        backgroundColor: [
          "#212529",
          "#32325d",
          "#525f7f",
          "#6c757d",
          "#adb5bd",
          // "#ced4da"
        ]
      }]
    }
  };

  const chartOptions = {
      legend: {
        display: false
      }
  }

  return (
    <>
      <section className="section section-lg">
        <Container>
          <h2 className="display-2 text-center">Tokenomics</h2>
          <Row className="mt-4 mb-4">
            <Col lg="6">
              <Pie data={pieData} options={chartOptions} />
            </Col>
            <Col lg="6">
              <Table responsive>
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th>Description</th>
                    <th className="text-right">Token Allocation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">1</td>
                    <td>Team</td>
                    <td className="text-right">30M</td>
                  </tr>
                  <tr>
                    <td className="text-center">2</td>
                    <td>Marketing/Ecosystem</td>
                    <td className="text-right">20M</td>
                  </tr>
                  <tr>
                    <td className="text-center">3</td>
                    <td>Development</td>
                    <td className="text-right">20M</td>
                  </tr>
                  <tr>
                    <td className="text-center">4</td>
                    <td>Liquidity</td>
                    <td className="text-right">20M</td>
                  </tr>
                  <tr>
                    <td className="text-center">5</td>
                    <td>Staking</td>
                    <td className="text-right">10M</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}