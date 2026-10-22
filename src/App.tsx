import { useState } from 'react'
import {
  TabStrip,
  TabStripTab,
  type TabStripSelectEventArguments,
} from '@progress/kendo-react-layout'
import ProductsGrid from './screens/ProductsGrid'
import RegistrationForm from './screens/RegistrationForm'
import ConfirmDialogScreen from './screens/ConfirmDialogScreen'

function App() {
  const [selected, setSelected] = useState(0)

  const handleSelect = (e: TabStripSelectEventArguments) => setSelected(e.selected)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <header className="app-header">
        <h1>KendoReact Demo</h1>
      </header>
      <main id="main" className="app-main" tabIndex={-1}>
        <TabStrip selected={selected} onSelect={handleSelect}>
          <TabStripTab title="Products">
            <ProductsGrid />
          </TabStripTab>
          <TabStripTab title="Registration">
            <RegistrationForm />
          </TabStripTab>
          <TabStripTab title="Project settings">
            <ConfirmDialogScreen />
          </TabStripTab>
        </TabStrip>
      </main>
    </>
  )
}

export default App
