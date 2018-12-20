import React from 'react'
import { withRuntimeContext } from 'render'
import { EmptyState, Table } from 'vtex.styleguide'

const topics = [
  {
    link: {
      page: 'learn',
    },
    name: 'Home',
  },
  {
    link: {
      page: 'learn/update-after-mutation/list',
    },
    name: 'Update After Mutation',
  },
  {
    link: {
      page: 'learn/detail-preview/list',
    },
    name: 'Detail Preview',
  },
  {
    link: {
      page: 'learn/comming-soon',
    },
    name: 'Pagination',
  },
  {
    link: {
      page: 'learn/comming-soon',
    },
    name: 'Pagination 2',
  },
  {
    link: {
      page: 'learn/comming-soon',
    },
    name: 'Pagination 3',
  },
  {
    link: {
      page: 'learn/comming-soon',
    },
    name: 'Pagination 4',
  },
]

const tableSchema = {
  properties: {
    name: {
      title: 'Topics',
      type: 'string',
    },
  },
}

const EmptyStateFallback: React.SFC = () => (
  <div>
    <EmptyState title="Welcome!">
      <p>
        <a href="https://github.com/vtex-apps/catalogue" >
          Help Wanted
        </a>
      </p>
    </EmptyState>
  </div>
)

const InitFrame: React.SFC = withRuntimeContext(({ children, runtime }: any) => (
  <div className="flex flex-row">
    <div style={{minWidth: '300px'}}>
      <Table
        schema={tableSchema}
        items={topics}
        density="low"
        onRowClick={({rowData}: any) => runtime.navigate(rowData.link)}
      />
    </div>
    <div>
      {children || <EmptyStateFallback />}
    </div>
  </div>
))

export default InitFrame
