var _ = require('underscore');

module.exports = function(api) {
	var base = {
			margin: 0,
			padding: 0,
			border: 0,
			'font-size': '100%',
			font: 'inherit',
			'vertical-align': 'baseline'
		},
		block = {
			display: 'block'
		},
		lineHeight = {
			'line-height': 1
		},
		list = {
			'list-style': 'none'
		},
		quote = {
			quotes: 'none',
			':before': {
				content: 'none'
			},
			':after': {
				content: 'none'
			}
		},
		table = {
			'border-collapse': 'collapse',
			'border-spacing': 0
		},
		resetStyle = {
			html: base,
			body: _.extend(_.clone(base), lineHeight),
			div: base,
			span: base,
			applet: base,
			object: base,
			iframe: base,
			h1: base,
			h2: base,
			h3: base,
			h4: base,
			h5: base,
			h6: base,
			p: base,
			blockquote: _.extend(_.clone(base), quote),
			pre: base,
			a: base,
			abbr: base,
			acronym: base,
			address: base,
			big: base,
			cite: base,
			code: base,
			del: base,
			dfn: base,
			em: base,
			img: base,
			ins: base,
			kbd: base,
			q: _.extend(_.clone(base), quote),
			s: base,
			samp: base,
			small: base,
			strike: base,
			strong: base,
			sub: base,
			sup: base,
			tt: base,
			var: base,
			b: base,
			u: base,
			i: base,
			center: base,
			dl: base,
			dt: base,
			dd: base,
			ol: _.extend(_.clone(base), list),
			ul: _.extend(_.clone(base), list),
			li: base,
			fieldset: base,
			form: base,
			label: base,
			legend: base,
			table: _.extend(_.clone(base), table),
			caption: base,
			tbody: base,
			tfot: base,
			thead: base,
			tr: base,
			th: base,
			td: base,
			article: _.extend(_.clone(base), block),
			aside: _.extend(_.clone(base), block),
			canvas: base,
			details: _.extend(_.clone(base), block),
			embed: base,
			figure: _.extend(_.clone(base), block),
			figcaption: _.extend(_.clone(base), block),
			footer: _.extend(_.clone(base), block),
			header: _.extend(_.clone(base), block),
			hgroup: _.extend(_.clone(base), block),
			menu: _.extend(_.clone(base), block),
			nav: _.extend(_.clone(base), block),
			output: base,
			ruby: base,
			section: _.extend(_.clone(base), block),
			summary: base,
			time: base,
			mark: base,
			audio: base,
			video: base
		};
	api.add(resetStyle);
};