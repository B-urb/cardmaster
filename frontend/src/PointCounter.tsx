import {Checkbox, Input, Segment} from "semantic-ui-react";


const PointCounter = () => {
  return <Segment>
    <Checkbox toggle label="Solo"/>
    <Checkbox toggle label="Bockrunde"/>
    <Checkbox toggle/>

    <Input type={"number"}/>

  </Segment>
}

export default PointCounter