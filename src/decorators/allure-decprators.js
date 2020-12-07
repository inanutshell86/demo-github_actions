'use strict';

import allureReporter from '@wdio/allure-reporter';

export function step(name) {
	return function decorator(target, key, descriptor) {
		const original = descriptor.value;
		if (typeof original === 'function') {
			descriptor.value = function (...args) {
				if (name) {
					// enable after add security for report
					// allureReporter.startStep(name + ' ' + JSON.stringify(args));
					allureReporter.startStep(name);
				} else {
					// enable after add security for report
					// allureReporter.startStep(key + ' ' + JSON.stringify(args));
					allureReporter.startStep(key);
				}

				return original
					.apply(this, args)
					.then((data) => {
						allureReporter.endStep();
						return data;
					})
					.catch((error) => {
						allureReporter.endStep();
						throw error;
					});
			};
		}
		return descriptor;
	};
}
