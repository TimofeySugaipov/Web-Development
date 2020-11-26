function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = period;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
        this.value = 0;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        if (this.txt === ''){
        this.el.innerHTML = '<h1 class="wrap">'+'|'+'</h1>';
        } else {
        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
        }



        var that = this;
        var delta = 130;

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        delta = 300;
        this.isDeleting = false;
        this.loopNum = getRndInteger(1,this.toRotate.length)
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap {color: #dff5f2; margin: 50px auto 10px auto;}";
        document.body.appendChild(css);
    };
