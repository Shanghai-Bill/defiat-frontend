import React, { useEffect, useState } from 'react'
import { 
  Row,
  Col,
  Container
} from 'reactstrap'
import { PoolCard } from './PoolCard';
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { PoolInterface } from './PoolInterface';
import DeFiat_Farming from 'contracts/DeFiat_Farming_v15.json';
import { Operator } from '../Operator';

export const Staking = ({
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
          {/* <h1 className="text-left mt-2 mb-4">Block Number: <b>{blockNumber}</b></h1> */}
          <Switch>
            <Route exact path={path}>
              <Row className="justify-content-center mt-4">
                {network && network.pools.map((pool, i) => (
                  <Col lg="5" key={i}>
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
              </Row>
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
        </Container>
      )}
    </>
  )
}