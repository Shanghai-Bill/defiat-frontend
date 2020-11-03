import React, { useEffect, useState } from 'react'
import { 
  Row,
  Col,
  Container,
  Collapse,
  Button,
  CardBody,
    Card,
    CardTitle
} from 'reactstrap'
import { PoolCard } from './PoolCard';
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { PoolInterface } from './PoolInterface';
import DeFiat_Farming from 'contracts/DeFiat_Farming_v15.json';
import { Operator } from '../Operator';
import { DashboardCard } from './DashboardCard';

export const AnyStake = ({
  web3,
  accounts,
  network
}) => {
  const { path } = useRouteMatch();

  const [isLoading, setLoading] = useState(true);
  const [blockNumber, setBlockNumber] = useState(0);
  const [poolMetrics, setPoolMetrics] = useState([]);
  const [extendedMetrics, setExtendedMetrics] = useState([]);

  useEffect(() => {
    loadPoolData();
    const subscription = web3.eth.subscribe('newBlockHeaders', (error, result) => {
      if (!error) {
        setBlockNumber(result.number);
        loadPoolData();

        return;
      }
  
      console.error(error);
    })

    return () => subscription.unsubscribe();
  }, []);
  
  const loadPoolData = async () => {
    const contracts = network.pools.map((pool) => new web3.eth.Contract(DeFiat_Farming.abi, pool.poolAddress));
    const values = await Promise.all(
      contracts.map((pool) => pool.methods.poolMetrics().call())
    );
    setPoolMetrics(values);
    isLoading && setLoading(false);
    }

    return (
        <>
            {isLoading ? (
                <div className="content-center">
                    <Row className="justify-content-center">
                        <Col lg="3">
                            <img alt="loading" src={require("assets/img/Farm-Loading.gif")} />
                        </Col>
                    </Row>
                </div>
            ) : (
                    <Container>

                        <Container>

                                    <h1 className="text-tertiary">My AnyStake Summary</h1>

                            <Row>
                                        <Col lg="6" className="d-flex">
                                            <DashboardCard
                                        id="balance"
                                        header="240.05"
                                        title="DFT Balance"
                                        color="info"
                                        tooltip="The total amount of DFT in your connected ERC20 wallet."
                                        icon={require("assets/img/dft-logo.png")}
                                            />
                                        </Col>
                                        <Col lg="6" className="d-flex">
                                            <DashboardCard
                                        id="lpValue"
                                        header="0.8095 ETH"
                                        title="My Staked Liquidity Value"
                                        color="info"
                                        tooltip="The total amount of DFT in your connected ERC20 wallet."
                                        icon={require("assets/img/eth-logo.png")}
                                            />
                                        </Col>
                                        <Col lg="6" className="d-flex">
                                            <DashboardCard
                                        id="activeStakes"
                                        header="4"
                                        title="AnyStakes Active"
                                        color="info"
                                        tooltip="The total amount of DFT in your connected ERC20 wallet."
                                        icon={require("assets/img/spinner-solid.png")}
                                            />
                                        </Col>
                                        <Col lg="6" className="d-flex">
                                            <DashboardCard
                                        id="claimableRewards"
                                        header="22.10 DFT"
                                        title="Claimable Rewards"
                                        color="info"
                                        tooltip="The total amount of DFT in your connected ERC20 wallet."
                                        icon={require("assets/img/dft-logo.png")}
                                            />
                                        </Col>

                            </Row>
                         </Container>

                            <Container className="d-flex">
                            <Row>
                            <Switch>
                                <Route exact path={path}>
                                        {network && network.pools.map((pool, i) =>
                                        (
                                                <Col lg="4" key={i} >
                                                <PoolCard
                                                    web3={web3}
                                                    accounts={accounts}
                                                    network={network}
                                                    blockNumber={blockNumber}
                                                    poolMetrics={poolMetrics[i]}
                                                    {...pool}
                                                        />
                                                        </Col>
                                        ))}
                                </Route>
                                <Route path={`${path}/operator/:contractId`}>
                                    <Operator
                                        web3={web3}
                                        accounts={accounts}
                                        network={network}
                                    />
                                </Route>
                                <Route path={`${path}/:contractId`}>
                                    <PoolInterface
                                        accounts={accounts}
                                        web3={web3}
                                        network={network}
                                    />
                                </Route>
                                </Switch>
                                </Row>
                            </Container>
                        </Container>
                )}
        </>
    )
}