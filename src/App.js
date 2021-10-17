import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { MyGeotabProvider, useMyGeotab } from './mygeotab-context'

function App() {
	const [api] = useMyGeotab({ addinName: 'test', production: false })
	const [devices, setDevices] = useState([])

	useEffect(() => {
		async function getDevices() {
			const devs = await api.callAsync('Get', { typeName: 'Device' })
			setDevices(devs)
		}
		if (api !== null) getDevices()
	}, [api])

	return (
		<div className="App">
			<header className="App-header">
				<h1>Geotab app</h1>
				{devices.map((dev) => (
					<>
						<p>{dev.name}</p>
					</>
				))}
			</header>
		</div>
	)
}
ReactDOM.render(
	<MyGeotabProvider>
		<App />
	</MyGeotabProvider>,
	document.getElementById('root')
)
