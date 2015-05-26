		function objToString (obj) {
			var str = '';
			for (var p in obj) {
			   if (!(obj[p] instanceof Function))
					str += p + ':' + (obj[p]||'""') + ',';
			}
			if (str.length)
			   str = str.substr(0, str.length-2);
			return "{"+str+"}";
		}