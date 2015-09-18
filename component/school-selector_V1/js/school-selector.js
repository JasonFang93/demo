(function ($) {
    var schoolSelector = (function () {
        var data = SCHOOL_LIST;
        var $template = $(
            '<div class="school-component-title">选择学校</div>' +
            '<div class="school-component-province">' +
                '<ul></ul>' + 
            '</div>' +
            '<div class="school-component-university">' +
                '<ul></ul>' +
            '</div>');
        var $provinceCopy = $(
            '<li class="school-selector-province"><a href="javascript: void(0)"></a></li>');
        var $universityCopy = $(
            '<li class="school-selector-university"><a href="javascript: void(0)"></a></li>');

        // 返回城市id编号（因引入的大学数据不是按顺序的，故未采用城市id返回数据）
        // function getProvinceId (province) {
        //     var pid = $(province).attr('data-pid');
        //     pid ? pid : undefinded;
        //     return pid;
        // }

        // 初始化省市
        function initProvince (targetObj) {
            for (var i =0, len = data.length; i < len; i++) {
                $provinceCopy.clone().appendTo(targetObj).attr('data-pid', i)
                .find('a').text(data[i].name);
            }
        }

        // 初始化学校
        function initUniversity (targetObj, pid) {
            var universityList = pid > 0 && pid <= data.length ? data[pid ].school : data[0].school;
            for (var i = 0, len = universityList.length; i < len; i++) {
                $universityCopy.clone().appendTo(targetObj).attr('data-uid', universityList[i].id).find('a').text(universityList[i].name);
            }

        }

        // 省市点击事件回调函数
        function onClickProvince (event) {
            var e = event || window.event;
            var pid = $(this).attr('data-pid');
            $(this).parent().children().removeClass('selected').end().end().addClass('selected');
            e.data.universities.empty();
            initUniversity(e.data.universities, pid);
            e.data.universities.parent().scrollTop(0);
        }

        function init (setting) {
            var $parent = $(setting.opt.appendTo);
            $parent.append($template);

            var $provinces = $('.school-component-province ul');
            var $universities = $('.school-component-university ul');//console.log(data);
            var $componentBox = $('.school-component-university');//console.log($universities.find('li'));

            initProvince($provinces);
            $provinces.find('li').on('click', {universities : $universities}, onClickProvince);
            $universities.delegate('li', 'click', function(){
                // console.log(typeof setting.opt.onClickCallBack);
                if(typeof setting.opt.onClickCallBack == 'function') {
                    setting.opt.onClickCallBack(this);
                }
                setting.hide();
            });
        }

        return function (option) {
            this.opt = $.extend(
                { appendTo : 'body'},
                option);

            init(this);
            this.init();
        };
    }());

    schoolSelector.prototype.show = function () {
        $(this.opt.appendTo).slideDown();
    }
    schoolSelector.prototype.hide = function () {
        $(this.opt.appendTo).slideUp();
    }
    schoolSelector.prototype.init = function () {
        $('.school-component-province ul').find('li').first().click();
    }
    window.schoolSelector = schoolSelector;
}(jQuery));