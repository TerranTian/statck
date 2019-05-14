!function(){
    window.$sys_args={p:"KXIOS",v:"0.0.73"};
    window.$sys_progress = 0;
    window.$sys_app_id = "257395441815477";
    window.$sys_app_name = "Stack Hit 3D";
    window.$sys_platform_initialized = false;
    window.$sys_platform_started = false;
    window.$sys_release = "release" == "release"?true:false;

    window.$sys_skins = [
        [0xcc1640,0x296669,0x31bec7,0x3faace,0x00c16d,0x27292e],
        [0x006ae6,0x5278ff,0x83f6ff,0x752bff,0x26d3b7,0x27292e],
        [0xec13ff,0x59395e,0xe56e95,0xe63078,0x9d2e93,0x27292e],
        [0x006ae6,0x5c2647,0xee7f44,0xeec400,0xc3294d,0x27292e],
        [0x803cff,0x09d1f7,0xfff8a6,0x79c54b,0x16989f,0x27292e],
        [0xcc1640,0x6285d1,0x84e9f6,0x1a66d7,0xc33557,0x27292e],
        [0xed3d30,0x7162ba,0xe5acd0,0x7413d8,0x33bec4,0x27292e]
    ]
    
    window.onerror = function(msg, url, line, col, error) {
        if(msg == "Script error.") return;
        if(window.FBInstant){
            FBInstant.logEvent("client_crash",1,{version:window.$sys_args.v||0,content:[line,col,msg].join("-")});
        }
        return false;
    };
    window.addEventListener('unhandledrejection', function(event){
        if(window.FBInstant){
            FBInstant.logEvent("client_rejection",1,{version:window.$sys_args.v||0,content:JSON.stringify(event.reason)});
        }
    });
    
    function getOption(key) {
        if (!window.location) return ""
        var search = location.search;
        if (search == "")return "";
        search = search.slice(1);
        var searchArr = search.split("&");
        for (var i = 0; i < searchArr.length; i++) {
            var arr = searchArr[i].split("=");
            if (arr[0] == key)return arr[1];
        }
        return "";
    }
    
    function loadLib(src, callback) {
        var s = document.createElement('script');
        s.async = false;
        s.src = src;
        s.addEventListener('load', function () {
            s.parentNode.removeChild(s);
            s.removeEventListener('load', arguments.callee, false);
            callback && callback();
        }, false);
        document.head.appendChild(s);
    };
    
    var cur_progress = 0;
    
    if(window.$sys_args.p != "IG" && getOption("source").indexOf("fbinstant") == 0){
        loadLib('//connect.facebook.net/en_US/fbinstant.6.2.js');
        window.$sys_args.p = "IG";
    }
    
    var is_fb = window.$sys_args.p == "IG";
    var fb_initialized = !is_fb;
    var fb_loaded = false;
    var last_p_value = 0;
    
    var loop = setInterval(function(){
        if(!fb_loaded && is_fb){
            if(!window.FBInstant) return;
            fb_loaded = true;
            FBInstant.initializeAsync().then(function(){
                fb_initialized = true;
                window.$sys_platform_initialized = true;
            }).catch(function(e){
                console.log("fb initialize failed",e);
            })
            return;
        }
        if(fb_initialized){
            cur_progress += (100 - cur_progress) * 0.01;
            if($sys_progress > cur_progress){
                cur_progress = $sys_progress/0.9;
            }
            var progress = $sys_progress *.1 + cur_progress* .9;
            var p = Math.min(100,Math.max(0,~~progress));
            if(p > last_p_value){
                window.FBInstant && window.FBInstant.setLoadingProgress(p);
                last_p_value = p;
            }
        }
        if(window.$sys_platform_started){
            clearInterval(loop);
        }
    },50)

    /**
     * 设置LayaNative屏幕方向，可设置以下值
     * landscape           横屏
     * portrait            竖屏
     * sensor_landscape    横屏(双方向)
     * sensor_portrait     竖屏(双方向)
     */
    window.screenOrientation = "portrait";
    
    //-----libs-begin-----
    loadLib("libs/laya.core.js")
    loadLib("libs/laya.webgl.js")
    loadLib("libs/laya.filter.js")
    loadLib("libs/laya.ui.js")
    loadLib("libs/laya.d3.js")
    loadLib("libs/laya.physics3D.js")//-----libs-end-------
    loadLib("js/bundle.js");
}()