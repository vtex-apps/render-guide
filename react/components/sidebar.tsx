// This component renders the sidebar. It's currently a Styleguide's
// table component, but it should evolve into a more specific
// sidebar component

import React from 'react'
import { RenderContextProps, withRuntimeContext } from 'render'
import { Table } from 'vtex.styleguide'

type Props = RenderContextProps & {
  sidebar: any
}

const tableSchema = {
  properties: {
    name: {
      title: 'Topics',
      type: 'string',
    },
  },
}

const SideBarWithRutime: React.SFC<Props> = ({runtime, sidebar}) => (
  <Table
    fullWidth
    schema={tableSchema}
    items={sidebar}
    density="low"
    onRowClick={({rowData}: any) => runtime.navigate(rowData.link)}
  />
)

export const SideBar = withRuntimeContext(SideBarWithRutime)
