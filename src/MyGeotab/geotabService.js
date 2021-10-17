let geotabApiReference
export class GeotabService {
	init(addinName, prod) {
		require('./geotabChecker')(prod)
		return new Promise((resolve, reject) => {
			if (geotabApiReference) {
				resolve(geotabApiReference)
			} else {
				if (geotab && !geotab.addin[addinName]) {
					geotab.addin[addinName] = function (api, state) {
						return {
							initialize: function (api, state, callback) {
								geotabApiReference = api
								callback()
								resolve(geotabApiReference)
							},
							focus: function () {
								// User interface is available
							},
							blur: function () {
								// Save any addin state
							},
						}
					}
					if (!prod) {
						require('./geotabInitializer')
					}
				}
			}
		})
	}
}
