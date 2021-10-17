import * as React from 'react'
import { GeotabService } from './MyGeotab/geotabService'

const MyGeotabContext = React.createContext()

function mygeotabReducer(state, action) {
	switch (action.type) {
		case 'getApi': {
			return state
		}
		case 'setApi': {
			state = action.payload
			return state
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`)
		}
	}
}

function MyGeotabProvider({ children }) {
	const [state, dispatch] = React.useReducer(mygeotabReducer, null)
	const setApi = (_api) => dispatch({ type: 'setApi', payload: _api })
	const value = [state, setApi]
	return (
		<MyGeotabContext.Provider value={value}>
			{children}
		</MyGeotabContext.Provider>
	)
}

function useMyGeotab({ addinName, production }) {
	const context = React.useContext(MyGeotabContext)
	const [api, setApi] = context
	React.useEffect(() => {
		async function initApi() {
			try {
				const geotabService = new GeotabService()
				const apiRef = await geotabService.init(addinName, production)
				apiRef.getSession((credentials, server) => {
					if (credentials.database && server) {
						setApi(apiRef)
					}
				})
			} catch (error) {}
		}

		if (!api) initApi()
	}, [])
	if (context === undefined) {
		throw new Error('useMyGeotab must be used within a MyGeotabProvider')
	}

	return context
}

export { MyGeotabProvider, useMyGeotab }
