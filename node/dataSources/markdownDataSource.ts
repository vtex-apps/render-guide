import { DataSource } from 'apollo-datasource'

import automaticCacheUpdateAfter from '../docs/automaticCacheUpdate/after.md'
import automaticCacheUpdateBefore from '../docs/automaticCacheUpdate/before.md'
import detailPreviewAfter from '../docs/detailPreview/after.md'
import detailPreviewBefore from '../docs/detailPreview/before.md'
import dynamicPaginationAfter from '../docs/dynamicPagination/after.md'
import dynamicPaginationBefore from '../docs/dynamicPagination/before.md'
import home from '../docs/home.md'
import paginationAfter from '../docs/pagination/after.md'
import paginationBefore from '../docs/pagination/before.md'
import styleguideAfter from '../docs/styleguide/after.md'
import styleguideBefore from '../docs/styleguide/before.md'

const mockedDS = {
  'automatic-cache-update/after': automaticCacheUpdateAfter,
  'automatic-cache-update/before': automaticCacheUpdateBefore,
  'detail-preview/after': detailPreviewAfter,
  'detail-preview/before': detailPreviewBefore,
  'dynamic-pagination/after': dynamicPaginationAfter,
  'dynamic-pagination/before': dynamicPaginationBefore,
  'home/before': home,
  'pagination/after': paginationAfter,
  'pagination/before': paginationBefore,
  'styleguide/after': styleguideAfter,
  'styleguide/before': styleguideBefore,
}

export class MardownDataSource extends DataSource {
  private db: Record<string, string>

  constructor() {
    super()

    this.db = mockedDS
  }

  public get = (id: string) => this.db[id]
}
