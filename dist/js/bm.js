(function($){
    var defaultSettings = {
        row: 20,
        col: 50
    };
    $.fn.bmInit = function(settings){
        var $this = this;
        settings = $.extend({}, defaultSettings, settings || {});
        var html = '';
        for(var i = 0; i < settings.row; i++){
            html += '<ul>';
            for(var j = 0; j < settings.col; j++){
                html += '<li></li>';
            }
            html += '</ul>';
        }
        $this.addClass('bmArea').html(html).data(settings);
        $this.on('mousedown', 'li', function(event) {
            event.preventDefault();
            if(!$this.data('readonly') && $this.data('status') != 'play'){
                var isSelected = $(this).hasClass('selected');
                if(isSelected){
                    $(this).removeClass('selected');
                }else{
                    $(this).addClass('selected');
                }
                $this.on('mouseover', 'li', function(event) {
                    event.preventDefault();
                    if(isSelected){
                        $(this).removeClass('selected');
                    }else{
                        $(this).addClass('selected');
                    }
                });
            }
        }).on('mouseup', 'li', function(event) {
            $this.off('mouseover', 'li');
        });
        return this;
    };
    $.fn.bmGet = function(){
        var $this = this;
        var settings = $this.data();
        var data = '';
        for(var i = 0; i < settings.col; i++){
            for(var j = 0; j < settings.row; j++){
                data += $this.find('ul:eq('+j+') li:eq('+i+')').hasClass('selected') ? 1 : 0;
            }
        }
        return data;
    };
    $.fn.bmSet = function(data){
        var settings = this.data();
        for(var i = 0; i < settings.col; i++){
            var d = data.substr(i * settings.row, settings.row).split('');
            for(var j = 0; j < d.length; j++){
                if(d[j] == 1){
                    this.children('ul:eq('+j+')').children('li:eq('+i+')').addClass('selected');
                }else{
                    this.children('ul:eq('+j+')').children('li:eq('+i+')').removeClass('selected');
                }
            }
        }
        return this;
    };
    $.fn.bmClear = function(){
        var settings = this.data();
        var data = '';
        for(var i = 0; i < settings.col; i++){
            for(var j = 0; j < settings.row; j++){
                data += 0;
            }
        }
        this.bmSet(data);
        return this;
    };
    $.fn.bmPlay = function(data, callback){
        function loop(bm, index, data, callback){
            if(data.length > 1){
                if(index == 0){
                    bm.bmSet(data[index].data);
                    loop(bm, index + 1, data, callback);
                }else{
                    setTimeout(function(){
                        if(index == data.length){
                            // bm.bmClear();
                            bm.data('status', 'stop');
                            setTimeout(function(){
                                callback && callback();
                            }, 0);
                        }else{
                            bm.bmSet(data[index].data);
                            loop(bm, index + 1, data, callback);
                        }
                    }, data[index - 1].duration);
                }
            }
        }
        if(this.data('status') != 'play'){
            this.data('status', 'play');
            loop(this, 0, data, callback);
        }
        return this;
    };
    $.fn.bmReadonly = function(flag = true){
        this.data('readonly', flag);
        return this;
    };
})(jQuery);