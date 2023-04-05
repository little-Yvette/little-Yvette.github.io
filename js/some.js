/* click-heart*/
! function (e, t, a) {
    function n() {
        c(
            ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
        ), i(), r()
    }
  
    function r() {
        for (var e = 0; e < l.length; e++) l[e].alpha <= 0 ? (t.body.removeChild(l[e].el), l.splice(e, 1)) : (l[e].y--,
            l[e].scale += .004, l[e].alpha -= .013, l[e].el.style.cssText = "left:" + l[e].x + "px;top:" + l[e].y +
            "px;opacity:" + l[e].alpha + ";transform:scale(" + l[e].scale + "," + l[e].scale +
            ") rotate(45deg);background:" + l[e].color + ";z-index:99999");
        requestAnimationFrame(r)
    }
  
    function i() {
        var t = "function" == typeof e.onclick && e.onclick;
        e.onclick = function (e) {
            t && t(), o(e)
        }
    }
  
    function o(e) {
        var a = t.createElement("div");
        a.className = "heart", l.push({
            el: a,
            x: e.clientX - 5,
            y: e.clientY - 5,
            scale: 1,
            alpha: 1,
            color: s()
        }), t.body.appendChild(a)
    }
  
    function c(e) {
        var a = t.createElement("style");
        a.type = "text/css";
        try {
            a.appendChild(t.createTextNode(e))
        } catch (t) {
            a.styleSheet.cssText = e
        }
        t.getElementsByTagName("head")[0].appendChild(a)
    }
  
    function s() {
        return "rgb(236,138,164)" //change color of the heart 
    }
    var l = [];
    e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame ||
        e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {
            setTimeout(e, 1e3 / 60)
        }, n()
  }(window, document);

  /* Chinese hash */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.textContent.match(/[\u4e00-\u9fa5]/)) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});
