import { Topic } from '../../typings/custom'

import AutomaticCacheUpdates from './AutomaticCacheUpdates'
import ExtensionPoints from './ExtensionPoints'
import Internationalization from './Internationalization'
import DynamicPagination from './Pagination/DynamicPagination'
import StaticPagination from './Pagination/StaticPagination'
import PreviewWithCachedData from './PreviewWithCachedData'
import Styleguide from './Styleguide'

const topics: Topic[] = [
  {
    Component: AutomaticCacheUpdates,
    name: 'Automatic cache updates',
    slug: 'automatic-cache-updates',
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
    name: 'Static pagination',
    slug: 'static-pagination',
  },
  {
    Component: Styleguide,
    name: 'Using VTEX Styleguide',
    slug: 'styleguide',
  },
]

export default topics
