import { Topic } from '../../typings/custom'

import AutomaticCacheUpdate from './AutomaticCacheUpdate'
import ExtensionPoints from './ExtensionPoints'
import Internationalization from './Internationalization'
import DynamicPagination from './Pagination/DynamicPagination'
import StaticPagination from './Pagination/StaticPagination'
import PreviewWithCachedData from './PreviewWithCachedData'
import Styleguide from './Styleguide'

const topics: Topic[] = [
  {
    Component: AutomaticCacheUpdate,
    name: 'Automatic cache update',
    slug: 'automatic-cache-update',
  },
  {
    Component: DynamicPagination,
    name: 'Dynamic pagination',
    slug: 'dynamic-pagination',
  },
  {
    Component: ExtensionPoints,
    name: 'Extension points',
    slug: 'extension-points',
  },
  {
    Component: Internationalization,
    name: 'Internationalization',
    slug: 'internationalization',
  },
  {
    Component: PreviewWithCachedData,
    name: 'Preview with cached data',
    slug: 'preview-with-cached-data',
  },
  {
    Component: StaticPagination,
    name: 'Static Pagination',
    slug: 'static-pagination',
  },
  {
    Component: Styleguide,
    name: 'Using VTEX Styleguide',
    slug: 'styleguide',
  },
]

export default topics
