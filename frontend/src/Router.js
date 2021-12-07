import React from 'react'
import { BrowserRouter as Router, HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Bill from './pages/bill'
import Apply from './pages/apply'
import TodoApprove from './pages/todoApprove'
import TodoList from './pages/todoList'
import TodoDetail from './pages/todoDetail'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/todoApprove" element={<TodoApprove />} />
        <Route path="/todoList" element={<TodoList />} />
        <Route path="/todoDetail" element={<TodoDetail />}>
          <Route path=":id" element={<TodoDetail />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
