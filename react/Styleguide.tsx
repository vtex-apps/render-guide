import React from 'react'
import { Button, Checkbox, PageBlock } from 'vtex.styleguide'

const Entrypoint: React.SFC = () => (
  <PageBlock>
    <ul className="list pl0">
      <li className="pv3">
        <Button>Button</Button>
      </li>
      <li className="pv3">
        <Checkbox
          checked={true}
          id="checkbox-0"
          label="Check 0"
          name="default-checkbox-group"
          value="option-0"
          onChange={() => null}
        />
        <Checkbox
          checked={false}
          id="checkbox-1"
          label="Check 1"
          name="default-checkbox-group"
          value="option-1"
          onChange={() => null}
        />
      </li>
    </ul>
  </PageBlock>
)

export default Entrypoint
