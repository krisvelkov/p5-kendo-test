import { Grid, GridColumn } from '@progress/kendo-react-grid'
import { products } from '../data/products'

function ProductsGrid() {
  return (
    <section className="screen" aria-labelledby="products-heading">
      <h2 id="products-heading">Products</h2>
      <p className="screen-intro">
        Sort by clicking a column header, filter with the row below the headers, and page through results with the
        pager.
      </p>
      <Grid
        data={products}
        dataItemKey="id"
        autoProcessData
        sortable={{ mode: 'multiple', allowUnsort: true }}
        filterable
        pageable={{ buttonCount: 5, pageSizes: [10, 20, 50], info: true }}
        defaultTake={10}
        defaultSkip={0}
        defaultSort={[{ field: 'name', dir: 'asc' }]}
        navigatable
        aria-label="Products"
        style={{ height: 560 }}
      >
        <GridColumn field="id" title="ID" width={80} filter="numeric" />
        <GridColumn field="name" title="Product" />
        <GridColumn field="category" title="Category" width={160} />
        <GridColumn field="unitPrice" title="Unit price" width={150} filter="numeric" format="{0:c2}" />
        <GridColumn field="unitsInStock" title="In stock" width={140} filter="numeric" />
        <GridColumn field="firstOrderedOn" title="First ordered" width={190} filter="date" format="{0:d}" />
        <GridColumn field="discontinued" title="Discontinued" width={150} filter="boolean" />
      </Grid>
    </section>
  )
}

export default ProductsGrid
