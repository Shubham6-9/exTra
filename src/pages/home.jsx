import React, {useEffect} from 'react'
import Summary from '../components/summary.jsx'
import RecentExpense from '../components/recentExpense.jsx'
import TotalExpense from '../components/totalExpense.jsx'

export default function Home() {
    return (
        <div>
            <Summary />
            <TotalExpense />
            <RecentExpense />
        </div>
    )
}
