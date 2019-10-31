$(document).ready(function () {

    $("#relationItem a.sortListParent").click(function () {
        $("#relationItem a.sortListParent").removeClass("on");
        $(this).addClass("on");
        var sortId = $(this).attr("sortId");
        if (tools.isEmpty(sortId)) {
            $("#partGoods li").show();
            return false;
        }
        $("#partGoods li").hide();
        showRelationship();
        $("#partGoods li.sortListItem_" + sortId).show();
    });
});

