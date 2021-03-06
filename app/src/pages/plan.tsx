import React, { Fragment } from 'react';
import Button from '../components/button/button';
import { PlanContext } from '../machines/plan-machine'
import { State } from 'xstate';

interface Props {
  current: State<PlanContext, any, any>,
  send: Function
}

const handleClick = () => {

}

const renderLoading = () => (
  <p>loading...</p>
)

const renderPlan = (data: object) => (
  <p>Plan: {JSON.stringify(data)}</p>
)

const Plan = (props: Props) => {
  return (
    <Fragment>
      <h2>Plan</h2>
      {props.current.matches('loading') && renderLoading()}
      {props.current.context.plan.cycles.length > 0 && renderPlan(props.current.context.plan.cycles)}
      <Button title="Add Cycle" action={() => props.send('ADD_CYCLE')} />
    </Fragment>
  )
};

export default Plan;