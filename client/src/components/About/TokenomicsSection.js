import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
  Row,
  Col,
  Container,
  Table,
} from 'reactstrap'
import ScrollAnimation from 'react-animate-on-scroll';

export const TokenomicsSection = () => {
  const pieData = () => {
    // var ctx = canvas.getContext("2d");

    // var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    // gradientStroke.addColorStop(0, '#80b6f4');
    // gradientStroke.addColorStop(1, '#FFFFFF');
    
    return {
      labels: [
        "Team",
        "Marketing",
        "Dev & Ops",
        "Treasury (liquidity/staking)"
      ],
      datasets: [{
        data: [5, 30, 40, 25],
        borderColor: "#ffffff",
        backgroundColor: [
          "#8355ff",
          "#a99cff",
          "#221c57",
          "#0091f2",
          // "#adb5bd",
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
    <section className="section section-lg">
      <img
        alt="..."
        className="bg about-5 floating"
        src={require("assets/img/treasury.png")}
      />
      <Container>
        <ScrollAnimation animateIn="fadeInUp">
          <h2 className="display-2 text-center">Tokenomics</h2>
        </ScrollAnimation>
        
        <Row className="mt-4 mb-4">
          <Col lg="6">
            <ScrollAnimation animateIn="fadeInLeft">
              <Doughnut data={pieData} options={chartOptions} />
            </ScrollAnimation>
            
          </Col>
          <Col lg="6">
            <ScrollAnimation animateIn="fadeInRight">
              <Table responsive>
                <thead>
                  <tr>
                    <th className="text-center">#</th>
                    <th>Description</th>
                    <th className="text-right">Supply</th>
                    <th className="text-right">Token Allocation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">1</td>
                    <td>Team</td>
                    <td className="text-right">5%</td>
                    <td className="text-right">25K</td>
                  </tr>
                  <tr>
                    <td className="text-center">2</td>
                    <td>Marketing</td>
                    <td className="text-right">30%</td>
                    <td className="text-right">150K</td>
                  </tr>
                  <tr>
                    <td className="text-center">3</td>
                    <td>Development & Ops</td>
                    <td className="text-right">40%</td>
                    <td className="text-right">200K</td>
                  </tr>
                  <tr>
                    <td className="text-center">4</td>
                    <td>Treasury (Liquidity & Staking)</td>
                    <td className="text-right">25%</td>
                    <td className="text-right">125K</td>
                  </tr>
                </tbody>
              </Table>
            </ScrollAnimation>
          </Col>
        </Row>
      </Container>
    </section>
  )
}