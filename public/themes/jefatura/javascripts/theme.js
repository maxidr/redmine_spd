//document.observe("dom:loaded", function() {
//	var my_div = document.createElement('div');
//	Element.extend(my_div);
//	my_div.addClassName('jgm_title');
//	var search = document.getElementById('quick-search');
//	search.parentNode.insertBefore(my_div, search);
//});
//
//

function Agreement(){
	this.key = "agree_conditions";
};

Agreement.prototype.isAgree = function(){
	key_index = document.cookie.indexOf(this.key);
	if( key_index != -1 ){
		value_index = document.cookie.indexOf(this.key) + this.key.length + 1;
		if( document.cookie.substring(value_index, value_index + 1) == "1" ) { return true; }
	}
	return false;
};

Agreement.prototype.agree = function(){
	document.cookie = this.key + "=" + 1;
};


document.observe("dom:loaded", function() {
	document.agreement = new Agreement();
	if( !document.agreement.isAgree() ) {
		addJavascript(basePath() + '/themes/jefatura/javascripts/scriptaculous.js');
		// Modalbox: http://okonet.ru/projects/modalbox/index.html
		addJavascript(basePath() + '/themes/jefatura/javascripts/modalbox.js', function(){
			Modalbox.show(window.location.protocol + '//cluster.softwarepublico.gob.ar/condiciones.html', { 
				title: 'Condiciones de uso', width: 800, 
				overlayClose: false, autoFocusing: false});
		});
	}
});

function basePath(){
	l = window.location;
	return l.protocol + "//" + l.host + "/" + window.location.pathname.split('/')[1];
}

function onAcceptConditions(){
	document.agreement.agree();
	Modalbox.hide();
}


function addJavascript(src, callback) {
	var js = document.createElement('script');
	js.setAttribute('type', 'text/javascript');
	js.setAttribute('src', src);
	if( callback != undefined ) {
		js.onreadystatechange = js.onload = function(){
			var state = js.readyState;
			if( !state || /loaded|complete/.test(state) ){
				//callback.done = true;
				callback();
			}
		}
	}
	document.getElementsByTagName('head')[0].appendChild(js);
};

function addCss(src) {
	var css = document.createElement('link');
	css.setAttribute('rel', 'stylesheet');
	css.setAttribute('href', src);
	css.setAttribute('type', 'text/css');
	css.setAttribute('media', 'screen');
	document.getElementsByTagName('head')[0].appendChild(css);
};

 if (window.jQuery) { 
  $(document).ready(function(){

    console.log("ready!...");

    if (window.devicePixelRatio > 1) {
      var images = findImagesByRegexp('contacts_thumbnail', document);

      for(var i = 0; i < images.length; i++) {
        var lowres = images[i].src;
        old_size = lowres.match(/\/(\d*)$/)[1]
        var highres = lowres.replace(/\/(\d*)$/, "/" + String(old_size*2));
        images[i].src = highres;
      }

      var images = findImagesByRegexp(/gravatar.com\/avatar.*size=\d+/, document)

      for(var i = 0; i < images.length; i++) {
        var lowres = images[i].src;
        old_size = lowres.match(/size=(\d+)/)[1]
        var highres = lowres.replace(/size=(\d+)/, "size=" + String(old_size*2));
        images[i].src = highres;
        images[i].height = old_size;
        images[i].width = old_size;
      }    

// People avatars
      var images = findImagesByRegexp(/people\/avatar.*size=\d+$/, document)

      for(var i = 0; i < images.length; i++) {
        var lowres = images[i].src;
        old_size = lowres.match(/size=(\d+)$/)[1]
        var highres = lowres.replace(/size=(\d+)$/, "size=" + String(old_size*2));
        images[i].src = highres;
      }    


    }
  });
} else {
  document.observe("dom:loaded", function() {
    if (window.devicePixelRatio > 1) {
      var images = findImagesByRegexp('thumbnail', document);

      for(var i = 0; i < images.length; i++) {
        var lowres = images[i].src;
        old_size = lowres.match(/size=(\d*)$/)[1]
        var highres = lowres.replace(/size=(\d*)$/, "size=" + String(old_size*2));
        images[i].src = highres;
      }

      var images = findImagesByRegexp(/gravatar.com\/avatar.*size=\d+/, document)

      for(var i = 0; i < images.length; i++) {
        var lowres = images[i].src;
        old_size = lowres.match(/size=(\d+)/)[1]
        var highres = lowres.replace(/size=(\d+)/, "size=" + String(old_size*2));
        images[i].src = highres;
        images[i].height = old_size;
        images[i].width = old_size;      
      }    
    }

  });
}

function findImagesByRegexp(regexp, parentNode) {
   var images = Array.prototype.slice.call((parentNode || document).getElementsByTagName('img'));
   var length = images.length;
   var ret = [];
   for(var i = 0; i < length; ++i) {
      if(images[i].src.search(regexp) != -1) {
         ret.push(images[i]);
      }
   }
   return ret;
};
