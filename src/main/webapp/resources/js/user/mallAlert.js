$.mall_alert = function (id, msg, info ) {
    switch (info) {
        case "success":
             $("#"+id).html(mallAlert.success(msg));
            return true;
        case "info":
             $("#"+id).html(mallAlert.info(msg));
            return true;
        case "warning":
             $("#"+id).html(mallAlert.warning(msg));
            return true;
        case "error":
             $("#"+id).html(mallAlert.error(msg));
            return true;
    }
}

var mallAlert = {
    success:function (msg) {
        return '<div role="alert" style="'+cssAlert.alert()+'; '+cssAlert.alertSuccess()+'"><i class="zmdi zmdi-check-circle" style="font-size: 18px"></i><div style="'+cssAlert.alertContent()+'"><span style="'+cssAlert.alertTitle()+'">'+msg+'</span></div></div>'
    },
    info:function ( msg) {
        return '<div role="alert" style="'+cssAlert.alert()+' ;'+cssAlert.alertInfo()+'"><i class="zmdi zmdi-alert-circle" style="font-size: 18px"></i><div style="'+cssAlert.alertContent()+'"><span style="'+cssAlert.alertTitle()+'">'+msg+'</span></div></div>'
    },
    warning:function (msg) {
        return '<div role="alert" style="'+cssAlert.alert()+'; '+cssAlert.alertWarning()+'"><i class="zmdi zmdi-alert-triangle" style="font-size: 18px"></i><div style="'+cssAlert.alertContent()+'"><span style="'+cssAlert.alertTitle()+'">'+msg+'</span></div></div>'
    },
    error:function (msg) {
        return '<div role="alert" style="'+cssAlert.alert()+'; '+cssAlert.alertError()+'"><i class="zmdi zmdi-close-circle" style="font-size: 18px"></i><div style="'+cssAlert.alertContent()+'"><span style="'+cssAlert.alertTitle()+'">'+msg+'</span></div></div>'
    },
}

var cssAlert={
    alert:function(){
        return 'width: 100%;\n' +
            '    padding: 8px 16px;\n' +
            '    margin: 0;\n' +
            '    box-sizing: border-box;\n' +
            '    border-radius: 4px;\n' +
            '    position: relative;\n' +
            '    background-color: #fff;\n' +
            '    overflow: hidden;\n' +
            '    opacity: 1;\n' +
            '    display: flex;\n' +
            '    align-items: center;\n' +
            '    transition: opacity .2s'
    },
    alertContent:function(){
        return ' display: table-cell; padding: 0 8px;'
    },

    alertTitle:function(){
        return '    font-size: 13px;line-height: 18px;'
    },
    alertSuccess:function () {
        return 'background-color: #f0f9eb;color: #67c23a;'
    },
    alertInfo:function () {
        return 'background-color: #f4f4f5;color: #909399'
    },
    alertWarning:function () {
        return 'background-color: #fdf6ec;color: #e6a23c'
    },
    alertError:function () {
        return 'background-color: #fef0f0;color: #f56c6c'
    },
}