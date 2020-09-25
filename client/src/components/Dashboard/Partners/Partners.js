import React, { useEffect, useState } from 'react'
import { 
  Row,
  Col,
  Container
} from 'reactstrap'
import { PoolCard } from '../Staking/PoolCard';
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { PoolInterface } from '../Staking/PoolInterface';
import DeFiat_FarmingExt from 'contracts/DeFiat_EXTFarming_V2.json'

export const Partners = ({
  web3,
  accounts,
  network
}) => {
  const { path } = useRouteMatch();

  const [isLoading, setLoading] = useState(true);
  const [blockNumber, setBlockNumber] = useState(0);
  const [poolMetrics, setPoolMetrics] = useState([]);

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
  }, [])
  
  const loadPoolData = async () => {
    const extended = network.extendedPools.map((pool) => new web3.eth.Contract(DeFiat_FarmingExt.abi, pool.poolAddress));
    const values = await Promise.all(
      extended.map((pool) => pool.methods.poolMetrics().call())
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
                {network && network.extendedPools.map((pool, i) => (
                  <Col lg="5" key={i}>
                    <PoolCard
                      web3={web3}
                      accounts={accounts}
                      network={network}
                      blockNumber={blockNumber}
                      poolMetrics={poolMetrics[i]}
                      isExtendedPool
                      {...pool}
                    />
                  </Col>
                ))}
              </Row>
            </Route>
            <Route path={`${path}/:contractId`}>
              <PoolInterface
                accounts={accounts}
                web3={web3}
                network={network}
                isExtendedPool
              />
            </Route>
          </Switch>
        </Container>
      )}
    </>
  )
}