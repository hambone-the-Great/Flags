

var MyApp = function() {

    var Controls = {

        StartButton: {
            Id: "btnStart", 
            get Node() { return document.getElementById(this.Id); }, 
            Hide: function() { 
                this.Node.style.display = "none";
            }, 
            Show: function() {
                this.Node.style.display = "block";
            }

        }, 

        Music: {
            Id: "audio", 
            get Node() { return document.getElementById(this.Id); },
            PlayMusic: function() {
                this.Node.play();
            }
        }

    };

	var Methods = {
        FadeOut: function (e, t, i, callback, final) {
            if (t === undefined) t = 30;
            if (i === undefined) i = 100; 
            if (e.style.opacity === "") e.style.opacity = 1;
            if (i >= 0) {
                e.style.opacity = i / 100;
                i--;
                window.setTimeout(function () { MyApp.Methods.FadeOut(e, t, i, callback, final); }, t);
            }
            else {
                if (callback) callback(e, t, i, null, final);
                else {
                    var list = e.parentElement;
                    var index = parseInt(e.getAttribute("data-index"));
                    if (index !== "NaN") {
                        index++;
                        final(list, index);
                    }
                }
            }
        },

        FadeIn: function (e, t, i, callback, final) {
            if (t === undefined) t = 30;
            if (i === undefined) i = 0;
            if (e.style.opacity === "") e.style.opacity = 0; 
            if (i <= 100) {
                e.style.opacity = i / 100;
                i++;
                window.setTimeout(function () { MyApp.Methods.FadeIn(e, t, i, callback, final) }, t);
            }
            else {
                if (callback) callback(e, t, i, null, final);
                else {
                    var list = e.parentElement;
                    var index = parseInt(e.getAttribute("data-index"));
                    if (index !== "NaN") {
                        index++;
                        final(list, index);
                    }
                }
            }
        },

        ScrollListLoop: function (list, i) {

            var items = list.getElementsByTagName("li");        

            if (i === undefined) i = 0;

            if (i >= items.length) i = 0;

            var item = items[i];
            
            if (item.getAttribute("") === null) {
                for (var i = 0; i < items.length; i++) {
                    items[i].setAttribute("data-index", i);
                }                
            }

            item.style.opacity = 0;
            item.style.visibility = "visible";
            item.style.display = "block";                    
            
            MyApp.Methods.FadeIn(item, 15, 0, MyApp.Methods.FadeOut, MyApp.Methods.ScrollListLoop);

        }, 

        DisplayFlags: function() {
            
            for (var i = 0; i < flags.urls.length; i++) {

                var list = document.getElementById("list");
                
                var li = document.createElement("li");
                li.setAttribute("data-index", (i + 1)); 
                
                var img = document.createElement("img");
                img.setAttribute("src", flags.urls[i]);

                li.appendChild(img);
                list.appendChild(li);
            }

        }, 

        StartTheShow: function() {

            MyApp.Controls.StartButton.Hide(); 
            MyApp.Controls.Music.PlayMusic();

            MyApp.Methods.DisplayFlags(); 

            var list = document.getElementById("list");
            MyApp.Methods.ScrollListLoop(list);    
        }        
  };
  
    return {
        Controls: Controls,
        Methods: Methods  
    };

}();

window.onload = function () {
        
    MyApp.Controls.StartButton.Node.addEventListener("click", MyApp.Methods.StartTheShow); 
    
};