/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import { Route, Router } from '@solidjs/router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import Editor from './pages/Editor'
import NotFound from './pages/NotFound'

const root = document.getElementById('root')

render(
  () => (
    <Router root={Layout}>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/editor/:id?" component={Editor} />
      <Route path="*404" component={NotFound} />
    </Router>
  ),
  root!,
)
